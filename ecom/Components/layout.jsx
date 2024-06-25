import Nav from "@/Components/Nav"
import { useSession, signIn, signOut } from "next-auth/react"
import Logo from "./Logo"
import { useState } from "react"

export default function Layout({ children }) {
  const { data: session } = useSession()

  const [nav,setNav] = useState(false);
  if (session) {
    return (
      <div className="bg-blue-900 min-h-screen">
        <div className="flex p-2 md:hidden text-white" >
        
          <div className="m-auto">
            <Logo extraClass={'text-white'}></Logo>
          </div>
          <button onClick={()=>{
            setNav(true);
          }} className="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          </button>
          

        </div>
        <div className=" flex">
          <Nav NavStatus={nav}></Nav>
          <div className="bg-white flex-grow mt-2 mr-2 min-h-screen rounded-lg p-4 mb-2 ml-2 md:ml-0">
            {children}

          </div>
        </div>

      </div>
    )
  }
  else{
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <buttn className='bg-white p-2 rounded-lg px-4 cursor-pointer' onClick={() => signIn('google')}>Login With Google</buttn>
        </div>
      </div>
  
    )
  }

}

