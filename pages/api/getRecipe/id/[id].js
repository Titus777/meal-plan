export default async function handler(req,res){
  

    try{
        const data = await fetch(`https://api.spoonacular.com/recipes/${req?.query?.id}/information?apiKey=${process.env.SPOO_KEY}&includeNutrition=true`)

        res.status(200).json(await data.json())
    }catch(e){
        console.error(e, 'Something went wrong')
        res.status(500).json({message:"Error with api"})
    }
}