import mongoose, { model, Schema } from "mongoose";

const assignmentSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    task:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending",
    }
},{
    timestamps:true
})

export const Assignment = model("Assignment",assignmentSchema)