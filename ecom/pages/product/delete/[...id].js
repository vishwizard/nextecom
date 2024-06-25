import Layout from "@/Components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteProduct(){

    const router = useRouter();
    const {id} = router.query;
    const [productInfo, setProductInfo] = useState('');

    useEffect(()=>{
        if(!id){
            return;
        }

        axios.get('/api/product?id='+id).then(res=>{
            setProductInfo(res.data);
        })
    },[])


    function goBack(){
        router.push("/product");
    }

    async function Delete(){
        await axios.delete('/api/product?id='+id).then(
            goBack());
    }

    return (
        <Layout>
            <h1>Do you really want to delete "{productInfo?.title || 'This Product'}" ?</h1>
            <div className="flex gap-2 items-center">
            <button className="btn-red" onClick={Delete}>Yes</button>
            <button class="btn-common" onClick={goBack}>No</button>
            </div>
            
        </Layout>
    )
}