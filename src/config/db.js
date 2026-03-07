import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Get current connection state
    const currentState = mongoose.connection.readyState;
    
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (currentState === 1) {
      console.log("Using existing MongoDB connection");
      return;
    }

    // Close existing connection if in wrong state
    if (currentState !== 0) {
      try {
        await mongoose.disconnect();
      } catch (e) {
        // Ignore disconnect errors
      }
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
