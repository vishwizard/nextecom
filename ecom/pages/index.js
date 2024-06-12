import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <div className="bg-blue-900 w-screen h-screen flex items-center">
      <div className="text-center w-full">
        <buttn className='bg-white p-2 rounded-lg px-4' onClick={() => signIn('google')}>Login With Google</buttn>
      </div>
    </div>
  
  )
}
 
