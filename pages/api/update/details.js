import User from "../../../common/model/User"

export default async function handler(req,res){

    if(req.method != 'POST'){
        res.status(405).json({message:"Method not allowed"})
        return
    }
    if(!req.body){
        res.status(403).send("Bad input")
        return
    }
    try{
       
        console.log("I have made it)
        res.status(200).send("yes")

    }catch(e){
        console.error(e)
        res.status(500).send("Server error")
    }
}
