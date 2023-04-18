import React from "react";

function ProfileRight({user}) {
  /* activity: [{type:String}],
  diet: {type:String},
  exercise_time: {type:Number},
  favorite_food: {type:String},
  favorite_recipes:[ ] ,
  uploaded_recipes:[ Object ] ,
  goals: [String] */
  console.log(user)
  return (
    <div className="grid h-fit flex-grow card bg-base-300 rounded-box place-items-center">
      <div tabIndex={0} className="collapse group w-full">
        <div className="collapse-title bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
          <h1 className="text-2xl font-bold">Activity</h1>
        </div>
        <div className="collapse-content bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
          {!user ? "No activity specified" : user?.details[0]?.activity}
        </div>
      </div>
      <div tabIndex={0} className="collapse group w-full">
        <div className="collapse-title bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
          <h1 className="text-2xl font-bold">Details</h1>
        </div>
        <div className="collapse-content bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
          {!user ? "No activity specified" : user?.details[0]?.sex}
        </div>
      </div>
      <div tabIndex={0} className="collapse group w-full">
        <div className="collapse-title bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
          <h1 className="text-2xl font-bold">My Recipes</h1>
        </div>
        <div className="collapse-content bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
          <div className="overflow-x-auto">
            {!user?.details[0]?.uploaded_recipes ? "No activity specified" :
            user?.details[0]?.uploaded_recipes.map((value,index) =>{
              return <div className="overflow-x-auto">
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                  </tr>
                </tbody>
              </table>
            </div>
            })
            }
          </div>
        </div>
      </div>
      <div tabIndex={0} className="collapse group w-full">
        <div className="collapse-title bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
          <h1 className="text-2xl font-bold">Security</h1>
        </div>
        <div className="collapse-content bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
          {user ? "Not available" : "Not available"}
        </div>
      </div>
    </div>
  );
}

export default ProfileRight;
