const queryStrings = {
    edman_id: process.env.EDAMAN_ID,
    edman_keys: process.env.EDAMAM_KEYS
}


export default async function handler(req,res){
    const {edman_id,edman_keys} = queryStrings

    if(req.method != "POST"){
        res.status(405).send("Method not allowed")
    }
    if(!req.body){
        res.status(500).send("Error, try again")
    }

    try{
        console.log(req.body)
        const response = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=${edman_id}&app_key=${edman_keys}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(req.body)
        })
        console.log(res)
        if(response.status == 200){
            res.status(200).json(await res.json())
        }
        else{
            res.status(500).message("Something went wrong")
        }
        res.status(401).json({message:"Not authorized"})
    }catch(e){
        console.log(e)
        res.status(500).send("Server error")
    }
}