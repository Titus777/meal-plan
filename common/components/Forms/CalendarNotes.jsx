import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import PaginationComp from "../PaginationComponent/PaginationComp";
import useRecipeSearch from "../../hooks/useRecipeSearch";

function CalendarNotes() {

  const [query, setQuery] = useState("");
  const [done, setDone] = useState(false);
  const [next,setNext] = useState(false)
  const [nextUrl,setNextUrl] = useState("")


  const { recipes, error } = useRecipeSearch(query,next,nextUrl);
 
    useEffect(() =>{

    },[query])

  console.log(next,nextUrl,recipes)
  return (
    <div className="card w-fit bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Your recipes to eat for today!</h2>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-success w-full max-w-xs"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn btn-primary"
         
        >
          Look for Item to add
        </button>
        {recipes ? (
          <PaginationComp
            itemsPerPage={6}
            items={[recipes]}
            isApi={true}
            setNext = {setNext}
            setNextUrl = {setNextUrl}
          />
        ) : (
          <div>Loading....</div>
        )}
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Add</button>
        </div>
      </div>
    </div>
  );
}

export default CalendarNotes;
