import React from "react";
import RecipeCard from "./RecipeCard";
import { useEffect } from "react";
import useFetcher from "../../hooks/useFetcher";
import { useRef } from "react";
import { useState } from "react";
import ReactPaginate from 'react-paginate';
import PaginationComp from "../PaginationComponent/PaginationComp";

function RecipeList() {
  const [searchDone, setSearchDone] = useState(false);
  const updatedRecipes = useRef([]);
 
  let call = async () => {
    updatedRecipes.current = await useFetcher("FIND", "RECIPES");
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
         <PaginationComp itemsPerPage={6} items={updatedRecipes.current}/>
        </div>
      )}
    </div>
  );
}

export default RecipeList;
