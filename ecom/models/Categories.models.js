import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
    Title:{
        type: String,
        required: true
    },
    Parent:{
        type: mongoose.Types.ObjectId,
        ref: "Category"
    }
},{
    timestamps:true
})

export const Category = mongoose.models?.Category || mongoose.model("Category", CategorySchema);
