import { useEffect, useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router';
import HashLoader from "react-spinners/HashLoader";
import {ReactSortable} from 'react-sortablejs'

export default function ProductForm({
    title: currentTitle,
    description: currentDescription,
    price: currentPrice,
    _id: _id,
    images: currentImages,
    category: currentCategory
}) {

    const [title, setTitle] = useState(currentTitle || '');

    const [description, setDesc] = useState(currentDescription || '');

    const [price, setPrice] = useState(currentPrice || '');

    const [images, setImages] = useState(currentImages || '');

    const [categories, setCategories] = useState('');

    const [category, setCategory] = useState(currentCategory || '');

    const [goBack, setGoBack] = useState(false);

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const data = axios.get('/api/category').then(res=>{
            setCategories(res.data);
        })
    }, []);

    async function SaveProduct(e) {
        e.preventDefault();
        const data = {
            title,
            description,
            price,
            images,
            category
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

    async function uploadImages(e) {
        setLoading(true);
        const files = e.target.files;
        const data = new FormData;
        // console.log(files);
        if (files.length > 0) {
            for (const file of files) {
                data.append("files", file);
            }
            // console.log(data);
            // console.log(typeof(files));
            const res = await axios.post("/api/upload", data, {
                headers:{
                    'content-type': 'multipart/form-data',
                },
            });
            const path = res.data.filenames;
            console.log(path)

            images[0] === null ? setImages([...path]) : setImages(i => [...i, ...path])
            // const updateDb = await axios.put('/api/product', {_id, images});
            // console.log(updateDb);
        }
        setLoading(false);

    }

    function updateImages(images){
        setImages(images);
    }

    const deleteImage = (image) => {
        setImages((prevImages) => prevImages.filter((img) => img !== image));
      };

    // function DeleteImage(path){
    //     setImages(i=>i.filter(image=>image!==path));
    //     console.log(images);
    // }


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

                <label>Select Category</label>
                <select value={category} onChange={
                    (e)=>{
                        setCategory(e.target.value);
                    }
                }>
                    <option value=''>Uncategorized</option>
                    {categories? categories.map((i)=>{
                        return (
                            <option value={i._id}>{i.Title}</option>
                        )
                    }) : ''}
                </select>



                <label>Photos</label>
                <div className='mb-4 flex gap-2 flex-wrap'>
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
                    }
                    <ReactSortable list={images} setList={updateImages} className='flex items-center gap-1 flex-wrap'>
                    {images.length > 0 && images[0] !== null ? images.map((image, index) => (
                        <div key={index} className="h-24 border border-gray-400 rounded-lg flex items-center overflow-hidden justify-center text-white cursor-pointer relative">
                            <img src={image} alt="Product Image" className="w-full h-full object-cover" />
                            <div className='absolute left-0 top-0 bg-red-800 opacity-90 rounded-r-lg rounded-t-none p-1 ' onClick={()=>{
                                deleteImage(image);
                            }} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4" className=' w-4 transition-transform duration-300 hover:scale-125'>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>

                            </div>

                        </div>
                    )) : (<label className='text-sm text-gray-600'>No Images found for this product</label>
                    )}
                    </ReactSortable>

                    {loading && (<div className='h-24'>
                        <HashLoader></HashLoader>
                    </div>)}


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
