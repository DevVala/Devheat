const mongoose=require('mongoose');
const Schema=mongoose.Schema;//constructor function used to create new schema
const infoSchema= new Schema({
    First_name : {
        type:String,
        required:true,
        minlength : 0
    },
    Last_name:{
        type:String,
        required:true,
        minlength : 0

    },
    Email_address:{
        type: String,
        required : true,
        minlength : 0

    },
    User_name:{
        type:String,
        required:true,
        minlength : 0

    },
    Password:{
        type:String,
        required : true,
        minlength : 0

    }
},{ timestamps :true });
const INFO=mongoose.model('User_info' , infoSchema  , 'User_credentials' );
module.exports=INFO;