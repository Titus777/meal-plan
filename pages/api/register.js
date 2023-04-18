import jwt from 'jsonwebtoken'
import User from '../../common/model/User';
import dbConnect from '../../lib/dbConnect'
import {hash} from "bcrypt"
import {setCookie} from "cookies-next"

const authenthicated = (fn) => async(req,res) =>
{
    // wrap function this(async function) to protect function from someone who is not authenticated
    jwt.verify(req.headers.authorization, process.env.KEY,async function(err,decoded){
        if(!err && decoded){
            return await fn(req,res)
        }
        res.status(500).json({message:'Sorry you are not authenticated'})
    })
 
}

export default async function handler(req, res){

    await dbConnect();
    try{
        if(!req.body){
            res.status(404).end('Error')
            return
        }
    
        const {email, password} = req.body
        if(req.method === `POST`){
            hash(password, 10, async function(err,hash){
    
                const existingUser = await User.findOne({email})
                if(existingUser){
                    res.status(422).json({message: "Email already exists"})
                    return null
                }
                
                const user = new User({
                    email: email,
                    password: hash,
                    
                    details: [
                        {first_name: "",
                         last_name: "",
                         activity: "",
                         diet: "",
                         exercise_time: 0,
                         favorite_food: "",
                         favorite_recipes:[ {} ] ,
                         uploaded_recipes:[ {} ] ,
                         goals: [""],
                         sex: "",
                         pref_intake:0,
                         weight:0,
                         height:0 
                        }
                    ],
                    notes: [
                        {dates: [],
                        notes: [""],
                        recipe_notes: [{}]}
                        ],
                    new: true,

                    created_at: new Date()
                })
                await user.save().catch(error => 
                    {
                        res.status(500).json({message: "Server error"})
                        console.error(error)
                    })
                if(!err){
                    res.status(201).json(user)
                    
                }else{
                    res.status(400).json({message: "An error has occured"})

                }            
            })
        }
        else{
            res.status(405).json("Method is not post")
        }
    }catch(e){
        console.error(e)
        res.status(500).send('Server error, failed to register.')
    }
   
}