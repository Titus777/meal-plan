import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then((res) =>res.json())

export default function useRecipeSearch (query, next=false,link="") {
    
    if(next){
        const {data,error,loading} = useSWR(link,fetcher) 
        console.log(data)
        return{
            recipes:data,
            isLoading:loading,
            isError:error,
        }    
    }
    const { data, error, isLoading } = useSWR(`/api/getRecipe/${query}`, fetcher)

    return {
      recipes: data,
      isLoading,
      isError: error
    }
}

