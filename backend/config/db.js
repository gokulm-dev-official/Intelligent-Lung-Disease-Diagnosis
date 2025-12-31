
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri && (process.env.VERCEL || process.env.NODE_ENV === 'production')) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        const conn = await mongoose.connect(uri || 'mongodb://localhost:27017/lung-disease-detection');

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        // Don't exit process in serverless, just throw so it shows in logs
        throw error;
    }
};

module.exports = connectDB;
