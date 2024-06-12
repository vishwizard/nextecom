import Layout from '@/Components/layout'
import Link from "next/link"
export default function Product() {
  return (
    <Layout>
        <Link href={'/product/New'} className="bg-blue-900 text-white p-2 rounded-md">Add New Product</Link>
    </Layout>
  )
}
