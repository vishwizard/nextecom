import { useSession } from "next-auth/react"
import Layout from "../Components/layout"
export default function Home() {
  const { data: session } = useSession();
  console.log(session?.user?.image)

  return <Layout>
    <div className="flex justify-around items-center">
      <div className>
        <h2>Hello, <b className='text-blue-900'>{session?.user?.name}</b> </h2>
      </div>
      <div className="flex gap-2 items-center bg-gray-300 p-2 rounded-lg text-blue-900">
      <img src={session?.user?.image} className="w-8 h-8 rounded-lg" alt="User Image"/>
      <h2><b>{session?.user?.name}</b> </h2>
      </div>
      

      </div>
  </Layout>

}