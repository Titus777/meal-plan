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
            note: req.body[1],
            date: req.body[2]
        }

       
        const data = await Journal.findOne({$and:[{"calorie_journal.notes.date":req.body[2],email:req.body[0]}]})
 
        if(data){
            const updated =await Journal.updateOne({$and:[{"calorie_journal.0.notes.date":req.body[2],email:req.body[0]}]},
            {
                $set:{"calorie_journal.0.notes":update}
            },
            {
                rawResult:true
            }
            )
            console.log(updated)
            if(updated.modifiedCount == 1){
                await updated.save()
                res.status(200).send("ok")
                return
            }

            res.status(500).send("server error")
            return
        }
        
        const pushed = await Journal.updateOne({email:req.body[0]},
        {
            $push:{"calorie_journal.0.notes":update}
        },
        {
            rawResult:true
        })
        console.log(pushed)
        if(pushed?.modifiedCount == 1){
            await pushed.save()
            res.status(201).send("Created succesfully")
            return
        }
        res.status(403).send("Error")

    }catch(e){
        res.status(500).send("Server Error, please try again later")
        console.error(e)
    }
}