import Recipe from "../../../../../common/model/Recipe"

export default async function handler(req,res){

    if(!req.query){
        res.status(403).send("Bad Input")
        return
    }
    try{
        if(req.method === "GET"){
            console.log(req.query)
            const data = await Recipe.findOne({Title:{$regex:req?.query?.query, $options: 'i'}})

            if(data){
                res.status(200).json(data)
                return
            }
            res.status(404).json({message:"Nothing was found with those characters"})
            return
        }
        res.status(402).send("Method not allowed")
        return
    }catch(e){
        res.status(500).send("Unexpected error")
    }
}