const queryStrings = {
    edman_id: process.env.EDAMAN_ID,
    edman_keys: process.env.EDAMAM_KEYS
}

export default async function handler(req,res){
    const {edman_id,edman_keys} = queryStrings

    try{
     
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOO_KEY}&query=${req?.query?.query}&addRecipeNutrition=true&addRecipeInformation&number=100`)
   
        res.status(200).json(await data.json())
    }catch(e){
        console.error(e, 'Something went wrong')
        res.status(500).json({message:"Error with api"})
    }
}