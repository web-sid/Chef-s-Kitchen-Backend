import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const connectDB = async () => {
  const DB = process.env.DATABASE.replace(
    "<db_password>",
    process.env.DB_PASSWORD
  );
  await mongoose.connect(DB).then(() => console.log("DB connected"));
};
