import Layout from '@/Components/layout'
import Link from "next/link"
import { useEffect, useState } from 'react'
import axios from 'axios';


export default function Product() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('/api/product').then(res => {
      setProducts(res.data);
    })
  }, [])


  return (
    <Layout>
      <Link href={'/product/New'} className="bg-blue-900 text-white p-2 rounded-md">Add New Product</Link>
      <table className="basic mt-7 ">
        <thead>
          <tr>
            <td>Product Title</td>
            <td>Product Description</td>
            <td>Product Price</td>
            <td>Images</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {products.map((i) => {
            return <tr key={i._id} className=''>
              <td>{i.title}</td>
              <td>{i.description}</td>
              <td>{i.price}</td>
              <td className="relative">
                 <img src={i.images[0]} className="w-12 transition-transform duration-300 hover:scale-150 hover:z-20 hover:absolute
                 "></img>
                  <span className="absolute left-0 top-0 z-10 bg-blue-900 p-1 rounded-r-lg rounded-b-lg rounded-t-none rounded-l-none text-white text-sm">{i.images.length}</span>
              </td>
              <td className="flex gap-2 ">
                <Link href={'/product/edit/' + i._id}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>

                  Edit</Link>
                <Link href={'/product/delete/' + i._id}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>


                  Delete
                </Link>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </Layout>
  )
}
