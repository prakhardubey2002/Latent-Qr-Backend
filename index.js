const express = require('express');
const mongoose = require('mongoose');
const profileRoutes = require('./routes/profile');
const reviewRoutes = require('./routes/review');
const cors = require('cors')
const app = express();
app.use(cors());
// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://prakhardubey2002:gU5AkIUnPy2qrgUS@latentqr.sv2h6.mongodb.net/?retryWrites=true&w=majority&appName=LatentQR', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/profiles', profileRoutes);
app.use('/api/reviews', reviewRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
