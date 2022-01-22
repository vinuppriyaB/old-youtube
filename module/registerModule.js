const User= require("../model/user.js");
const joi =require("joi");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

exports.signup = async(req,res,next)=>{
    const schema=joi.object({
        firstName:joi.string().min(3).max(15).required(),
        lastName:joi.string().min(3).max(15).required(),
        email:joi.string().min(3).max(15).required(),
        password:joi.string().min(3).max(15).required(),
    })
    var {error}= await schema.validate(req.body);
    if(error)
    {
       return res.status(400).send({msg:error.details[0].message});
    }
    var existUser= await User.findOne({"email":req.body.email}).exec();
    console.log(existUser)
    if(existUser) return res.status(400).send({msg:"user already exist"});
    
    const salt =await bcrypt.genSalt(10);
    req.body.password=await bcrypt.hash(req.body.password,salt);

    const user= new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password
    })
    const response=await user.save();
    res.send(response);
}

exports.signin = async(req,res,next)=>{
    const schema=joi.object({
        
        email:joi.string().min(5).max(15).required(),
        password:joi.string().min(3).max(15).required(),
        
    })
    var {error}= await schema.validate(req.body);
    if(error)
    {
       return res.status(400).send({msg:error.details[0].message});
    }
    var existUser= await User.findOne({"email":req.body.email}).exec();
    if(!existUser) return res.status(400).send({msg:"email not register"});
    
    const isvalid=await bcrypt.compare(req.body.password,existUser.password);
    if(!isvalid) return res.status(400).send({msg:"password doesn't match"});
    
    var token= jwt.sign({existUser},"code",{expiresIn:"1h"})
    res.send(token);


}

