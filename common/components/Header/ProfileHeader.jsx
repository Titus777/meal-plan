import React from "react";
import Link from 'next/link'
import { signOut } from "next-auth/react";

function ProfileHeader() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link href="/"
         className="btn btn-ghost normal-case text-xl">Smart Meal
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex text-xl font-bold">
        Welcome back, User!
      </div>
      <div className="navbar-end">
        <button onClick="signOut({
      callbackUrl: `/`
         })" 
        className="btn">Logout</button>
      </div>
    </div>
  );
}

export default ProfileHeader;
