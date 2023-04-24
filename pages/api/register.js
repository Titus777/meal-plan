import User from '../../common/model/User';
import dbConnect from '../../lib/dbConnect'
import {hash} from "bcrypt"

export default async function handler(req, res){

    await dbConnect();
    try{
        if(!req.query){
            res.status(404).end('Error')
            return
        }

        const {email, password} = req.query

        if(req.method === `GET`){
            hash(password, 10, async function(err,hash){
    
                const existingUser = await User.findOne({email})
                if(existingUser){
                    console.log(existingUser)
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