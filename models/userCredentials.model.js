const {Schema,model}=require('mongoose')
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
    required:true
  
},
isverified:{
    type:Boolean,
    default:false
},
isadmin:{
    type:Boolean,
    default:false
},
otp:{
    type:String,
    default:null
}
},{timestamps:true});
// can add profile img and role and password hashing
const User=model('Users',userSchema)
module.exports=User
