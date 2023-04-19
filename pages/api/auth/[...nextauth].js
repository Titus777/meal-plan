import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import Auth0Provider from "next-auth/providers/auth0"
import CredentialsProvider from "next-auth/providers/credentials";
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions= {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    /* EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
       }),
    // Temporarily removing the Apple provider from the demo site as the
    // callback URL for it needs updating due to Vercel changing domains
    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: {
        appleId: process.env.APPLE_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      },
    }),
    */
    CredentialsProvider({
      name:"Credentials",

      credentials: {
        email: {label: "Email", type: "text", placeholder: "email@email.com"},
        password: {label: "Password", type: "password"}
      },

      async authorize(credentials,req){
        console.log("I started")
        console.log(credentials.email)
        let response = await fetch(`${process.env.NEXTAUTH_URL}api/register`, {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({credentials}),
        })
        console.log(response)
        let user = await response.json()

        if(response.status == 422){
          response = await fetch(`${process.env.NEXTAUTH_URL}api/login`,{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(credentials),
          })
          user = await response.json()
        }
        if(response.ok && user){
          console.log("I will return user")
          return user
        }else{
          return null
        }
      }
    }),
    
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token, account,user,profile, isNewUser,trigger }) {
      // Persist the OAuth access_token to the token right after signin
      if(account){
        token.id = user.id
        token.email = user?.email
        token.isNewUser = user?.new
      }

      if(trigger === "update"){
        console.log("I am triggered")
        token.isNewUser = false
      }
      
      return token
    },
    async session({ session, token, user,newSession,trigger }) {
      // Send properties to the client, like an access_token from a provider.
      session.id = token.id
      session.user.email = token?.email
      session.isNewUser = token.isNewUser 
      return session
    }
  },
  session: {
    jwt: true,
    maxAge: 24*60*60  
  },
}

export default NextAuth(authOptions)