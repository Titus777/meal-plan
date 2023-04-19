import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import Auth0Provider from "next-auth/providers/auth0"
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../common/model/User";
import {hash,compare} from "bcrypt"

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
        await dbConnect();

        async function register(){
          try{
              if(!credentials){
      
                  return null
              }
          
              const {email, password} = credentials
          
                  hash(password, 10, async function(err,hash){
          
                      const existingUser = await User.findOne({email})
                      if(existingUser){
                          return null
                      }
                      
                      const user = new User({
                          email: email,
                          password: hash,
                          
                          details: [
                              {first_name: "",
                               last_name: "",
                               activity: "",
                               diet: "",
                               exercise_time: 0,
                               favorite_food: "",
                               favorite_recipes:[ {} ] ,
                               uploaded_recipes:[ {} ] ,
                               goals: [""],
                               sex: "",
                               pref_intake:0,
                               weight:0,
                               height:0 
                              }
                          ],
                          notes: [
                              {dates: [],
                              notes: [""],
                              recipe_notes: [{}]}
                              ],
                          new: true,
      
                          created_at: new Date()
                      })
                      await user.save().catch(error => 
                          {
                              return null
                              console.error(error)
                          })
                      if(!err){
                          return user
                          
                      }else{
                          return null
                      }            
                  })
          }catch(e){
              console.error(e)
              return null
          }
         
        }
        const registered = await register()
        if(registered == null){
          try{
            if(!credentials){
                
                return null
            }
        
            const {email, password} = credentials
                hash(password, 10, async function(err,hash){
         
                    
                    const user = await User.findOne({email: email})
    
                    if(!user){
                      
                        return null;
                    }
                
                    const isMatch = await compare(password, user.password);
            
                    if (!isMatch) {
                      console.error("Is not match")
                      return null;
                    }
                    
                    return user
                })
       
           
        }catch(e){
            return null
        }
       
        }}
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