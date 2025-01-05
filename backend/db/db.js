import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to DB", conn.connection.host);
  } catch (error) {
    console.log("Error in connecting DB");
  }
};
