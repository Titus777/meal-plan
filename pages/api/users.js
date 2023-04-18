

const authenthicated = (fn) => async(req,res) =>{
    return await fn(req,res)
}