import React, { useEffect, useState } from "react";
import Link from "next/link";

function MacroTracker({ user, journal }) {
  const [today, setToday] = useState(new Date("04/13/2023"));
  const [eatenMacros, setMacros] = useState({});
  const [eatenCalorie, setCalories] = useState(0);
  const [changes, setChanges] = useState(false);

  const calculateMacrosToday = () => {
    journal?.calorie_journal[0]?.notes.forEach((note) => {
      console.log(today.toDateString(), note?.date);
      if (today.toDateString() == note?.date) {
        let totalsFats = 0;
        let totalCarbs = 0;
        let totalProtein = 0;
        let totalCalories = 0;
        note?.meals.forEach((meal) => {
          console.log(totalCarbs, totalsFats, totalProtein);
          totalCarbs += meal.percentCarbs;
          totalsFats += meal.percentfats;
          totalProtein += meal.percentprotein;
          totalCalories += parseInt(meal.percentcalories);
        });
        totalCarbs = ((totalCarbs * 4) / user?.details[0]?.pref_intake) * 100;
        totalsFats = ((totalsFats * 9) / user?.details[0]?.pref_intake) * 100;
        totalProtein =
          ((totalProtein * 4) / user?.details[0]?.pref_intake) * 100;
        console.log(totalCarbs, totalCalories, totalsFats);
        setMacros({
          totalCarbs: Math.ceil(totalCarbs),
          totalsFats: Math.ceil(totalsFats),
          totalProtein: Math.ceil(totalProtein),
        });
        setCalories(totalCalories);
      }
    });
  };
  useEffect(() => {
    calculateMacrosToday();
  }, []);

  const calories = Math.ceil(
    (eatenCalorie / user?.details[0]?.pref_intake) * 100
  );

  return (
    <div className="flex h-fit bg-base-200 mx-4">
      <div className="w-full bg-yellow-100 shadow-xl">
        <div className="card-body flex flex-row rounded-md">
          <div className="flex flex-col w-1/2">
            <div className="divider divider-vertical text-xl">Proteins</div>
            <div className="flex flex-row">
              <div className="w-1/2">
                {eatenMacros?.totalProtein
                  ? `${eatenMacros?.totalProtein}%`
                  : "0%"}
              </div>
              <div className="flex w-1/2 justify-end">100%</div>
            </div>
            <progress
              className="progress w-full h-2/3 my-2"
              value={eatenMacros?.totalProtein}
              max={journal?.calorie_journal[0]?.protein}
            ></progress>
            <div className="divider divider-vertical text-xl">Fats</div>
            <div className="flex flex-row">
              <div className="w-1/2">
                {eatenMacros?.totalsFats ? `${eatenMacros?.totalsFats}%` : "0%"}
              </div>
              <div className="flex w-1/2 justify-end">100%</div>
            </div>
            <progress
              className="progress w-full h-2/3 my-2"
              value={eatenMacros?.totalsFats}
              max={journal?.calorie_journal[0]?.fats}
            ></progress>
            <div className="divider divider-vertical text-xl">
              Carbohydrates
            </div>
            <div className="flex flex-row">
              <div className="w-1/2">
                {eatenMacros?.totalCarbs ? `${eatenMacros?.totalCarbs}%` : "0%"}
              </div>
              <div className="flex w-1/2 justify-end">100%</div>
            </div>
            <progress
              className="progress w-full h-2/3 my-2"
              value={eatenMacros?.totalCarbs}
              max={journal.calorie_journal[0].carbohydrates}
            ></progress>
          </div>
          <div className="flex flex-col justify-top items-center w-1/2 rounded-full border-4">
            <div className="divider divider-vertical w-4/5 self-center text-xl">
              Calories
            </div>

            <div
              className="radial-progress bg-primary text-primary-content border-4 border-primary "
              style={{ "--value": calories, "--size": "10rem" }}
            >
              {calories}%
            </div>
          </div>
        </div>
        <Link
          className="flex w-full btn justify-center items-center"
          href={{
            pathname: "/singleForm/[type]",
            query: { type: "isJournal" },
          }}
        >
          {" "}
          Edit Journal
        </Link>
      </div>
    </div>
  );
}

export default MacroTracker;
