
import multiparty from 'multiparty';

export default async function Handle(req,res){

    const form = multiparty.Form();
    form.parse(req, (err, feilds, files)=>{
        console.log(files.length);
        res.json("ok");
    })
}

export const config = {
 api: {bodyParser: false},
};