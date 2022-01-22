const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const videoSchema=new Schema({

        


})   

const channelSchema=new Schema({
    channelName:{
            type:String,
            minLength:3,
            required:true,
            unique:true,
            
    },
    email:{
        type:String,
        minLength:5,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        minLength:3,
        required:true,
    },
    ChannelMoto:{
        type:String,
        minLength:10,
        required:true,
    },
    subscriber:{
        type:Number,
        required:true,
    },
    logo:{
        type:String,
        required:true,
    },
    video:[{
        id:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true,
            },
        timestamp:{
            type:String,
            required:true,
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
        },
        description:{
            type:String,
            required:true,
            },  
        tag:{
            type:String,
            required:true,

        }
    }]
    
    
    })

const Channel=mongoose.model("Channel",channelSchema,"channel");

module.exports=Channel;


// video:[
//     {
//         id:{
//             type:Schema.Types.ObjectId,
//             required:true
//         },
//         title:{
//             type:String,
//             required:true,
//             },
//         timestamp:{
//             type:Number,
//             required:true,
//         } ,
//         imageLink:{
//             type:String,
//             required:true,
//         },
//         videoLink:{
//             type:String,
//             required:true,
//         },
//         views:{
//             type:Number,
//             required:true,
//         },
//         like:{
//             type:Number,
//             required:true,
//         },
//         description:{
//             type:String,
//             required:true,
//             },  
//         tag:{
//             type:String,
//             required:true,

//         }
//     }

//     ]