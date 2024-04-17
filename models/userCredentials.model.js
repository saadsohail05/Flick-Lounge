const {Schema,Model}=require('mongoose')
const userSchema=new Schema({
username:{
    type:String,
    required:true,
    unique:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
    unique:true,
}

});
// can add profile img and role
const User=Model('userCredentials.model',userSchema)
module.exports=User