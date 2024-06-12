
import mongoose from "mongoose";
import clientPromise from "@/lib/db";


export default function handle(req, res){
    mongoose.connect(clientPromise.url);
   const {method} = req;
   if(method==="POST"){

   }
}