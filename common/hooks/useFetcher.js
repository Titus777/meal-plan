import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then((res) =>res.json())

const useFetcher = async (crud,collection,object={}) =>{
    let res
    switch(crud,collection){
        case ('FIND','RECIPES'):
            if(object){
                res = await fetch(`/api/crud/get-recipes-by/query/${object}`)    
            }
            res = await fetch('/api/crud/get-recipes')
          
            return(await res.json())
        case ('FIND',"ID"):
            res = await fetch(`/api/crud/get-recipes-by/${object.id}`)
            return(await res.json())
        case ('FIND',"QUERY"):
            const { data, error, isLoading } = await useSWR(`/api/curd/get-recipes-by/${query}`,fetcher)
            return(data)
    }
}

export default useFetcher;