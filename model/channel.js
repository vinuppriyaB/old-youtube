const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const videoSchema=new Schema({

        


})   

const channelSchema=new Schema({
    channelName:{
            type:String,
            
            required:true,
            unique:true,
            
    },
    email:{
        type:String,
        
        required:true,
        unique:true,
    },
    subscriber:{
        type:Number,
        required:true,
    },
    coverImage:{
        type:String,
    },
    logo:{
        type:String,
        required:true,
    },
    video:[ {
        
            title:{
                type:String,
                required:true,
                },
            timestamp:{
                type:String,
                
            } ,
            imageLink:{
                type:String,
                required:true,
            },
            videoLink:{
                type:String,
                required:true,
            },
            views:{
                type:Number,
                required:true,
            },
            like:{
                type:Number,
                required:true,
                initial:0,
                min:0
            },
            dislike:{
                type:Number,
                required:true,
                initial:0,
                min:0
            },
            description:{
                type:String,
                required:true,
                },  
            tag:{
                type:String,
                required:true,
        
            },
            comment:[{
                email:{
                    type:String,
                    required:true,
                    
                },
                
                profilePic:{
                    type:String,
                    required:true,
                },
                text:{
                    type:String,
                    required:true,
                },
                like:{
                    type:Number,
                    required:true,
                },
                dislike:{
                    type:Number,
                    required:true,
                },
                reply:[ {
                        email:{
                        type:String,
                        required:true,
                       
                    },
                    profilePic:{
                        type:String,
                        
                    },
                    text:{
                        type:String,
                        required:true,
                    },
                    like:{
                        type:Number,
                        required:true,
                    },
                    dislike:{
                        type:Number,
                        required:true,
                    }
                }]
            }]
        
        }

    ]
    
    })

const Channel=mongoose.model("Channel",channelSchema,"channel");

module.exports=Channel;



