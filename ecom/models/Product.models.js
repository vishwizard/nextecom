import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,

    },
    price:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

export const Product = mongoose.model("product", ProductSchema)