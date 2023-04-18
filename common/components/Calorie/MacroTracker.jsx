import React from "react";
import Link from "next/link";

function MacroTracker(user) {
  let recommendedCalories;
  if(user.sex == "Male"){
    recommendedCalories = 2500
  }else{
    recommendedCalories = 2000
  }

  const calories =  (1600/recommendedCalories) * 100  

  return (
    <div className="flex h-fit bg-base-200 mx-4">
      <div className="w-full bg-yellow-100 shadow-xl">
        <div className="card-body flex flex-row rounded-md">
          <div className="flex flex-col w-1/2">
            <div className="divider divider-vertical text-xl">Proteins</div>
            <div className="flex flex-row">
              <div className="w-1/2">0</div>
              <div className="flex w-1/2 justify-end">0</div>
            </div>
            <progress className="progress w-full h-2/3 my-2" value="0" max="100"></progress>
            <div className="divider divider-vertical text-xl">Fats</div>
            <div className="flex flex-row">
              <div className="w-1/2">0</div>
              <div className="flex w-1/2 justify-end">0</div>
            </div>
            <progress className="progress w-full h-2/3 my-2" value="10" max="100"></progress>
            <div className="divider divider-vertical text-xl">Carbohydrates</div>
            <div className="flex flex-row">
              <div className="w-1/2">0</div>
              <div className="flex w-1/2 justify-end">0</div>
            </div>
            <progress className="progress w-full h-2/3 my-2" value="40" max="100"></progress>
          </div>
          <div className="flex flex-col justify-top items-center w-1/2 rounded-full border-4">
                <div className="divider divider-vertical w-4/5 self-center text-xl">Calories</div>
              
                <div className="radial-progress bg-primary text-primary-content border-4 border-primary " style={{"--value":calories, "--size":"10rem"}}>{calories}%</div>
            
          </div>
        </div>
        <Link className="flex w-full btn justify-center items-center" href="/tracker/journal"> Add journal</Link>
      </div>
    </div>
  );
}

export default MacroTracker;
