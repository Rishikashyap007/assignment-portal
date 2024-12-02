import mongoose, { connect } from "mongoose";

const connectDB = async ()=>{
  try {
    await connect(`${process.env.DB_URL}/assignment-portal`)
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log("connection error pls check it in db.js",error);
  }
}

export default connectDB;