const User = require('../models/apartment.model');

/*
 * Endpoint: POST /user/apartment
 * Description: Creates a new user with an empty apartments array.
 *
 * Request Headers:
 *   - uid: A unique identifier for the user (e.g., "12345").
 *
 * Request Body (Optional):
 *   If you want to include an initial apartment when creating the user, the body could include:
 *   {
 *     "propertyName": "Greenwood Residency",
 *     "floorPlan": "2BHK",
 *     "specialRequest": "Corner unit, quiet area",
 *     "availability": false
 *   }
 *
 * Note: The current implementation creates a user with an empty apartments array.
 */
const createUserApartment = async (req, res) => {
	try {
		// Retrieve uid from headers
		const uid = req.headers.uid;

		// Check if a user with this uid already exists to avoid duplicates
		const existingUser = await User.findOne({ uid });
		if (existingUser) {
			return res.status(400).json({
				message:
					'User already exists. Use a different uid or update the existing user.',
			});
		}

		// Create a new user with the provided uid and an empty apartments array.
		// (If you want to add an initial apartment, change apartments to: [req.body])
		const newUser = new User({
			uid,
			apartments: [], // Expected apartment details (if provided) in req.body: propertyName, floorPlan, specialRequest, availability.
		});

		// Save the new user document to the database
		await newUser.save();

		res.status(201).json(newUser);
	} catch (error) {
		console.error('Error creating new user apartment:', error);
		res.status(500).json({ message: 'Error creating new user apartment.' });
	}
};

/*
 * Endpoint: GET /apartments
 * Description: Retrieves all apartments for a specific user.
 *
 * Request Headers:
 *   - uid: A unique identifier for the user (e.g., "12345").
 *
 * Request Body: None.
 */
const getUserApartments = async (req, res) => {
	try {
		// Retrieve uid from headers (or req.params if you prefer)
		const uid = req.headers.uid;
		const user = await User.findOne({ uid });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Return the apartments array
		res.status(200).json(user.apartments);
	} catch (error) {
		res.status(500).json({ message: 'Error retrieving apartments.' });
	}
};

/*
 * Endpoint: POST /apartments
 * Description: Adds a new apartment to an existing user's apartments array.
 *
 * Request Headers:
 *   - uid: A unique identifier for the user (e.g., "12345").
 *
 * Request Body:
 *   {
 *     "propertyName": "Sunset Villas",
 *     "floorPlan": "3BHK",
 *     "specialRequest": "Extra storage space",
 *     "availability": false
 *   }
 */
const addApartmentToUser = async (req, res) => {
	console.log('got it');
	try {
		// Retrieve uid from headers and new apartment data from req.body
		const uid = req.headers.uid;
		const newApartment = req.body; // Expects propertyName, floorPlan, specialRequest, availability

		const user = await User.findOne({ uid });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Add the new apartment to the apartments array
		user.apartments.push(newApartment);
		await user.save();

		res.status(200).json(user.apartments);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error adding apartment.' });
	}
};

/*
 * Endpoint: DELETE /apartments/:aptId
 * Description: Deletes an apartment from the user's apartments array.
 *
 * Request Headers:
 *   - uid: A unique identifier for the user (e.g., "12345").
 *
 * URL Parameters:
 *   - aptId: The MongoDB-generated ObjectId of the apartment subdocument to remove.
 *
 * Request Body: None.
 */
const deleteApartmentFromUser = async (req, res) => {
	try {
		// Retrieve uid from headers and the apartment id from URL parameters
		const uid = req.headers.uid;
		const { aptId } = req.params; // aptId is the _id of the apartment to remove

		const user = await User.findOne({ uid });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Use the pull() method to remove the apartment with the matching _id from the apartments array
		user.apartments.pull(aptId);

		// Save the updated user document
		await user.save();

		res
			.status(200)
			.json({ message: 'Apartment removed', apartments: user.apartments });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: 'Error deleting apartment.' });
	}
};

module.exports = {
	createUserApartment,
	getUserApartments,
	addApartmentToUser,
	deleteApartmentFromUser,
};
