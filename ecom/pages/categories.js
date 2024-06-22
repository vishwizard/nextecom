import Layout from '@/Components/layout'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import Swal from 'sweetalert2'

 function Categories({swal}) {

    const [categoryList, setCategoryList] = useState([]);
    const [category, setCategory] = useState('');
    const [editable, setEditable] = useState(null);
    const [parent, setParent] = useState('');

    useEffect(() => {
        getCategories();
    }, [])

    function getCategories() {
        axios.get('/api/category').then(res => {
            setCategoryList(res.data);
        })
    }

    async function saveCategory(e) {
        e.preventDefault();
        // console.log(e);
        const data = {
            Title: category,
            Parent: parent
        };

        if (editable) {
            const res = await axios.put('/api/category', {...data,_id:editable._id});
            setEditable('');
        } else {
            const res = await axios.post('/api/category', data);
        }
        setCategory('');
        setParent("0");
        getCategories();
    }

    async function deleteCategory(category) {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${category.Title}?`,
            icon: 'error',
            confirmButtonText: 'Yes! Delete',
            cancelButtonText: 'Cancel',
            showCancelButton:true,
            confirmButtonColor:"#d55"
          }).then(async (res)=>{
            if(res.isConfirmed){
            const res = await axios.delete('/api/category', {_id:category._id});
            }
          })


        getCategories();

    }

    function editCategory(category) {
        setEditable(category);
    }

    useEffect(() => {

        setCategory(editable?.Title);
        setParent(editable?.Parent?._id || "0");

    }, [editable])

    return (
        <Layout>
            <h1>Categories</h1>
            <form onSubmit={saveCategory}>
                <label>{editable ? "Edit Category" : "Add New Category"}</label>
                <div className='flex items-center gap-2'>
                    <input onChange={(e) => {
                        setCategory(e.target.value);
                    }}
                        placeholder='Category Name'
                        className='m-0'
                        value={category}>
                    </input>
                    <select className='mb-0 '
                        value={parent} onChange={(e) => { setParent(i => e.target.value) }}
                    >
                        <option value='0'>
                            No parent Category
                        </option>
                        {categoryList.length > 0 && categoryList.map((Category) => {
                            return (
                                <option value={Category._id} >
                                    {Category.Title}
                                </option>
                            )
                        })
                        }
                    </select>
                    <button type='submit' className='btn-primary'>Save</button>
                </div>
            </form>

            <table className='basic mt-2'>
                <thead>
                    <tr>
                        <td>Category Label</td>
                        <td>Parent Category</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {categoryList.length > 0 ? categoryList.map((Category) => {
                        return (
                            <tr>
                                <td>
                                    {Category.Title}
                                </td>
                                <td>
                                    {Category?.Parent?.Title}
                                </td>
                                <td className="flex gap-2 items-center flex-wrap">
                                    <button className="btn-primary"
                                        onClick={
                                            () => {
                                                editCategory(Category)
                                            }
                                        }
                                    >Edit</button>
                                    <button className='btn-primary' onClick={() => {
                                        deleteCategory(Category);
                                    }}>Delete</button>
                                </td>
                            </tr>
                        )
                    }) : "No categories Added"}
                </tbody>
            </table>
        </Layout>
    )
}


export default function withSwal({Swal}){

return (
    <Categories swal={Swal}></Categories>
)
}