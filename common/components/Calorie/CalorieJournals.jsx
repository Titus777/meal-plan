import React from "react";
import CalendarComponent from "./CalendarComponent";

function CalorieJournal({ recipes, journal }) {
  return (
    <div className="flex h-fit bg-base-200 mx-4 mt-4">
      <div className="w-full bg-pink-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title flex self-center">Calorie Journal</h2>
          <div className="collapse">
            <input type="checkbox" className="peer" />
            <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
              Entries
            </div>
            <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Food</th>
                      <th>Macros(Fat,protein,carbs)</th>
                      <th>Calories</th>
                      <th>Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {journal.calorie_journal[0].notes.map((value, index) => {
                      let date =value?.date
                      return value?.meals.map((value,index)=>{
                        return(<tr>
                          <th>{date}</th>
                          <td>{value?.name}</td>
                          <td>Fat: {value?.percentfats} Protein: {value?.percentprotein} Carbs: {value?.percentCarbs}</td>
                          <td>{value?.percentcalories}</td>
                          <td><img className="w-20" src={value?.image}/></td>
                        </tr>)
                      })
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="collapse">
            <input type="checkbox" className="peer" />
            <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
              Daily recommendation
            </div>
            <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
              Generally, the recommended daily calorie intake is 2,000 calories
              a day for women and 2,500 for men.
            </div>
          </div>
          <div className="card-body">
            <div className="card-title">Calendar</div>
            <CalendarComponent journal={journal} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalorieJournal;
