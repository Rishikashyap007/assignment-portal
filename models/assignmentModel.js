import mongoose, { model, Schema } from "mongoose";

// Define the Assignment schema
const assignmentSchema = new Schema(
  {
    // Reference to the user who created or is assigned the task
    userId: {
      type: mongoose.Schema.Types.ObjectId, // ObjectId to reference a document in the User collection
      ref: "User", // Establishes a relationship with the User model
      required: true, // This field is mandatory
    },

    // Reference to the admin responsible for assigning or managing the task
    adminId: {
      type: mongoose.Schema.Types.ObjectId, // ObjectId to reference a document in the User collection
      ref: "User", // Establishes a relationship with the User model
      required: true, // This field is mandatory
    },

    // Task description
    task: {
      type: String, // The data type is a string
      required: true, // This field is mandatory
    },

    // Task status
    status: {
      type: String, // The data type is a string
      enum: ["Pending", "Accepted", "Rejected"], // Allowed values for the status field
      default: "Pending", // Default status is "Pending"
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,
  }
);

// Create and export the Assignment model
export const Assignment = model("Assignment", assignmentSchema);
