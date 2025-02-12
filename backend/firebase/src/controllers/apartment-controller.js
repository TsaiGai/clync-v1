const { Firestore } = require('@google-cloud/firestore');
const db = new Firestore();

/*
 * Endpoint: POST /user/apartment
 * Description: Creates a new user with an empty apartments array.
 */
const createUserApartment = async (req, res) => {
  try {
    // Retrieve uid from headers
    const uid = req.headers.uid;

    // Check if a user with this uid already exists
    const userRef = db.collection('users').doc(uid);
    const doc = await userRef.get();

    if (doc.exists) {
      return res.status(400).json({
        message: 'User already exists. Use a different uid or update the existing user.',
      });
    }

    // Create a new user with the provided uid and an empty apartments array
    const newUser = {
      uid,
      apartments: [] // No initial apartments
    };

    // Save the new user document
    await userRef.set(newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating new user apartment:', error);
    res.status(500).json({ message: 'Error creating new user apartment.' });
  }
};

const getUserApartments = async (req, res) => {
	try {
	  const uid = req.user.uid; // Get user UID from decoded token
	  const userRef = db.collection('users').doc(uid);
	  const userDoc = await userRef.get();
  
	  if (!userDoc.exists) {
		return res.status(404).json({ message: "User not found" });
	  }
  
	  // Get apartments from the user document
	  const apartments = userDoc.data().apartments;
	  res.status(200).json(apartments);
	} catch (error) {
	  console.error('Error retrieving apartments:', error);
	  res.status(500).json({ message: 'Error retrieving apartments.' });
	}
  };
  
  const addApartmentToUser = async (req, res) => {
	try {
	  // Retrieve uid from headers and new apartment data from req.body
	  const uid = req.headers.uid;
	  const newApartment = req.body; // Expects propertyName, floorPlan, specialRequest, availability
  
	  const userRef = db.collection('users').doc(uid);
	  const userDoc = await userRef.get();
  
	  if (!userDoc.exists) {
		return res.status(404).json({ message: 'User not found' });
	  }
  
	  // Add the new apartment to the apartments array
	  const apartments = userDoc.data().apartments || [];
	  apartments.push(newApartment);
  
	  // Update the user's apartments array
	  await userRef.update({ apartments });
  
	  res.status(200).json(apartments);
	} catch (error) {
	  console.error('Error adding apartment:', error);
	  res.status(500).json({ message: 'Error adding apartment.' });
	}
  };
  
  const deleteApartmentFromUser = async (req, res) => {
	try {
	  // Retrieve uid from headers and the apartment index from URL parameters
	  const uid = req.headers.uid;
	  const { aptId } = req.params; // Assuming aptId is an identifier (could be an index or unique field)
  
	  const userRef = db.collection('users').doc(uid);
	  const userDoc = await userRef.get();
  
	  if (!userDoc.exists) {
		return res.status(404).json({ message: 'User not found' });
	  }
  
	  // Get the apartments and find the apartment to remove
	  const apartments = userDoc.data().apartments || [];
	  const updatedApartments = apartments.filter(apt => apt.propertyName !== aptId);
  
	  // Update the user's apartments array
	  await userRef.update({ apartments: updatedApartments });
  
	  res.status(200).json({ message: 'Apartment removed', apartments: updatedApartments });
	} catch (error) {
	  console.error('Error deleting apartment:', error);
	  res.status(500).json({ message: 'Error deleting apartment.' });
	}
  };  
