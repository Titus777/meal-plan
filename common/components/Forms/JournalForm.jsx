import React, { useState } from "react";
import { useSession } from "next-auth/react";

function JournalForm(props) {
  const [done, setDone] = useState(false);
  const { data: session } = useSession();

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("here");
    console.log(event);
    let fats = event.target.first_name.value;
    let carbohydrates = event.target.surname.value;
    let protein = event.target.fav_activity.value;
    let number_of_meals = event.target.cal_intake.value;
    const sendDetails = {
      email: session?.user?.email,
      calorie_journal: [{ fats, carbohydrates, protein, number_of_meals }],
    };
  
    const res = await fetch("/api/update/create-journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendDetails),
    });
    
    if(props?.setJournalStatus){
      if (res.status == 200) {
        props.setJournalStatus(true);
      }
    }
    
  }

  return (
    <div className="hero min-h-screen bg-base-200 ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <form
          className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          onSubmit={handleSubmit}
        >
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Percentage of fat to be consumed
                </span>
              </label>
              <input
                type="text"
                placeholder="50"
                name="first_name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Percentage of carbs to be consumed
                </span>
              </label>
              <input
                type="text"
                placeholder="40"
                name="surname"
                className="input input-bordered"
                required
              />
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Percentage of protein to be consumed
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="10"
                  className="input input-bordered"
                  name="fav_activity"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Number of meals (max of 3 per day)
                  </span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={3}
                  placeholder="2"
                  className="input input-bordered"
                  name="cal_intake"
                  required
                />
              </div>
            </div>
            <input
              type="submit"
              value="Submit form"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default JournalForm;
