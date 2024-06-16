
// import mongoose from "mongoose";
// import clientPromise from "@/lib/db";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product.models";

export default async function handle(req, res){
    // mongoose.connect(clientPromise.url);
    // mongoose.Promise = clientPromise;
    await mongooseConnect();
   const {method} = req;
   if(method==="POST"){
    const {title,description,price,images} = req.body;
   const productDoc = await Product.create({
        title, description, price, images
    })

    res.json(productDoc);
   }


   if(method==="GET"){
    if(req?.query?.id){
        res.json(await Product.findOne({_id:req.query.id}));
    }
    else{
        res.json(await Product.find());

    }
   }

   if(method==="PUT"){
        const {title, description, price, images, _id} = req.body;
        const filter = {_id:_id}
        await Product.updateOne(filter, {title, description, price, images});
        res.json(true);
    }
    
    if(method==="DELETE"){
        if(req?.query?.id){
            await Product.deleteOne({_id:req.query.id});
            res.json(true);
        }
    }
}



