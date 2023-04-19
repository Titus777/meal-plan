import dbConnect from "../../../../lib/dbConnect";
import Journal from "../../../../common/model/Journal";

export default async function handler(req,res){
    await dbConnect()
    try{
      
        if(!req?.body){
            res.status(404).json({message:"No input found"})
            return
        }
        const {email, calorie_journal} = req.body.details
       
        const data = await Journal.findOne({$and:[{email:email}]})
        console.log(data)
        if(data){
            const updated =await Journal.updateOne({$and:[{email:email}]},
            {
                $set:{"calorie_journal":calorie_journal}
            },
            {
                rawResult:true
            }
            )
            if(updated.modifiedCount == 1){
                res.status(200).send("ok")
                return
            }

            res.status(500).send("server error")
            return
        }

        const pushed = await Journal.updateOne({email:req.body.email},
        {
            $push:{"calorie_journal":calorie_journal}
        },
        {
            rawResult:true
        })
        if(pushed.modifiedCount == 1){
            res.status(201).send("Created succesfully")
            return
        }
        res.status(403).send("Error")

    }catch(e){
        res.status(500).send("Server Error, please try again later")
        console.error(e)
    }
}