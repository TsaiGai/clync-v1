const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const apartmentRoutes = require('./routes/apartment-route');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Connect Database
connectDB();

// Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/apartments', apartmentRoutes);
// app.use('/api/users', userRoutes); // ✅ Now all user-related requests go through /api/users
app.use('/api', apartmentRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
console.log('MY_VARIABLE:', process.env.MONGO_URI);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
