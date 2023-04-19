import React from "react";
import RecipeCard from "./RecipeCard";
import { useEffect } from "react";
import useFetcher from "../../hooks/useFetcher";
import { useRef } from "react";
import { useState } from "react";
import {useRouter} from "next/router"
import ReactPaginate from 'react-paginate';
import PaginationComp from "../PaginationComponent/PaginationComp";
import useRecipeSearch from "../../hooks/useRecipeSearch";

function RecipeList({data,user}) {
  const [searchDone, setSearchDone] = useState(false);
  const updatedRecipes = useRef([]);
  const router = useRouter()
 
  let call = async () => {
    
    
    console.log(updatedRecipes.current);
    if (updatedRecipes) {
      setSearchDone(true);
    }
    setSearchDone(true);
  };
  useEffect(() => {
    call();
  }, [searchDone]);
  return (
    <div>
      {!searchDone ? (
        <div>Loading.....</div>
      ) : (
        <div>
         <PaginationComp itemsPerPage={6} items={data}/>
        </div>
      )}
    </div>
  );
}

export default RecipeList;
