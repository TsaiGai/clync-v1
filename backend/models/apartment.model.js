const mongoose = require('mongoose');

// Define the Apartment schema
const ApartmentSchema = new mongoose.Schema({
	propertyName: {
		type: String,
		required: true, // You can set this to false if not required
	},
	floorPlan: {
		type: String,
		required: true,
	},
	specialRequest: {
		type: String,
		default: '', // Default value can be an empty string or you can omit it if not needed
	},
	availability: {
		type: Boolean,
		default: false,
	},
});

// Define the User schema, which includes an array of apartments
const UserSchema = new mongoose.Schema({
	uid: {
		type: String,
		required: true,
	},
	// Other user fields can go here
	apartments: [ApartmentSchema], // Embedding the Apartment schema as an array
});

// Create the model from the schema
const User = mongoose.model('UserApartment', UserSchema);

module.exports = User;
