import {model, Model, models, Schema, Types} from "mongoose";

const mealSceham = {
    name: {type:String},
    percentcalories: {type:String},
    percentfats: {type:Number},
    percentCarbs: {type:Number},
    percentprotein:{type:Number},
    id: {type:Number},
    image: {type:String}
}

const journalSchema = new Schema({

    email: {type:String},
    status: {type:String},
    created_at: {type:Date},
    calorie_journal:[{
        intake: {type:String},
            fats: {type:String},
            carbohydrates: {type:String},
            protein: {type:String},
            notes: [{note: {type: String},
                    date: {type: String},
                    number_of_meals: {type:Number, min:1, max:3},
                    meals:[{
                        type:mealSceham,
                    }],
                    intake: {type:String},
            }]
    }]
})
export default (models.Journal) || model("Journal", journalSchema)
