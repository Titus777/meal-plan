import React, { useState } from "react";
import {useRouter} from 'next/router'
import Image from "next/image"

function WelcomeCard() {
  const [query,setQuery] = useState()
  const router = useRouter()
  console.log(query)
  const search = () =>{
    console.log("here")
    if(query){
      router.push({pathname:"/search",query:{query:query}})
    }else{
      alert("Please type any word into the recipe searcher")
    }
  }
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url("/images/background.png")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome</h1>
          <p className="mb-5">
            <input
              type="text"
              placeholder="Search Recipe"
              onChange={(e) =>setQuery(e.target.value)}
              className="input input-bordered input-accent w-full max-w-xs font-bold"
            />
          </p>
          <button className="btn btn-primary" onClick={search}>Search Delicous Recipes!</button>
          
        </div>
      </div>
    </div>
  );
}

export default WelcomeCard;
