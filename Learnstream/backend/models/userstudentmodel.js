const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema =  mongoose.Schema;
const userstudentSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },  
    password:{
        type:String,
        required:true
    }
})

// static signup method
userstudentSchema.statics.signup = async function(name,email,password){
    if (!name || !email || !password){
        throw Error(`nothing has been entered`)
    }
    if(!validator.isEmail(email)){
        throw Error('please enter a valid email')
    }
    if (!validator.isStrongPassword(password)){
        throw Error('password not strong enough enter password must contain an uppercase lowercase and a symbol');
    }
    const exits = await this.findOne({ email })
    if (exits){ 
        throw Error('email already in use');
    }
    // using await is really essential and it may lead to app crashes if not used properly
    const salt =await bcrypt.genSalt(10);
    const hash =await bcrypt.hash(password,salt);
    
    const user =await this.create({name,email, password:hash})
    return user;
}

// static login method
userstudentSchema.statics.login= async function (email,password) {
    if (!email || !password){
        throw Error(`nothing has been entered`)
    }
    const user = await  this.findOne({email});
    
    if (!user){
        throw Error("this username doesnt exits")
    }
    const match =await  bcrypt.compare(password,user.password);
    if (!match){
        throw Error("wrong passwd enterd");
    }
    return user;
}
module.exports = mongoose.model('UserStudent',userstudentSchema)