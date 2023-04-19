import React from 'react'
import JournalForm from '../../common/components/Forms/JournalForm'
import {useRouter} from 'next/router'

function SingleForm({isJournal,isCalorie,isMeal,isDetails}) {
    const router = useRouter()
    const {type} = router.query


    if(type == "isJournal"){
        return (
            <div className='hero' data-theme="lemonade">
                <div className='hero-content'>
                    <JournalForm isUpdating={true}/>
                </div>
            </div>
          )
    }
    return <div>Hi</div>
 
}

export default SingleForm