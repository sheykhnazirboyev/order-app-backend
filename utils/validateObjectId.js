import mongoose from "mongoose";

export function validateObjectId(id){
    return mongoose.Types.ObjectId.isValid(id);
}