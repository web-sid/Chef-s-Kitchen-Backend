import mongoose from "mongoose";
import "dotenv/config";
import Food from "../models/foodModel";
import fs from "fs";

const DB = process.env.DATABASE.replace("<password>", process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => console.log("Db 2 done"));
