import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;
let isConnected = false;

beforeAll(async () => {
  if (isConnected) {
    return;
  }
  
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Set environment variables BEFORE any imports
  process.env.MONGO_URI = mongoUri;
  process.env.JWT_SECRET = "testsecretkey123";
  process.env.PORT = "5000";
  
  // Connect to the in-memory MongoDB
  await mongoose.connect(mongoUri);
  isConnected = true;
  console.log("MongoDB Memory Server connected");
}, 60000);

afterAll(async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
  isConnected = false;
});

// Note: We don't use beforeEach for cleanup here
// Individual tests that need clean data should handle it themselves
// This prevents issues where cleanup runs between tests in the same describe block
