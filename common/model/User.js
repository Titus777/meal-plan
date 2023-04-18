import {model, Model, models, Schema, Types} from "mongoose";


const userSchema = new Schema({

    email: {type:String, required: true},
    password: {type:String, required: true},
    details: [
        {first_name: {type:String},
         last_name: {type:String},
         activity: {type:String},
         diet: {type:String},
         exercise_time: {type:Number},
         favorite_food: {type:String},
         favorite_recipes:[ {type:Object} ] ,
         uploaded_recipes:[ {type:Object} ] ,
         goals: [String],
         sex: {type:String},
         pref_intake:{type:Number},
         weight:{type:Number},
         height:{type:Number}
        }
    ],
    notes: [
        {date: {type:Date},
        notes: [{type:String}],
        recipe_notes: [{type:Object}]}
        ],
    new: {type:Boolean},
    created_at: {type:Date},
      
})
export default (models.User) || model("User", userSchema)
