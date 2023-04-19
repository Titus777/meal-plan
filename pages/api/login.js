import jwt from 'jsonwebtoken'
import User from '../../common/model/User';
import dbConnect from '../../lib/dbConnect'
import {hash,compare} from "bcrypt"
import { setCookie } from 'cookies-next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';


export default async function handler(req, res){

    await dbConnect();
    try{
        if(!req.body){
            res.status(404).end('Error')
            return
        }
        console.log(req.body)
        const {email, password} = req.body
        if(req.method === `POST`){
            hash(password, 10, async function(err,hash){
     
                
                const user = await User.findOne({email: email})

                if(!user){
                    res.status(403).json({message:"Password or email is wrong"})
                    return null;
                }
            
                const isMatch = await compare(password, user.password);
        
                if (!isMatch) {
                  console.error("Is not match")
                  res.status(403).json({message:"Password or email is wrong"})
                  return null;
                }
                
                res.status(201).json(user)
                return user
            })
        }
        else{
            res.status(424).json({message:"Invalid method"}).end()
        }
    }catch(e){
        res.status(500).send('Server failed.')
    }
   
}