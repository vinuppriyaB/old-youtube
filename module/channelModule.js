const Channel= require("../model/channel.js");
const joi =require("joi");
var ObjectId = require('mongodb').ObjectID;
const { response } = require("express");

exports.postchannel = async(req,res,next)=>{
    console.log(req.body)
    const channel = new Channel({
        channelName:req.body.channelName,
    email:req.body.email,
    subscriber:0,
    logo:req.body.logo,
    coverImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6cGk_lgEQlNxSfMwcaGIKILptERMLMqWiig&usqp=CAU",
   
    })

    const updatedDoc= await channel.save();
res.send(updatedDoc);
} 

exports.postvideo = async(req,res,next)=>{
console.log(req.body)
    const newvideo = {

        
        title:req.body.video[0].title,
        timestamp:new Date(),
        imageLink:req.body.video[0].imageLink,
        videoLink:req.body.video[0].videoLink,
        views:0,
        like:0,
        dislike:0,
        description:req.body.video[0].description,  
        tag:req.body.video[0].tags

   
    }
    console.log(newvideo)
         
    const updatedDoc= await Channel.updateOne(
        { channelName:req.body.channelName,}, 
        { $push: { video:newvideo  } },
        {new: true}).exec();
                                   
console.log(updatedDoc)
    if(updatedDoc.modifiedCount==1)
    res.status(200).send({msg:"insert successfully"}) ;
    else
    res.status(400).send({msg:"can't find the document"}) ;

    
    
    
    
} 






exports.searchchannel = async(req,res,next)=>{
    const channelName=req.params.channelName;
    console.log(channelName)
   let response= await Channel.findOne({channelName:channelName}).exec();
   console.log(response)
//    if(response)
    res.send(response);
    // else
    // res.send({});
}

exports.searchCurrentUserChannel = async(req,res,next)=>{
    const email=req.params.email;
    // console.log(email)
   let response= await Channel.findOne({email:email}).exec();
//    console.log(response)
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
    // console.log(id)
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

exports.updatesubcription = async(req,res,next)=>{
    const {channelName,subscribed}=req.body;
    // console.log(channelName,subscribed)
    await Channel.findOne({channelName:channelName},(error,result)=>{
            if(error)
            console.log(error);
            else{
                if(subscribed)
                {
                result.subscriber+=1;
                }
                else{
                    result.subscriber-=1;
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
}

exports.updatedisLike = async(req,res,next)=>{
    const {id,channelName,title,clicked}=req.body;
    console.log(id,channelName)
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
                            result.video[i].dislike+=1;
                        }
                        else{
                            result.video[i].dislike=result.video[i].dislike-1;
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
}

exports.updateview = async(req,res,next)=>{
    const {id,channelName,title,clicked}=req.body;
    console.log(id,channelName)
    await Channel.findOne({channelName:channelName},(error,result)=>{
            if(error)
            console.log(error);
            else{

                for(let i=0;i<result.video.length;i++)
                {

                    if(result.video[i].title==title)
                    {

                        result.video[i].views+=1;
                        
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
}



exports.postcomment = async(req,res,next)=>{
    // res.send(req.body);

    const comment = {
        email:req.body.comment.email,
        profilePic:req.body.comment.profilePic,
        text:req.body.comment.text,
        like:req.body.comment.like,
        dislike:req.body.comment.dislike,
        reply:[]   
}
console.log(comment)
    await Channel.findOne({channelName:req.body.channelName},(error,result)=>{
            if(error)
            console.log(error);
            else{
                // console.log(result);
               
                for(let i=0;i<result.video.length;i++)
                {
                    console.log(result.video[i].title)
                    if(result.video[i].title==req.body.videotitle)
                    {
                        console.log("true")
                       result.video[i].comment.push(comment)
                       break;
                        
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
}

exports.getcomment = async(req,res,next)=>{
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

        },{
            $project:
            {
                "video.comment":1,
                "_id":0
            }
        }
       ]);
    //    console.log(response)
        res.send(response);
    console.log(req.params.id)

}

exports.postreply = async(req,res,next)=>{
    // res.send(req.body);

    let {channelName,videotitle,commentText,replyText}=req.body;
    console.log(channelName,videotitle,commentText,replyText);
    const reply={
        email:req.body.email,
        text:req.body.replyText,
        profilePic:req.body.profilePic,
        like:req.body.like,
        dislike:req.body.dislike
    }
    console.log(reply)
    await Channel.findOne({channelName:channelName},(error,result)=>{
        if(error)
        console.log(error);
        else{
            // console.log(result);
           
            for(let i=0;i<result.video.length;i++)
            {

                if(result.video[i].title==req.body.videotitle)
                {
                    
                    for(let j=0;j<result.video[i].comment.length;j++)
                    {

                        if(result.video[i].comment[j].text==commentText)
                        {
                            console.log(result.video[i].comment[j].text)
                            result.video[i].comment[j].reply.push(reply)
                            console.log(result.video[i].comment[j].reply)
                            break;
                        }
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


}



exports.getreply = async(req,res,next)=>{
     const {id1,id2}=req.params;
    console.log(req.params)
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
                "video._id" :new ObjectId(id1)
            }

        },

        {
            $unwind:
            {
              path:"$video.comment"
              
            }
        },
        {
            $match:
            {
                "video.comment._id" :new ObjectId(id2)
            }

        },
        {
            $project:
            {
                "video.comment.reply":1,
                "_id":0
            }
        }
       ]);
    //    console.log(response)
        res.send(response);


}


exports.updateCommentLike = async(req,res,next)=>{
    const {id,channelName,title,commentText,clicked}=req.body;
    console.log(id,channelName)
    await Channel.findOne({channelName:channelName},(error,result)=>{
            if(error)
            console.log(error);
            else{

               
                for(let i=0;i<result.video.length;i++)
                {

                    if(result.video[i].title==title)
                    {console.log(result.video[i].title)
                        for(let j=0;j<result.video[i].comment.length;j++)
                        {
                            
                            if(result.video[i].comment[j].text==commentText)
                            {
                                console.log(result.video[i].comment[j].text)
                                console.log(clicked)
                                if(clicked)
                                {
                                    result.video[i].comment[j].like+=1;
                                }
                                else{
                                    result.video[i].comment[j].like-=1;
                                }
                            }
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
}