import User from '../../common/model/User';
import dbConnect from '../../lib/dbConnect'
import {hash,compare} from "bcrypt"



export default async function handler(req, res){

    await dbConnect();
    try{
        if(!req.query){
            res.status(400).end('We couldn`t get your request')
            return
        }
    
        const {email, password} = req.query
        if(req.method === `GET`){
            hash(password, 10, async function(err,hash){
                const user = await User.findOne({email: email})

                if(!user){
                    res.status(403).json({message:"Password or email is wrong"})
                    return null;
                }
        
                const matchedPassword = await compare(password, user.password);
                if (!matchedPassword) {
                    console.error("Is not match")
                    res.status(403).json({message:"Password or email is wrong"})
                    return null;
                }
                
                res.status(201).json(user)
                
                return user
            })
        }
        else{
            res.status(424).json({message:"Invalid method"})
        }
    }catch(e){
        res.status(500).send('Server failed.')
    }
   
}
