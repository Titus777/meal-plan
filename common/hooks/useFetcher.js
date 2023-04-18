const useFetcher = async (crud,collection,object={}) =>{
    let res
    switch(crud,collection){
        case ('FIND','RECIPES'):
            res = await fetch('/api/crud/get-recipes')
          
            return(await res.json())
        case ('FIND',"ID"):
            res = await fetch(`/api/crud/get-recipes-by/${object.id}`)
            return(await res.json())
    }
}

export default useFetcher;