import React from "react";
import Link from "next/link";

function ProfileLeft({user}) {
  let recommendedCalories;



  if(user?.details[0]?.sex == "Male"){
    recommendedCalories = 2500
  }else{
    recommendedCalories = 2000
  }

  const calories =  (1600/recommendedCalories) * 100
  

  return (
    <div className="card flex flex-row flex-wrap sm:flex-col">
      <div className="w-full flex lg:flex-row-reverse flex-col justify-center">
        <div className="flex lg:flex-row flex-col-reverse justify-center items-center">
          <div className="avatar">
            <div className="w-56 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 ">
              <img src="/images/profile.png" />
            </div>
          </div>
          <div className="divider divider-vertical lg:divider-horizontal "></div>
          <div className="flex flex-col-reverse w-fit">
            <form>
              <input
                name="file"
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs my-2"
              />
              <input type="submit" className="btn btn-primary" />
            </form>
            <div className="btn-group btn-group-vertical justify-center ">
              <button className="btn btn-active my-2">
                <Link href="/">Get me back home, Please!</Link>
              </button>
              <button className="btn my-2">
                <Link href="/tracker">To see my calories we go!</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="divider divider-vertical lg:divider-horizontal "></div>
        <div className="lg:w-3/5 w-full flex flex-col bg-green-50 border-emerald-300 border-4 rounded-lg shadow-lg">
          <div className="self-center justify-center font-bold"> Name</div>
          <div className="self-center justify-center"> {user?.details[0]?.first_name}</div>
          <div className="self-center justify-center font-bold"> Weight and Height</div>
          <div className="self-center justify-center"> {user?.details[0]?.weight} and {user?.details[0]?.height}</div>
          <div className="self-center justify-center font-bold"> Progress</div>
          <div className="self-center justify-center">
            {" "}
            Calorie intake so far
          </div>
          <div className="self-center justify-center">
            <div
              className="radial-progress text-primary"
              style={{ "--value": calories }}
            >
              {calories}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileLeft;
