import React from "react";
import ResultLayout from "../common/components/RecipeList/ResultLayout";
import RecipeList from "../common/components/RecipeList/RecipeList";
import Header from "../common/components/Header/Header";
import {useSession} from "next-auth/react"
import {useRouter} from "next/router"

function Search() {
  const {data:session} = useSession()
  const router = useRouter()
  if(session?.isNewUser && typeof window !="undefined"){
    router.push("/form")
  }
  return (
    <div data-theme="lemonade" className="bg-emerald-100">
      <Header />
      <div className="flex justify-center mx-auto items-center">
        <RecipeList />
      </div>
    </div>
  );
}
export default Search;
