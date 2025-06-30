import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Optimize MongoDB connection with pooling and performance settings
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI_LOCAL as string, {
            // Connection pooling settings
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4, // Use IPv4, skip trying IPv6
            
            // Performance optimizations
            bufferCommands: false, // Disable mongoose buffering
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Handle connection events for monitoring
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        // Graceful close on app termination
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        });

        return conn;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;
