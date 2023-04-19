import dbConnect from "../../../../lib/dbConnect";
import Journal from "../../../../common/model/Journal";

export default async function handler(req,res){
    await dbConnect()
    try{
      
        if(!req?.body){
            res.status(404).json({message:"No input found"})
            return
        }

        const update = {
            date: req.body[1],
            meals:[{
            name: req.body[2].name,
            percentcalories: req.body[2].calories,
            percentfats: req.body[2].fats,
            percentCarbs: req.body[2].carbohydrates,
            percentprotein: req.body[2].protein,
            id: req.body[2].id,
            image: req.body[2].image
            }]
        }
        console.log(update)
    
        const data = await Journal.findOne({$and:[{"calorie_journal.0.notes.date":req.body[1],email:req.body[0]}]})
        console.log(data)
        if(data){
            console.log("here")
            const pushed = await Journal.updateOne({$and:[{"calorie_journal.0.notes.date":req.body[1],email:req.body[0]}]},
                {
                    $push:{"calorie_journal.0.notes.$.meals":update.meals}
                },
                {
                    runValidators:true,
                    new:true,
                })
            if(pushed.modifiedCount == 1){
                res.status(201).send("Created succesfully")
                return
            }else{
                res.status(403).json(pushed)
                return
            }
        }

        const pushed = await Journal.updateOne({email:req.body[0]},
        {
            $set:{"calorie_journal.0.notes":update}
        },
        {
            runValidators:true,
            new:true
        })
        if(pushed.modifiedCount == 1){

            res.status(201).send("Created succesfully")
            return
        }
        res.status(403).send("Error")

    }catch(e){
        res.status(500).json(e)
        console.error(e)
    }
}