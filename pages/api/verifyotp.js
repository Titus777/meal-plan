import User from "../../common/model/User";

export async function handler(req, res){
    try{
        if(req.method === 'POST'){
            const {id} = req.body

            const user = User.findById(id)

            if(user){
                setCookie('authorize', true, {
                    req,
                    res,
                    maxAge: 60 * 60 * 24 * 7, // 1 week
                    path: '/',
                });
                
                //   respond with status and message
                return res.status(200).json({
                    message: `${user.email} is authorized to access`,
                    authorize: true,
                    code: '20-0101-2092',
                });
            }
            res.status(403).send("Cookie not found")
        }
        res.status(422).send("Method not Post")
    }catch(e){
        res.status(500).send('server error')
    } 
}