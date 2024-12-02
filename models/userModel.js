import { model, Schema } from "mongoose";

// Define the User schema
const userSchema = new Schema(
  {
    // Username field
    username: {
      type: String, // The data type is a string
      required: true, // This field is mandatory
      unique: true, // Each name must be unique in the database
    },

    // Email field
    email: {
      type: String, // The data type is a string
      required: true, // This field is mandatory
      unique: true, // Each email must be unique in the database
    },

    // Password field
    password: {
      type: String, // The data type is a string
      required: true, // This field is mandatory
      unique: true, // Each password must be unique (consider removing this as it's generally unnecessary for passwords)
      minlength: 8, // Minimum length of the password is 8 characters
    },

    // Role field
    role: {
      type: String, // The data type is a string
      enum: ["user", "admin"], // Role can only be one of the specified values
      required: true, // This field is mandatory
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

// Create and export the User model
export const User = model("User", userSchema);
