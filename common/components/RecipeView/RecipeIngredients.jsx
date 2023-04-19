import React, { useEffect } from "react";
import dynamic from "next/dynamic";
const Speech = dynamic(() => import("react-speech"), { ssr: false });

function RecipeIngredients({recipe}) {
  let speachReadyInst = ""
  let speachReadyIngr = "You will need "
  const readableInstructions = recipe?.analyzedInstructions[0]?.steps
  readableInstructions?.forEach((element) => {
    speachReadyInst += ' '
    speachReadyInst += element.step
  });
  const readableIngredients = recipe?.extendedIngredients.forEach((element) =>{
    speachReadyIngr += '. '
    speachReadyIngr += element?.amount
    speachReadyIngr += ' '
    speachReadyIngr += element?.unit
    speachReadyIngr += ' '
    speachReadyIngr += element?.name 
    speachReadyIngr += `. Can be found in the ${element?.aisle} section`
    
  })

  return (
    <div id="cooking" className="flex flex-row min-h-screen bg-base-primary">
      <div className="card lg:card-side bg-green-300 shadow-xl w-1/2">
        <div className="card-body">
          <h2 className="card-title">Instructions: Listen them if they are present!</h2>
          <div className="card-actions text-2xl">
            {recipe?.analyzedInstructions ?  
            <Speech
              text={speachReadyInst}
              stop={true}
              resume={true}
              pause={true}
              voice="Google UK English Female"
            /> : <h1>The instructions can be found here <a href={recipe?.sourceUrl}>Click here</a></h1>
            }
          </div>
          <div className="border-4 bg-cyan-200 rounded shadow-2xl border-slate-300">
            {recipe?.analyzedInstructions ? recipe?.analyzedInstructions[0]?.steps.map((value, index) => {
              return (
                <p className="flex text-center justify-center">
                  Step {value?.number} -- {value?.step}
                </p>
              );
            }): <h1>No instructions found</h1>}
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
              text={speachReadyIngr}
              stop={true}
              resume={true}
              pause={true}
              voice="Google UK English Female"
            />
          </div>
          <div className="border-4 rounded shadow-2xl border-slate-300 bg-green-200 justify-center">
            {recipe?.extendedIngredients.map((value, index) => {
              return <span className="flex justify-center">  {value?.amount} {value?.unit} of {value?.name} -- can be found in {value?.aisle} section</span>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeIngredients;
