import React, { useState } from "react";
import { useSession } from "next-auth/react";
import {useRouter} from 'next/router'

function JournalForm(props) {
  const [done, setDone] = useState(false);
  const { data: session } = useSession();
  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("here");
    console.log(event);
    let fats = event.target.first_name.value;
    let carbohydrates = event.target.surname.value;
    let protein = event.target.fav_activity.value;
    const sendDetails = {
      email: session?.user?.email,
      calorie_journal: [{ fats, carbohydrates, protein }],
    };

    console.log(fats)
   if (parseInt(fats) + parseInt(carbohydrates) + parseInt(protein) == 100) {

      if(props?.isUpdating){
        const toSend = {email:session?.email,details:sendDetails}
        const res = await fetch("/api/crud/journal/change-macros", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(toSend),
        });

        if(res.status == 200){
          router.push("/tracker")
          return
        }
        return
      }else{

        const res = await fetch("/api/update/create-journal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sendDetails),
        });
  
        if (props?.setJournalStatus) {
          if (res.status == 200) {
            props.setJournalStatus(true);
          }
        }
      }
    }else{
      alert("The macros must add up to 100")
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
