import dbConnect from "../../../lib/dbConnect";
import Recipes from "../../../common/model/Recipe";

export default async function handler(req,res){
    await dbConnect()
    try{
        const recipes = await Recipes.find({})

        if(!recipes){
            res.status(404).json({message:"No recipe found"})
            return
        }
        res.status(201).json(recipes)
    }catch(e){
        res.status(500).send("Server Error, please try again later")
    }
}