import Head from "next/head";
import clientPromise from "../lib/mongodb";
import Header from "../common/components/Header/Header";
import WelcomeCard from "../common/components/WelcomeCard/WelcomeCard";
import RecipeList from "../common/components/RecipeList/RecipeList";
import dbConnect from "../lib/dbConnect";
import { getSession, signOut, useSession } from "next-auth/react";
import {useRouter} from "next/router"

export async function getServerSideProps(context) {
  

  try {
    await dbConnect();
    const client = await clientPromise;
    const db = client.db("mealtracker");
    

    const ctx = await getSession(context);
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }

}


export default function Home({ isConnected }) {
  
  const {data: session,update} = useSession()
  const router = useRouter()
  
  if(session?.isNewUser && typeof window !="undefined"){
    router.push("/form")
  }
  console.log(session)
  
  return (
    <div data-theme="lemonade">
      <Header session/>
      <WelcomeCard />
    </div>
  );
}
