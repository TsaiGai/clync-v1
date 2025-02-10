import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthPage from "./App/AuthPage";
import Dashboard from "./App/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute"; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Authentication Page */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected Dashboard Page */}
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/auth" replace />} />

        {/* Default Route: Redirect to Auth Page */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

