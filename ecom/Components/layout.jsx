import Nav from "@/Components/Nav"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Layout({children}) {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
      <div className="bg-blue-900 min-h-screen flex">
        <Nav></Nav>
        <div className="bg-white flex-grow mt-2 mr-2 rounded-lg p-4 mb-2">
        {children}

        </div>
      {/* <button onClick={() => signOut()}>Sign out</button> */}
      </div>
        
      </>
    )
  }
  return (
    <div className="bg-blue-900 w-screen h-screen flex items-center">
      <div className="text-center w-full">
        <buttn className='bg-white p-2 rounded-lg px-4 cursor-pointer' onClick={() => signIn('google')}>Login With Google</buttn>
      </div>
    </div>
  
  )
}
 
