// import NextAuth from "next-auth"

// declare module "next-auth" {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     token:string
//     user: {
//       /** The user's postal address. */
//       role: string
//     }
//   }
// }



import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"];
    token?: string;
  }

  interface User extends DefaultUser {
    role?: string;
    token?: string;
  }

  interface JWT {
    role?: string;
    token?: string;
  }
}
