import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    Title:{
        type: String,
        required: true
    },
    Parent:{
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    Properties:{
        type: [{}],
        default:[],
    }
},{
    timestamps:true
})

export const Category = mongoose.models?.Category || mongoose.model("Category", CategorySchema);
