import mongoose from 'mongoose';

// Establishing Database Connection
export const connectDB = async (url) => {
    try {
        await mongoose.connect(url, {
            serverSelectionTimeoutMS: 5000, // 5 second timeout
        });
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
}