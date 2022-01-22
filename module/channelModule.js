const Channel= require("../model/channel.js");
const joi =require("joi");
var ObjectId = require('mongodb').ObjectID;
const { response } = require("express");

exports.postchannel = async(req,res,next)=>{
    
    const channel = new Channel({
        channelName:req.body.channelName,
    email:req.body.email,
    password:req.body.email,
    ChannelMoto:req.body.ChannelMoto,
    subscriber:req.body.subscriber,
    logo:req.body.logo,
    

   
    })
    
    
    const response= await channel.save();
    
    res.send(response);
} 

exports.postvideo = async(req,res,next)=>{
    const newvideo = {

        id:req.body.video[0].id,
        title:req.body.video[0].title,
        timestamp:req.body.video[0].timestamp,
        imageLink:req.body.video[0].imageLink,
        videoLink:req.body.video[0].videoLink,
        views:req.body.video[0].views,
        like:req.body.video[0].like,
        description:req.body.video[0].description,  
        tag:req.body.video[0].tag

   
    }
         
    const updatedDoc= await Channel.updateOne(
        { channelName:req.body.channelName,}, 
        { $push: { video:newvideo  } },
        {new: true}).exec();
                                   
// console.log(updatedDoc)
    if(updatedDoc.modifiedCount==1)
    res.status(200).send({msg:"insert successfully"}) ;
    else
    res.status(400).send({msg:"can't find the document"}) ;

    
    
    
    
} 
exports.searchchannel = async(req,res,next)=>{
    const channelName=req.params.channelName;
    console.log(channelName)
   let response= await Channel.findOne({channelName:channelName}).exec();
    res.send(response);
}

exports.allchannel = async(req,res,next)=>{

   let response= await Channel.aggregate([
    {
        $unwind:
        {
          path:"$video"
          
        }
    }
   ]);
    res.send(response);
}

exports.watchvideo = async(req,res,next)=>{
    const id=req.params.id;
    console.log(id)
    let response= await Channel.aggregate([
        {
            $unwind:
            {
              path:"$video"
              
            }
        },
        {
            $match:
            {
                "video._id" :new ObjectId(id)
            }

        }
       ]);
    //    console.log(response)
        res.send(response);

}

exports.updateLike = async(req,res,next)=>{
    const {id,channelName,title,clicked}=req.body;
    // console.log(id,channelName)
    await Channel.findOne({channelName:channelName},(error,result)=>{
            if(error)
            console.log(error);
            else{

               
                for(let i=0;i<result.video.length;i++)
                {

                    if(result.video[i].title==title)
                    {
                        console.log(clicked)
                        if(clicked)
                        {
                            result.video[i].like+=1;
                        }
                        else{
                            result.video[i].like=result.video[i].like-1;
                        }
                        
                    }
                }
                result.save((error,updatedata)=>{
                    if(error)
                console.log(error);
                else{
                    res.send(updatedata)
                }
                })
            }
        }

    ).clone();
    // let response= await Channel.aggregate([
    //     {
    //         $match:
    //         {
    //             "channelName" :channelName,
                
    //         }

    //     },
    //     {
    //         $unwind:
    //         {
    //           path:"$video"
              
    //         }
    //     },
    //     {
    //         $match:
    //         {
    //             "video._id" :new objectId(id)
    //         }

    //     },
    //     {
    //         $set:
    //         {
    //             video:{like:1}
    //         }
    //     },
        

    //    ])

    //    console.log(response)
    //     res.send(response);
   

}