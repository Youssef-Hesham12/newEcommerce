import { apiServices } from "@/services/api";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import GithubProvider from "next-auth/providers/github";
// import FacebookProvider from "next-auth/providers/facebook";
const handler = NextAuth({
  providers :[
    CredentialsProvider({
 // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
      password: { label: "Password", type: "password",placeholder:"********" }
    },
    async authorize(credentials, req) {

      credentials?.email
      credentials?.password
      const response = await apiServices.login(credentials?.email??"",credentials?.password??"")
      console.log(response);
      

      // Add logic here to look up the user from the credentials supplied

      if(response.message=="success")
      {
         const user = { id:response.user._id, name: response.user.name, email: response.user.email ,role:response.user.rule,token:response.token }
          console.log("respooooonse: ", user);
         return user
      }
     else{
      return null
     }
      // if (user) {
      //   // Any object returned will be saved in `user` property of the JWT
       
      // } else {
      //   // If you return null then an error will be displayed advising the user to check their details.
      //   return null

      //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      // }
    }
  })
],pages:{
  signIn:"/auth/login"
},callbacks:{
    async session({session,token}) {
      // session.user.id = token.id as string  
      session.user.role=token.role as string
      session.token=token.token as string
      return session
    },
    async jwt ({token,user}){
      if(user)
      {
      // token.id = user.id 
      token.token=user.token;
      token.role=user.role
      }
      return token
    }
},
secret:process.env.AUTH_SECRET,
session:{
  strategy:'jwt'
}


})

export { handler as GET, handler as POST }