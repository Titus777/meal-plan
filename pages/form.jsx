import React, { useState } from 'react'
import FormProgress from '../common/components/Forms/FormProgress'
import { useRouter } from 'next/router'
import DetailsForm from '../common/components/Forms/DetailsForm'
import JournalForm from '../common/components/Forms/JournalForm'
import {useSession} from "next-auth/react"
import {signOut} from "next-auth/react"

function Form() {
  const [journalStatus,setJournalStatus] = useState(false)
  const [detailsStatus,setDetailsStatus] = useState(false)
  const [doRouter,setDoRouter] = useState(false)
  const {data:session, update} = useSession()
  const router = useRouter()

  if(!session?.isNewUser && typeof window !="undefined"){
    setDoRouter(true)
  
  }
  if(doRouter){
    router.push("/")
  }
  if(detailsStatus && journalStatus){
    const getUser = async () =>{
      const res = await fetch(`/api/update/user-status/${session?.user?.email}`)
  
      if(res.status == 200){
        update()
        router.push("/")
      }
    }
  
    getUser()
  }

  return ( 
    <div data-theme='lemonade' className='flex flex-col justify-center'>
      <FormProgress journalStatus={journalStatus} detailsStatus={detailsStatus}/>
      {!detailsStatus ? <DetailsForm setDetailsStatus={setDetailsStatus}/> : <JournalForm setJournalStatus={setJournalStatus}/>}
      <button className='btn btn-primary' onClick={signOut}>Logout</button>
    </div>
  )
}

export default Form