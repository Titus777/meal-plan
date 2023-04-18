import React from "react";
import Header from "../common/components/Header/Header";
import NutrientTracker from "../common/components/Calorie/NutrientTracker";
import MacroTracker from "../common/components/Calorie/MacroTracker"; 
import CalorieJournal from "../common/components/Calorie/CalorieJournals"
import clientPromise from "../lib/mongodb";
import dbConnect from "../lib/dbConnect";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import Journal from "../common/model/Journal";
import JournalForm from "../common/components/Forms/JournalForm";



function Tracker({journal,isConnected, isNewUser}) {
  const router = useRouter()
  console.log("I am ehre")
  if(isNewUser && typeof window !="undefined"){
    router.push("/form")
  }
  if(!isConnected && typeof window !="undefined"){
    router.push("/")
  }
  return (
    <div data-theme="lemonade">
      <Header />
      <div className="flex flex-col w-full min-h-screen bg-base-200">
        <CalorieJournal journal={journal} />
        <div className="divider divider-vertical"></div>
        <MacroTracker journal={journal} />
        <div className="divider divider-vertical"></div>
        <NutrientTracker journal={journal}/>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {

  try {
    await dbConnect();
    const client = await clientPromise;
    
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
  
    return {
      props: { isConnected: true, journal: JSON.parse(JSON.stringify(journal)), isNewUser: ctx.isNewUser},
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }

}
export default Tracker;
