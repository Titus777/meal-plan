import React from "react";
import { useRouter } from "next/router";

function RecipeCard({ recipe }) {
  const router = useRouter();
  console.log(recipe);
  return (
    <tr className="flex flex-col">
      <td className="justify-start h-fit">
        <figure className="">
          <img src={recipe?.recipe?.image} alt="Album" />
        </figure>
      </td>
      <td className="justify-center">
        <h2 className="card-title">{recipe?.recipe?.label}</h2>
      </td>
      <td className="">
        <p className="divider divider-vertical">
          Author -
          {!recipe?.recipe?.source ? " Unknown" : recipe?.recipe?.source}
        </p>
      </td>
      <td className="flex flex-row justify-center">
        <div className="flex-col">
          <h1 className="text-xl">Calories {Math.floor(recipe?.recipe?.calories)}kcal </h1>
          <h1 className="text-xl">
            Carbs{" "}
            {Math.floor(recipe?.recipe?.totalNutrients?.CHOCDF?.quantity)}{" g"}
          </h1>
        
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="flex-col">
        <h1 className="text-xl">
            Fats {Math.floor(recipe?.recipe?.totalNutrients?.FAT?.quantity)}{" g"}
          </h1>
          <h1 className="text-xl">
            Protein{" "}
            {Math.floor(recipe?.recipe?.totalNutrients?.PROCNT?.quantity)}{" g"}
          </h1>
        </div>
      </td>
      <td className="flex justify-center">
        <button
          className="btn"
          onClick={() => router.push(`/recipe-view/${recipe?.recipe?.url}`)}
        >
          See More
        </button>
      </td>
    </tr>
  );
}

export default RecipeCard;
