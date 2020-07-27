const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({

    name : {
        type: String,
        required: [true,'le nom est obligatoire']
    },
    username: {
        type: String,
        required: [true,'le user name est obligatoire']
    },
    email :{
        type: String,
        required: [true,"l'email est obligatoire"],
        unique: [true,"email dejà utilisé"]
    },
    password:{
        type: String,
        required: [true,'le password est obligatoire']
    },

})

UserSchema.pre('save', function(next){
    const user = this 
    bcrypt.hash(user.password, 10, (error,encrypted)=>{
        user.password = encrypted
        next()
    })

})

module.exports =  mongoose.model('User', UserSchema)

 