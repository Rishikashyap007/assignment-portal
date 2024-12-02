import { model,Schema } from "mongoose";
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
  },
  role: { 
    type: String, 
    enum: ["user", "admin"], 
    required: true 
},
},
{timestamps:true}
);

export const User = model("User",userSchema)