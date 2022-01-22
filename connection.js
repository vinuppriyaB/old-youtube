const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

exports.connect=(()=>{
    try{
        mongoose.connect(MONGO_URL)
        .then(()=>{
            console.log("connection succeed");
        })
        

    }catch(e){
        console.log(e);
    }
    
});

