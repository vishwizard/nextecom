
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product.models";
import { isAdmin } from "./auth/[...nextauth]";

export default async function handle(req, res){

    await mongooseConnect();
    isAdmin(req,res);


   const {method} = req;
   if(method==="POST"){
    const {title,description,price,images,category,properties} = req.body;
    console.log(req.body);
   const productDoc = await Product.create({
        title, description, price, images,category,properties
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
        const {title, description, price, images, category,properties, _id} = req.body;
        console.log(req.body);
        const filter = {_id:_id}
        await Product.updateOne(filter, {title, description, price, images, category,properties});
        res.json(true);
    }
    
    if(method==="DELETE"){
        if(req?.query?.id){
            await Product.deleteOne({_id:req.query.id});
            res.json(true);
        }
    }
}
