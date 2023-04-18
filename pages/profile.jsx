import React from "react";
import ProfileLeft from "../common/components/Profile/ProfileLeft";

import ProfileRight from "../common/components/Profile/ProfileRight";
import ProfileHeader from "../common/components/Header/ProfileHeader";
import {useRouter} from "next/router"
import clientPromise from "../lib/mongodb";
import dbConnect from "../lib/dbConnect";
import { getSession, useSession } from "next-auth/react";
import User from "../common/model/User";
import Journal from "../common/model/Journal";

function Profile( {user,isConnected}) {
  const {data:session} = useSession()
  const router = useRouter()
  if(!isConnected && typeof window != "undefined"){
    router.push("/")
  }
  if(session?.user?.isNew && typeof window != "undefined"){
    router.push('/form')
  }


  return (
    <div data-theme="lemonade" className="w-screen h-screen">
      <ProfileHeader user = {user}/>
      <ProfileLeft user={user}/>
      <div className="divider divider-vertical"></div>
      <ProfileRight user={user} />
    </div>
  );
}

export async function getServerSideProps(context) {

  try {
    await dbConnect();
    const client = await clientPromise;
    const db = client.db("mealtracker");
    

    const ctx = await getSession(context);
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    const journal = await Journal.findOne({email:ctx?.user?.email})
    const user = await User.findOne({email:ctx?.user?.email})

    return {
      props: { isConnected: true, user: JSON.parse(JSON.stringify(user)), journal: JSON.parse(JSON.stringify(user)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }

}
export default Profile;
