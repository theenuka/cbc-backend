import mongoose from 'mongoose';

const userschema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    type:{
        type:String,
        default:"customer"
    },
    profilePicture:{
        type:String,
        default:"https://www.vecteezy.com/vector-art/30504836-avatar-account-flat-vector-isolated-on-transparent-background-for-graphic-and-web-design-default-social-media-profile-photo-symbol-profile-and-people-silhouette-user-icon"
    }
})
const User = mongoose.model("users",userschema)

export default User;
