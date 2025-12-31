
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = (process.env.MONGO_URI || '').trim();

        if (!uri && (process.env.VERCEL || process.env.NODE_ENV === 'production')) {
            throw new Error('MONGO_URI is MISSING in environment variables');
        }

        // Masked logging for security
        if (uri) {
            const masked = uri.substring(0, 20) + "..." + uri.substring(uri.length - 10);
            console.log(`Attempting connection to: ${masked}`);
        }

        const conn = await mongoose.connect(uri || 'mongodb://localhost:27017/lung-disease-detection', {
            serverSelectionTimeoutMS: 5000 // 5 second timeout
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        // Don't exit process in serverless, just throw so it shows in logs
        throw error;
    }
};

module.exports = connectDB;
