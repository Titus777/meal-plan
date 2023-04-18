import React from "react";
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";

function Header() {
  const { data: session } = useSession();

  return (
    <div className="navbar bg-base-100 z-10">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Smart Meal
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 z-20">
          <li>
            <Link href="/recommend">Recommend Meal</Link>
          </li>
          <li tabIndex={0}>
            <a>
              Menu
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-base-100">
              <li>
                <Link href="/tracker">Calorie tracker</Link>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/profile/mylist">My List</Link>
          </li>
        </ul>
      </div>
      {session?.user ? (
        <div className="navbar-end">
          <button
            onClick={(e) => {
              e.preventDefault;
              
              signOut();
            }}
            className="btn"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="navbar-end">
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log("clicked")
              signIn();
            }}
            className="btn"
          >
            Get started
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
