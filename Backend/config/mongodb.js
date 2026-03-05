import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  const dbName = process.env.MONGO_DB_NAME || "forever";

  if (!mongoUri) {
    throw new Error("MONGO_URI is not configured");
  }

  mongoose.connection.on("connected", () => {
    console.log("DB CONNECTED");
  });

  await mongoose.connect(mongoUri, {
    dbName,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 20000,
  });
};

export default connectDB;
