import { useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router';
// import { UploadDropzone } from '@uploadthing/react';
// import UploadImage from './ImageUpload';


export default function ProductForm({
    title: currentTitle,
    description: currentDescription,
    price: currentPrice,
    id: _id,
    images: currentImages,
}) {

    const [title, setTitle] = useState(currentTitle || '');

    const [description, setDesc] = useState(currentDescription || '');

    const [price, setPrice] = useState(currentPrice || '');

    const [images, setImages] = useState(currentImages || [null]);

    const [goBack, setGoBack] = useState(false);

    const router = useRouter();

    async function SaveProduct(e) {
        e.preventDefault();
        const data = {
            title,
            description,
            price,
            images,
        };
        if (_id) {
            await axios.put('/api/product', { ...data, _id })
        }
        else {
            await axios.post('/api/product', data);
        }

        setGoBack(true);

    }



    if (goBack) {
        router.push('/product');
    }

     async function uploadImages(e){
        const files = e.target.files;
        const data = new FormData;
        // console.log(files);
        if(files.length>0){
            for( const file of files){
                data.append("file", file);
            }
            // console.log(data);
            // console.log(typeof(files));
            const res = await axios.post("/api/upload", data);
            const path = res.data.filePath;
            images[0]===null?setImages([path]):setImages(i=>[...i,path])
            // const updateDb = await axios.put('/api/product', {_id, images});
            // console.log(updateDb);
        }

    }


    return (
        <>
            <form onSubmit={SaveProduct}>
                <label>Product Name</label>
                <input
                    placeholder="Product Name"
                    value={title}
                    onChange={e => { setTitle(e.target.value) }} />

                <label>Product Description</label>
                <textarea placeholder="Product Description"
                    value={description}
                    onChange={e => { setDesc(e.target.value) }} />

                <label>Photos</label>
                <div className='mb-4 flex gap-2'> 
                    <label className='h-24 w-24 border transition-transform duration-300 hover:scale-105 border-gray-400 rounded-lg flex items-center justify-center text-gray-700 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            
                        </svg>
                        Upload
                        <input className='hidden w-full h-full' type="file" multiple onChange={uploadImages}></input>
                    </label>
                    {/* {!images?.length && (
                        <label className='text-sm text-gray-600'>No Images found for this product</label>
                    )} */
                        console.log(images)
                    }
                    {images.length>0 && images[0]!==null? images.map((image,index)=>(
                        <div key={index} className="h-24 w-24 border transition-transform duration-300 hover:scale-105 border-gray-400 rounded-lg flex items-center overflow-hidden justify-center text-gray-700 cursor-pointer">
                            <img src={image} alt="Product Image" className="w-full h-full object-cover"/>
                        </div>
                    )) : (<label className='text-sm text-gray-600'>No Images found for this product</label>
                    )}                    
                </div>


                <label>Product Price (in Rs)</label>
                <input placeholder="Price" type="number"
                    value={price}
                    onChange={e => { setPrice(e.target.value) }} />


                    {/* <UploadImage></UploadImage> */}

                <button className='btn-primary' type="submit">Submit</button>
            </form>
        </>
    )
}
