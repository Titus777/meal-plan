import React from "react";
import { useRouter } from "next/router";

function RecipeCard({ recipe }) {
  const router = useRouter();
  console.log(recipe);
  return (
    <tr className="flex flex-col lg:flex-row justify-center bg-yellow-100 card my-6 shadow-2xl">
       <td className="justify-start item-start self-start h-fit w-1/2">
          <figure className="">
            <img src={recipe?.image} className="w-full" alt="Album" />
          </figure>
        </td>
      <div className="flex-row w-1/2">
        <td className="flex justify-center">
          <h2 className="card-title">{recipe?.title}</h2>
        </td>
        <td className="flex justify-center">
          <p className="text-lg">Servings {recipe?.servings} and ready in {recipe?.readyInMinutes} minutes</p>
        </td>
        <td className="flex justify-center">
          <p className="divider divider-vertical">
            Author -
            {!recipe?.sourceName ? " Unknown" : <a href={recipe?.sourceUrl}>{recipe?.sourceName}</a>}
          </p>
        </td>
        <td className="flex flex-row justify-center ">
          <div className="flex-col border-2 border-red-400 rounded-md">
            <h1 className="text-xl mx-2">
              Calories {Math.floor(recipe?.nutrition?.nutrients[0]?.amount)}kcal{" "}
            </h1>
            <h1 className="text-xl mx-2">
              Carbs{" "}
              {Math.floor(recipe?.nutrition?.caloricBreakdown?.percentCarbs)}
              {" g"}
            </h1>
          </div>
          <div className="divider divider-horizontal"></div>
          <div className="flex-col border-2 rounded-md border-red-400">
            <h1 className="text-xl mx-2">
              Fats {Math.floor(recipe?.nutrition?.caloricBreakdown?.percentFat)}
              {" g"}
            </h1>
            <h1 className="text-xl mx-2">
              Protein{" "}
              {Math.floor(recipe?.nutrition?.caloricBreakdown?.percentProtein)}
              {" g"}
            </h1>
          </div>
        </td>
        <td className="flex justify-center">
          <button
            className="btn"
            onClick={() => {router.push(`/recipe-view/${recipe?.id}`)}}
          >
            See More
          </button>
        </td>
      </div>
    </tr>
  );
}

export default RecipeCard;
