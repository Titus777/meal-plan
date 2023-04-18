import {model, Model, models, Schema, Types} from "mongoose";


const recipeSchema = new Schema({

    author: String,
    Cleaned_Ingredients: String,
    Image_Name: String,
    Ingredients: String,
    Instructions: String,
    Title: String

    
})
export default (models.Recipes) || model("Recipes", recipeSchema,'recipes')
