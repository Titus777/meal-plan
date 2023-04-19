import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import useJournal from "../../hooks/useJournal";
import { useSession } from "next-auth/react";
import Link from "next/link";

function CalendarNotes({ journal, date }) {
  const { data: session } = useSession();
  const currentRecipes = useRef([])
  const [query, setQuery] = useState("");
  const [change, setChange] = useState(false);
  const [update, setUpdate] = useState(date)
  const [recipe,setDone] = useState([])

  const sendNotes = (e) => {
    e.preventDefault();
    console.log("called");
    useJournal("CHANGE", "NOTES", [session?.user?.email, query, date]);
  };
  const removeRecipe = async (id) => {
    const res = await fetch(`/api/crud/journal/delete-meals/${id}`)
    if(res.status == 200){
      setUpdate(date)
    }
  };
  console.log(currentRecipes.current)
  useEffect(()=>{
    calorie_journal[0].notes.forEach((value, index) => {
      if (value?.date === date && update) {
        currentRecipes.current = []
        value?.meals.forEach((recipe, index) => {
          currentRecipes.current.push(recipe)
        })
        setUpdate(date)
      }else{
        currentRecipes.current = []
        setUpdate(date)
      }
    })
  },[currentRecipes.current,date])

  const { calorie_journal } = journal;

  return (
    <div className="card w-fit bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Your recipes to eat for today!</h2>
        {currentRecipes?.current ? currentRecipes.current.map((recipe,index) =>{
              return (
                <div className="indicator">
                  <span className="indicator-item badge badge-secondary">
                  <button type="submit"
                      className="text-red-600 text-xl flex"
                      onClick={() => removeRecipe(recipe?._id)}
                    >
                      X
                    </button>
                  </span>

                  <div
                    key={index}
                    className="flex flex-row shadow-2xl shadow-green-800 bg-primary rounded-md my-2 items-center"
                    href={`/recipe-view/${recipe?.id}`}
                  >
                    <img className="w-24 h-12" src={recipe?.image} />
                    <Link
                      className="mx-4 link-accent"
                      href={`/recipe-view/${recipe?.id}`}
                    >
                      {recipe?.name}
                    </Link>

                  </div>
                </div>
              )}): <div>No Recipies were found</div>}
        {change ? (
          <form onSubmit={sendNotes} className="flex flex-col justify-center">
            <textarea
              className="textarea textarea-primary"
              onChange={(e) => setQuery(e.target.value)}
            ></textarea>
            <input type="submit" value="Submit" className="btn btn-secondary" />
          </form>
        ) : (
          calorie_journal[0].notes.map((value, index) => {
            if (new Date(value?.date).toDateString() == date) {
              return (
                <textarea
                  key={index}
                  className="textarea textarea-primary"
                  value={value?.note}
                  readOnly={true}
                ></textarea>
              );
            } else {
              if (index == calorie_journal[0].notes.length - 1) {
                return <h1>No entries were found</h1>;
              }
            }
          })
        )}

        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => {
              if (change) {
                setChange(false);
              } else {
                setChange(true);
              }
            }}
          >
            Change notes
          </button>
          {calorie_journal[0].notes.map((value, index) => {
            console.log(value?.date, date);
            return <div>{value?.date}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default CalendarNotes;
