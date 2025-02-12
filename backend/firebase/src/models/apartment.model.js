const { Firestore } = require('@google-cloud/firestore');

// Initialize Firestore
const db = new Firestore();

// Define Firestore document structure for an Apartment
const createApartment = (propertyName, floorPlan, specialRequest = '', availability = false) => {
  return {
    propertyName,
    floorPlan,
    specialRequest,
    availability
  };
};

// Define Firestore document structure for a User
const createUser = (uid, apartments) => {
  return {
    uid,
    apartments // Array of apartments
  };
};

// Firestore functions to handle data

// Create or update a user document
const createUserInFirestore = async (uid, apartments) => {
  const userRef = db.collection('users').doc(uid);

  // Store apartments as subcollection of the user
  const batch = db.batch();

  // Add or update apartments in a subcollection
  apartments.forEach((apartment, index) => {
    const apartmentRef = userRef.collection('apartments').doc(`apartment_${index}`);
    batch.set(apartmentRef, apartment);
  });

  // Set the user document
  batch.set(userRef, { uid });

  await batch.commit();
};

// Example usage:

const apartments = [
  createApartment('Sunny Apartments', '2BHK', 'Near park', true),
  createApartment('Green View', '1BHK', '', false)
];

createUserInFirestore('user123', apartments)
  .then(() => console.log('User data added to Firestore'))
  .catch(err => console.error('Error adding user data to Firestore', err));
