const admin = require('firebase-admin');

const authenticate = (req, res, next) => {
	const header = req.headers.authorization;

	//ensure headers are associated with request
	if (!header || !header.startsWith('Bearer ')) {
		res.statusMessage = 'Unauthorized Header. Access Denied';
		return res.status(401).send('Unauthorized Header. Access Denied 1');
	}

	//get token from request
	const token = header.substring(7, header.length);

	if (!token) {
		res.statusMessage = 'Unauthorized Header. Access Denied';
		return res.status(401).send('Unauthorized Header. Access Denied 2');
	}
	//reference => https://firebase.google.com/docs/auth/admin/manage-sessions

	admin
		.auth()
		.verifyIdToken(token)
		.then(function (decodedToken) {
			if (!decodedToken.email_verified) {
				return res.status(401).send('Your email needs to be verified.');
			}

			//attach uid to body for the route to use (GET THE VALUES FROM THE HEADER)
			req.headers.uid = decodedToken.uid;
			next();
		})
		.catch(function (error) {
			console.log(error);
			res.status(401).send('Unauthorized Header. Access Denied');
		});

	//end function
};
module.exports = { authenticate };
