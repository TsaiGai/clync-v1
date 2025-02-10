import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter} from '../components/ui/card';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth();
    
    try {
      if (isLogin) {
        // ✅ Firebase Sign In
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // ✅ Firebase Sign Up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await userCredential.user.updateProfile({ displayName: name });
      }

      navigate("/dashboard"); // ✅ Redirect after success
    } catch (error) {
      console.error("Authentication Error:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Sign Up"}</CardTitle>
          <CardDescription>
            {isLogin ? "Enter your credentials to access your account" : "Create an account to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="w-full" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

