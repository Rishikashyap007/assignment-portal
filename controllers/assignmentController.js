import { Assignment } from "../models/assignmentModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getAssignments = async (req, res) => {
    try {
        // Validate that user is authenticated
        if (!req.user || !req.user._id) {
            throw new ApiError(401, "Authentication required");
        }

        const adminId = req.user._id;

        // Find assignments, potentially with additional filtering or sorting
        const assignments = await Assignment.find({ adminId })
            .sort({ createdAt: -1 }) // Optional: sort by most recent first
            .lean(); // Optional: converts Mongoose documents to plain JavaScript objects

        // Check if assignments exist
        if (!assignments || assignments.length === 0) {
            return res.status(404).json(
                new ApiResponse(404, [], "No assignments found")
            );
        }

        // Successful response
        return res.status(200).json(
            new ApiResponse(200, assignments, "Assignments fetched successfully")
        );

    } catch (error) {
        // Centralized error handling
        console.error("Get Assignments Error:", error);

        const statusCode = error.statusCode || 500;
        const errorMessage = error.message || "Internal Server Error";

        return res.status(statusCode).json(
            new ApiError(statusCode, errorMessage)
        );
    }
};

export const acceptAssignment = async (req, res) => {
    try {
      const { id } = req.params;
       console.log(id,"idd");
      // Find the assignment by ID and ensure it's tagged to the current admin
      const assignment = await Assignment.findOne({
        _id: id,
        adminId: req.user._id,
      });
      console.log(assignment,"assignment huu");
  
      if (!assignment) {
        throw new ApiError(404,"Assignment not found")
      }

  
      // Update the assignment status to "accepted"
      assignment.status = "Accepted";
      await assignment.save();
  
      res.status(200).json(new ApiResponse(200,assignment,"assignment Accepted Successfully"));
    } catch (error) {
        console.error("Get Assignments Error:", error);

        const statusCode = error.statusCode || 500;
        const errorMessage = error.message || "Internal Server Error";

        return res.status(statusCode).json(
            new ApiError(statusCode, errorMessage)
        );
    }
  };

  export const rejectAssignment = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the assignment by ID and ensure it's tagged to the current admin
      const assignment = await Assignment.findOne({
        _id: id,
        // admin: req.user._id,
      });
  
      if (!assignment) {
        throw new ApiError(404,"Assignment not found")
      }
  
      // Update the assignment status to "accepted"
      assignment.status = "Rejected";
      await assignment.save();
  
      res.status(200).json(new ApiResponse(200,assignment,"assignment rejected Successfully"));
    } catch (error) {
        console.error("Get Assignments Error:", error);

        const statusCode = error.statusCode || 500;
        const errorMessage = error.message || "Internal Server Error";

        return res.status(statusCode).json(
            new ApiError(statusCode, errorMessage)
        );
    }
  };