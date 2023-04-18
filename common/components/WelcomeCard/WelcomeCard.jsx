import React from "react";

function WelcomeCard() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `../public/th-314201334.jpeg`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome</h1>
          <p className="mb-5">
            <input
              type="text"
              placeholder="Search Recipe"
              className="input input-bordered input-accent w-full max-w-xs font-bold"
            />
          </p>
          <button className="btn btn-primary">Search Delicous Recipes!</button>
          
        </div>
      </div>
    </div>
  );
}

export default WelcomeCard;
