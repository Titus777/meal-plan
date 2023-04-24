import dbConnect from "../../../../../lib/dbConnect";
import Journal from "../../../../../common/model/Journal";


export default async function handler(req,res){
    await dbConnect()
    try{
      
        if(!req?.query){
            res.status(404).json({message:"No input found"})
            return
        }

    
        const data = await Journal.updateOne({$and:[{"calorie_journal.0.notes.meals._id":req.query.id}]},
            {$pull: {"calorie_journal.0.notes.$.meals":{_id:req.query.id}}},{safe:true,multi:true},
            (err,data) =>{
                console.log(err,data)
            }
        )

        if(data.modifiedCount == 1){
            await data.save()
            res.status(200).send("success")
            return
        }
        
        res.status(403).send("Error")

    }catch(e){
        res.status(500).json(e)
        console.error(e)
    }
}