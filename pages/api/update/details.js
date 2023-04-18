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
       
        const {email,details} = req.body
        console.log(details)
        const data = await User.findOneAndUpdate({email: email},{details: details})

        
        await data.save()
        res.status(200).send("Updated!")


    }catch(e){
        console.error(e)
        res.status(500).send("Server error")
    }
}