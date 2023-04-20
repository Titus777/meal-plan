import React, { useState } from "react";
import {useSession} from "next-auth/react"

function DetailsForm(props) {
  const [done, setDone] = useState(false);
  const {data:session} = useSession()

  async function handleSubmit(event) {
    event.preventDefault()
    console.log("here")
    console.log(event)
    let first_name= event.target.first_name.value
    let last_name= event.target.surname.value
    let activity= event.target.fav_activity.value
    let favorite_food= event.target.fav_food.value
    let sex= event.target.sex.value
    let goal= event.target.goal.value
    let pref_intake= event.target.cal_intake.value
    let weight=event.target.weight.value
    let height= event.target.height.value
    const sendDetails = {
      email: session?.user?.email,
      details:[
      {first_name,
      last_name,
      activity,
      favorite_food,
      sex,
      goal,
      pref_intake,
      weight,
      height},
      ]
    }
    console.log("here")

    const res = await fetch("/api/update/details",{
      method:'POST',
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(sendDetails)
    })

    if(res.status==200){
      props.setDetailsStatus(true)
    }
  }

  return (
    <div className="hero min-h-screen bg-base-200 ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <form className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100" onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First name</span>
              </label>
              <input
                type="text"
                placeholder="John"
                name="first_name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Surname</span>
              </label>
              <input
                type="text"
                placeholder="Smith"
                name="surname"
                className="input input-bordered"
                required
              />
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Favourite Activity</span>
                </label>
                <input
                  type="text"
                  placeholder="Sports"
                  className="input input-bordered"
                  name="fav_activity"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Favourite food (please write the ingredients like in the
                    example below)
                  </span>
                </label>
                <textarea
                  type="text"
                  placeholder="1 cup rice, 100 g chicken, 300 ml water"
                  className="textarea md"
                  name="fav_food"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Goals</span>
                </label>
                <select
                  name="goal"
                  className="select select-bordered w-full max-w-xs"
                >
                  <option value="Weight Gain">Weight Gain</option>
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Health">Health</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Sex</span>
                </label>
                <select
                  name="sex"
                  className="select select-bordered w-full max-w-xs"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Preferred Caloric intake (per Day)
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="2300"
                  className="input input-bordered"
                  name="cal_intake"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Height (in centimeters)</span>
                </label>
                <input
                  type="number"
                  placeholder="182"
                  className="input input-bordered"
                  name="height"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Weight (in kilograms)</span>
                </label>
                <input
                  type="number"
                  placeholder="90"
                  className="input input-bordered"
                  name="weight"
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

export default DetailsForm;
