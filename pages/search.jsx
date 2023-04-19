import React from "react";
import dbConnect from "../lib/dbConnect";
import clientPromise from "../lib/mongodb";

import RecipeList from "../common/components/RecipeList/RecipeList";
import Header from "../common/components/Header/Header";
import {getSession,useSession} from "next-auth/react"
import {useRouter} from "next/router"
import useRecipeSearch from "../common/hooks/useRecipeSearch"
import User from "../common/model/User";


export async function getServerSideProps(context) {
  // Fetch data from external API
  await dbConnect();
  const client = await clientPromise;
    
  const ctx = await getSession(context);
  const data = await(await fetch(`${process.env.NEXTAUTH_URL}/api/getRecipe/${context?.query.query}`)).json()
  const user = await User.find({email:ctx?.user?.email})

  // Pass data to the page via props
  return { props: { data: JSON.parse(JSON.stringify(data)), user:JSON.parse(JSON.stringify(user)) } }
}


function Search({data,user}) {
  const {data:session} = useSession()
  const router = useRouter()
  if(session?.isNewUser && typeof window !="undefined"){
    router.push("/form")
  }
 
  return (
    <div data-theme="lemonade" className="bg-emerald-100">
      <Header />
      <div className="flex justify-center mx-auto items-center">
        <RecipeList data={data} user={user} />
      </div>
    </div>
  );
}
export default Search;
