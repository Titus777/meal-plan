import React, { useEffect } from "react";
import dynamic from "next/dynamic";
const Speech = dynamic(() => import("react-speech"), { ssr: false });

function RecipeIngredients(recipe) {
  const ingredientsText = recipe.recipe.Ingredients.replaceAll("'", " ")
    .replace("[", " ")
    .replace("]", " ");
  
  const getNutrition = async (text) =>{
    text = ingredientsText.slice(' ,').replaceAll(','," \n")
    const message = {
      ingr: [`${text}`]
    }
    const res = await fetch('/api/edman/getNutrition',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(message)
    })


  }
  
  useEffect(() =>{
    getNutrition(ingredientsText)
  },[ingredientsText])

  return (
    <div id="cooking" className="flex flex-row min-h-screen bg-base-primary">
      <div className="card lg:card-side bg-green-300 shadow-xl w-1/2">
        <div className="card-body">
          <h2 className="card-title">Instructions</h2>
          <div className="card-actions text-2xl">
            {" "}
            Listen to Instructions
            <Speech
              text={recipe.recipe.Instructions}
              stop={true}
              resume={true}
              pause={true}
              voice="Google UK English Female"
            />
          </div>
          <div className="border-4 bg-cyan-200 rounded shadow-2xl border-slate-300">
            {recipe.recipe.Instructions.split(". ").map((value, index) => {
              return (
                <p className="flex text-center justify-center">
                  {index + 1} {value}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className="card lg:card-side bg-yellow-100 shadow-xl w-1/2">
        <div className="card-body">
          <h2 className="card-title">Ingredients</h2>
          <div className="card-actions text-2xl">
            {" "}
            Listen to the ingredients
            <Speech
              text={recipe.recipe.Ingredients}
              stop={true}
              resume={true}
              pause={true}
              voice="Google UK English Female"
            />
          </div>
          <div className="border-4 rounded shadow-2xl border-slate-300 bg-green-200">
            {ingredientsText.split(" ,").map((value, index) => {
              return <span className="flex">- {value}</span>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeIngredients;
