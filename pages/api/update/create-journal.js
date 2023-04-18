import Journal from "../../../common/model/Journal"

export default async function handler(req,res){
    console.log("called")
    if(req.method != 'POST'){
        console.log("interesting")
        res.status(405).json({message:"Method not allowed"})
        return
    }
    if(!req.body){
        console.log("input")
        res.status(403).send("Bad input")
        return
    }
    try{
       console.log("here")
        const {email,calorie_journal} = req.body
    
        const journal = new Journal({
            email: email,
            status: "",
            created_at: new Date(),
            calorie_journal: calorie_journal[0],
            notes: 
            [
                {
                 note: "",
                 date: ""
                }
            ]

        })
        await journal.save().catch(error => 
            {
                res.status(500).json({message: "Server error"})
                console.error(error)
                return
            })
        if(journal){
            console.log("success")
            res.status(200).json(journal)
            
        }else{
            console.log("wtf")
            res.status(400).json({message: "An error has occured"})

        }      
      
    }catch(e){
        console.error(e)
        res.status(500).send("Server error")
    }
}