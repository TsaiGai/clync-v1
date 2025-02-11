const admin = require('firebase-admin');

// Initialize Firebase Admin SDK (if not already initialized)
if (!admin.apps.length) {
	const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT); // JSON string in the environment variable
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)  // Path to your service account key
  });
} else {
  admin.app(); // Use the default app if already initialized
}

const authenticate = (req, res, next) => {
	const header = req.headers.authorization;

	// Ensure that the header exists and starts with "Bearer "
	if (!header || !header.startsWith('Bearer ')) {
	  return res.status(401).send('Unauthorized Header. Access Denied');
	}
  
	// Extract token from the header
	const token = header.split(' ')[1]; // safer way to get the token
  
	if (!token) {
	  return res.status(401).send('Unauthorized: No token provided');
	}
  
	// Verify token
	admin
	  .auth()
	  .verifyIdToken(token)
	  .then((decodedToken) => {
		// if (!decodedToken.email_verified) {
		//   return res.status(401).send('Your email needs to be verified.');
		// }
  
		// // Attach decoded user info to the request
		// req.user = decodedToken; // You can access decoded user data like `req.user.uid`
		req.headers.uid = decodedToken.uid;
		next();
	  })
	  .catch((error) => {
		console.log(error);
		return res.status(401).send('Unauthorized: Invalid token');
	  });
};

module.exports = { authenticate };
