import Layout from '@/Components/layout'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'

function Categories({ swal }) {

    const [categoryList, setCategoryList] = useState([]);
    const [category, setCategory] = useState('');
    const [editable, setEditable] = useState(null);
    const [parent, setParent] = useState('');
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        getCategories();
    }, [])

    function getCategories() {
        axios.get('/api/category').then(res => {
            setCategoryList(res.data);
            console.log('done');
        })
    }

    async function saveCategory(e) {
        e.preventDefault();
        // console.log(e);
        const data = {
            Title: category,
            Parent: parent,
            Properties: properties
        };

        if (editable) {
            const res = await axios.put('/api/category', { ...data, _id: editable._id });
            setEditable('');
        } else {
            const res = await axios.post('/api/category', data);
        }
        setCategory('');
        setParent("0");
        setProperties([]);
        getCategories();
    }

    async function deleteCategory(category) {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${category.Title}?`,
            icon: 'error',
            confirmButtonText: 'Yes! Delete',
            cancelButtonText: 'Cancel',
            showCancelButton: true,
            confirmButtonColor: "#d55"
        }).then(async (res) => {
            if (res.isConfirmed) {
                const res = await axios.delete('/api/category', { _id: category._id });
                getCategories();
            }
        })
    }

    function editCategory(category) {
        setEditable(category);
    }

    useEffect(() => {

        setCategory(editable?.Title);
        setParent(editable?.Parent?._id || "0");
        setProperties(editable?.Properties || []);

    }, [editable])

    function addProperty() {
        setProperties(prev => [...prev, { name: '', value: '' }]);
    }
    
    function removeProperty(index) {
        setProperties(prev => {
            return prev.filter((_, i) => i !== index)
        })
    }

    function handleNameChange(index, property, name) {
        setProperties(prev => {
            const props = [...prev];
            props[index].name = name;
            return props;
        }
        )
    }

    function handleValueChange(index, property, value) {
        setProperties(prev => {
            const props = [...prev];
            const valuesArray = value.split(',');
            props[index].value = valuesArray;
            return props;
        }
        )
    }

    return (
        <Layout>
            <h1>Categories</h1>
            <form onSubmit={saveCategory}>
                <label>{editable ? "Edit Category" : "Add New Category"}</label>
                <div className='flex gap-1'>
                    <div className='flex items-center gap-2'>
                        <input onChange={(e) => {
                            setCategory(e.target.value);
                        }}
                            placeholder='Category Name'

                            value={category}>
                        </input>
                        <select
                            value={parent} onChange={(e) => { setParent(i => e.target.value) }}
                        >
                            <option value='0'>
                                No parent Category
                            </option>
                            {categoryList.length > 0 && categoryList.map((Category) => {
                                return (
                                    <option value={Category._id} key={Category._id} >
                                        {Category.Title}
                                    </option>
                                )
                            })
                            }
                        </select>

                    </div>

                </div>
                <label>Properties</label>
                <button className='btn-primary block text-sm  mb-2' onClick={addProperty} type='button'>Add Property</button>
                {properties ? properties.map((property, index) => {
                    return (
                        <div className='flex gap-1 mb-2' key={index}>
                            <input placeholder='Property Name (Ex- Color)' value={property.name} onChange={(e) => {
                                handleNameChange(index, property, e.target.value)
                            }} className='mb-0'></input>
                            <input placeholder='Property Values (Comma seperated)' className='mb-0' value={property.value} onChange={(e) => {
                                handleValueChange(index, property, e.target.value)
                            }}></input>
                            {/* <button type='button' onClick={()=>{
                                removeProperty(index)
                            }
                            }
                            className='btn-primary '

                            >Remove</button> */}
                            <div className='flex items-center justify-center cursor-pointer bg-red-600 p-1 rounded-md text-white' onClick={() => {
                                removeProperty(index)
                            }
                            }>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 transform transition-transform duration-300 hover:scale-110">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>



                        </div>
                    )
                }) : ''}
                <button type='submit' className='btn-primary'>Save</button>
                {editable && (<button onClick={() => {
                    setEditable(false)
                    setCategory('')
                }}
                    className='btn-default ml-1'>Cancel</button>)}
            </form>

            {
                editable ? '' : <table className='basic mt-2'>
                    <thead>
                        <tr>
                            <td>Category Label</td>
                            <td>Parent Category</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryList.length > 0 ? categoryList.map((Category,index) => {
                            return (
                                <tr key={index}>
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
            }

        </Layout>
    )
}


export default function WithSwal({ Swal }) {

    return (
        <Categories swal={Swal}></Categories>
    )
}