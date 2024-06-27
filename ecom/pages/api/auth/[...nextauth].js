import clientPromise from "@/lib/db"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth, { getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const adminEmails = ['deyamrit959@gmail.com', 'soniabhinav7606@gmail.com'];

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter:MongoDBAdapter(clientPromise),
  callbacks:{
    session:({session,token,user})=>{
      if(adminEmails.includes(session?.user?.email)){
        return session;
      }
      else{
        return false;
      }
    }
  }
}

export default NextAuth(authOptions)

export async function isAdmin(req,res){
  const session = await getServerSession(req,res,authOptions);
  // console.log(session);
  if(!adminEmails.includes(session?.user?.email)){
    throw "You are not authorised to access this section";
  }
}
