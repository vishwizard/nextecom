
import ProductForm from '@/Components/ProductForm';
import Layout from '@/Components/layout'
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'


export default function Edit() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/product?id='+id).then(res => {
      setProductInfo(res.data);
    })
  }, [id])

  return (
    <Layout>
      <h1>Edit Product Details</h1>
      {productInfo && (<ProductForm {...productInfo}></ProductForm>
)}
    </Layout>
  )
}
