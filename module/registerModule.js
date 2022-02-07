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
        profilePic:joi.string(),
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
        password:req.body.password,
        profilePic:req.body.profilePic,
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
    
    // var existUser= await User.findOne({"email":req.body.email}).exec();
    var token= jwt.sign({existUser},"code",{expiresIn:"1h"})
let data={token:token,email:existUser.email,firstName:existUser.firstName,profilePic:existUser.profilePic};
    res.send(data);


}

exports.addchannel = async(req,res,next)=>{

    const {email,channelName,logo}=req.body;
    // console.log(email,channelName,logo);
    const response= await User.findOne({email:email},(error,result)=>{
        if(error){
            res.status(400).send({msg:error})
        }
        // console.log(result);
        let flag=0;
        for(let i=0;i<result.subscribedChannel.length;i++)
        {
            if(result.subscribedChannel[i].channelName==channelName)
            {
                flag=1;
                break;

            }
        }
        if(flag==1)
        {
            res.status(200).send({msg:"already subsribed"})
        }
        else{
            result.subscribedChannel.push({channelName:channelName,logo:logo});
            result.save((error,updatedata)=>{
                if(error)
            console.log(error);
            else{
                res.send(updatedata)
            }
            })

        }
        
    }).clone();
}

exports.checkforsubscription = async(req,res,next)=>{

    const {email,channelName}=req.body;
    // console.log(email,channelName);
    if(email)
    {
    const response= await User.findOne({email:email},(error,result)=>{
        if(error){
            res.status(400).send({msg:error})
        }
        // console.log(result);
        let flag=0;
        for(let i=0;i<result.subscribedChannel.length;i++)
        {
            if(result.subscribedChannel[i].channelName==channelName)
            {
                
                flag=1;
                break;
            }
        }
        if(flag==1)
        res.status(200).send({msg:"subscribed"})
        else
        res.status(200).send({msg:"not subscribed"})
        
        
    }).clone()
}else{
    res.status(400).send({msg:"emailId is not available"})
}
}

exports.unsubscribechannel = async(req,res,next)=>{
    
    const {email,channelName}=req.body;
    // console.log(email,channelName);
    const response= await User.findOne({email:email},(error,result)=>{
        if(error){
            res.status(400).send({msg:error})
        }
        // console.log(result);
        let flag=0;
        for(let i=0;i<result.subscribedChannel.length;i++)
        {
            
            if(result.subscribedChannel[i].channelName==channelName)
            {
                result.subscribedChannel.splice(i,1);
                flag=1;
                break;

            }
        }
        if(flag==1)
        {
            
            result.save((error,updatedata)=>{
                if(error)
            console.log(error);
            else{
                res.send(updatedata)
            }
            })
        }    
        else{
            res.status(200).send({msg:"Channel not subsribed"})
        }

        
        
    }).clone();
}


exports.getsubscribechannel = async(req,res,next)=>{
    
    const {email}=req.params;
    console.log(email);
    const response= await User.findOne({email:email},(error,result)=>{
        if(error){
            res.status(400).send({msg:error})
        }
        else{
            res.status(200).send(result.subscribedChannel)
        }
        // console.log(result);
        


        
        
    }).clone();
    // res.send(response)


}
