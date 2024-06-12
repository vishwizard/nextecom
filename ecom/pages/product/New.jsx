import Layout from '@/Components/layout'
import React from 'react'
import { useState } from 'react';
import axios from 'axios'
export default function NewProduct() {

    const [title, setTitle] = useState('');

    const [desc, setDesc] = useState('');

    const [price, setPrice] = useState('');

    async function AddProduct(e){
        e.preventDefault();
        const data={
            title,
            desc,
            price
        };
        await axios.post('/api/product',data);
    }

    return (
        <Layout>
            <h1>Add New Product</h1>
            <form onSubmit={AddProduct}>
                <label>Product Name</label>
                <input
                    placeholder="Product Name"
                    value={title}
                    onChange={e => { setTitle(e.target.value) }} />

                <label>Product Description</label>
                <textarea placeholder="Product Description"
                value={desc}
                onChange={e => { setDesc(e.target.value) }} />

                <label>Product Price (in Rs)</label>
                <input placeholder="Price" type="number" 
                value={price}
                onChange={e => { setPrice(e.target.value) }}/>

                <button className='btn-primary' type="submit">Submit</button>
            </form>
        </Layout>
    )
}
