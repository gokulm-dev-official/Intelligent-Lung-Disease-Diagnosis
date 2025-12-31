const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploads
const isVercel = process.env.VERCEL || process.env.NODE_ENV === 'production';
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
if (isVercel) {
    app.use('/uploads', express.static('/tmp'));
}
app.use('/reports', express.static(path.join(__dirname, 'reports')));

// Routes
app.use('/api/patients', require('./routes/patients'));
app.use('/api/analysis', require('./routes/analysis'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/settings', require('./routes/settings'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Server Error'
    });
});

const PORT = process.env.PORT || 5002;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
