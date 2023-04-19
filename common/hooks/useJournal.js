import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) =>res.json())

const useJournal = async (crud,collection,object={}) =>{
    let res
    try{
        switch(crud,collection){
            case ('CHANGE','NOTES'):
                res = await fetch('/api/crud/journal/change-notes',{
                    method:"PUT",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify(object)
                })
                return(await res.json())
            case ('CHANGE','MEALS'):
                res = await fetch(`/api/crud/journal/edit-meals`,{
                    method:"PUT",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify(object)
                })
                return(await res.json())
            case ('CHANGE',"MACROS"):
                const { data, error, isLoading } = await fetch('/api/crud/journal/change-macros',{
                    method:"PUT",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(object)
                })
                return(data)
        }
    }catch(e){
        console.error(e)
    }
}

export default useJournal;