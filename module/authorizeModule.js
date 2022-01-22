const jwt=require("jsonwebtoken");

exports.authorizedUser(async(req,res,next)=>{
    if(!req.headers["token"])
    {
        res.status(401).send({msg:"user is not authorized"});
    }
    try{
        let token= await jwt.verify(req.header["token"],"code");
        res.send({msg:"token veerified sucsess"})
    }catch(e){
        res.send({msg:"error"})
    }
})