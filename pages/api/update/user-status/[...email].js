import User from "../../../../common/model/User"

export default async function handler(req,res){
    if(req.method != "GET"){
        res.status(424).send("Method not allowed")
        return
    }
    if(!req.query){
        res.status(500).send("Server error")
        return
    }
    try{
        const {email} = req.query
        const response = await User.findOneAndUpdate({email: email[0]},{new:false},{rawResults:true})
     
        if(response){
            await response.save()
            res.status(200).json(response)
            return
        }else{
            console.log("here")
            res.status(404).send("Cannot find your details, please refresh")
        }
    }catch(e){
        console.error(e)
        res.status(500).send("Server error")
    }
}
