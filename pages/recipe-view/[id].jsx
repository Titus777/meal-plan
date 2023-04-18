import React from "react";
import Header from "../../common/components/Header/Header";
import { useEffect } from "react";
import useFetcher from "../../common/hooks/useFetcher";
import { useState } from "react";
import { useRouter } from "next/router";
import RecipeIngredients from "../../common/components/RecipeView/RecipeIngredients";
import dynamic from "next/dynamic";
const Speech = dynamic(() => import("react-speech"), { ssr: false });

function RecipeView() {
  const [recipe, setRecipe] = useState({});
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  console.log(router.query.id);
  const getRecipe = async () => {
    if (router.query.id) {
      const fetched = await useFetcher("FIND", "ID", { id: router.query.id });
      setRecipe(fetched);
      setMounted(true);
    }else{
      setMounted(false)
      setRecipe({});
    }
   
  };

  useEffect(() => {
    getRecipe()
  }, [router.query.id]);
  return (
    <div>
      {!mounted ? (
        <div className="hero">
          <div className="hero-content"> PLEASE FOR THE RECIPE TO LOAD </div>
        </div>
      ) : (
        <div data-theme="lemonade">
          <Header />
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-col-reverse w-9/12">
              <a className="btn btn-primary mt-10" href="#cooking">See the ingredients and instructions</a>
              <img
                src={`/foodImages/${recipe.Image_Name}.jpg`}
                className="max-w-lg rounded-lg shadow-2xl lg:w-9/12 h-9/12"
              />
              <div>
                <h1 className="text-3xl font-bold mb-10 text-center">
                  {recipe.Title}
                </h1>
              </div>
            </div>
          </div>
         
          <RecipeIngredients recipe={recipe} />
        </div>
      )}
    </div>
  );
}

export default RecipeView;
