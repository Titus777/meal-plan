import {model, Model, models, Schema, Types} from "mongoose";


const journalSchema = new Schema({

    email: {type:String},
    status: {type:String},
    created_at: {type:Date},
    calorie_journal: [{
        intake: {type:String},
        fats: {type:String},
        carbohydrates: {type:String},
        protein: {type:String},
        day: {type:Date},
        number_of_meals: {type:Number},
        meals: [{name: {type:String},
                calorie: {type:String},
                fats: {type:Number},
                carbohydrates: {type:Number},
                protein:{type:Number}
        }],
        notes: [{note: {type: String},
                date: {type: Date}
        }]
    }]
})
export default (models.Journal) || model("Journal", journalSchema)
