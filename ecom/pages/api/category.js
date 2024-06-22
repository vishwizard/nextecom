import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Categories.models";

export default async function handle(req, res) {
    await mongooseConnect();
    const method = req.method;

    if(method==="POST"){
        const {Title, Parent} = req.body;
        if(Parent=="0"){
            var newParent=null;
        }else{
            var newParent = Parent; 
        }
        const result = await Category.create({Title,Parent:newParent});
        res.json(result);
    }

    if(method==="PUT"){
        console.log(req.body);
        const {Title, Parent, _id} = req.body;
        if(Parent=="0"){
            var newParent=null;
        }else{
            var newParent = Parent; 
        }
        const result = await Category.updateOne({_id},{Title,"Parent":newParent});
        res.json(result);
    }

    if(method==="GET"){
        const data = await Category.find().populate('Parent');
        res.json(data);
    }

    if(method==="DELETE"){
        const {_id} = req.body;
        const data = await Category.deleteOne(_id);
        res.json(data);
    }
}