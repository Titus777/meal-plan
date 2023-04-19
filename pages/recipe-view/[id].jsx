import React from "react";
import Header from "../../common/components/Header/Header";
import { useEffect } from "react";
import useFetcher from "../../common/hooks/useFetcher";
import { useState } from "react";
import { useRouter } from "next/router";
import {useSession} from "next-auth/react"
import RecipeIngredients from "../../common/components/RecipeView/RecipeIngredients";
import dynamic from "next/dynamic";
const Speech = dynamic(() => import("react-speech"), { ssr: false });

function RecipeView() {
  const {data:session} = useSession()
  const [recipe, setRecipe] = useState({});
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
 
  console.log(router.query);
  const getRecipe = async () => {
    if (router?.query?.id) {
      const fetched = await fetch(`/api/getRecipe/id/${router?.query?.id}`);
      setRecipe(await fetched.json());
      setMounted(true);
    } else {
      setMounted(false);
      setRecipe({});
    }
  };

  const addMeal = async (e) => {
    e.preventDefault();
    const mealToSend = [session?.user?.email, new Date(e?.target?.date?.value).toDateString(),{
      name: recipe?.title,
      protein: recipe?.nutrition?.nutrients[8]?.amount,
      fats: recipe?.nutrition?.nutrients[1]?.amount,
      carbohydrates: recipe?.nutrition?.nutrients[3]?.amount,
      calories: recipe?.nutrition?.nutrients[0]?.amount,
      id:router?.query?.id,
      image: recipe?.image
    }];
    console.log(mealToSend)
    try{
      const res = await fetch("/api/crud/journal/edit-meals",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(mealToSend)
      })
      alert(await res.json())
      console.log(await res.json())
    }catch(e){
      console.log(e)
    }
  };
  console.log(recipe);
  useEffect(() => {
    getRecipe();
  }, [router.query.id,mounted]);
  return (
    <div>
      {!mounted ? (
        <div className="hero">
          <div className="hero-content"> PLEASE FOR THE RECIPE TO LOAD </div>
        </div>
      ) : (
        <div data-theme="lemonade">
          <Header />
          <input type="checkbox" id="my-modal-5" className="modal-toggle" />
          <div className="modal">
            <form onSubmit={addMeal} className="modal-box">
              <p className="py-4">
                Please add the recipe to the date of when you want it to be
                eaten.
              </p>
              <label htmlFor="date"> Date </label>
              <input
                type="date"
                name="date"
                className="border-4 border-red-200"
              />

              <div className="modal-action">
                <input
                  htmlFor="my-modal-5"
                  type="submit"
                  value="ADD"
                  className="btn"
                />
                <label htmlFor="my-modal-5" className="btn">
                  Close
                </label>
              </div>
            </form>
          </div>
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-col-reverse w-9/12">
              <a className="btn btn-primary mt-10" href="#cooking">
                See the ingredients and instructions
              </a>
              <label htmlFor="my-modal-5" className="btn btn-secondary">
                Add to calendar
              </label>
              <img
                src={recipe?.image}
                className="max-w-lg rounded-lg shadow-2xl lg:w-9/12 h-9/12"
              />
              <div>
                <h1 className="text-3xl font-bold mb-10 text-center">
                  {recipe?.title}
                </h1>
                <h4 dangerouslySetInnerHTML={{ __html: recipe?.summary }} />
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
