import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

//Para validar que los roles sean los que estan en los valores
const roles = {
    values: ['admin','user','store'],
    message: '{VALUE} Rol no válido'
}

const userSchema = new Schema({
    email:{
        type:String,
        required:[true,'El email es necesario'],
        unique: true
    },
    password:{type:String,required:[true,'La contraseña es obligatoria']},
    role:{type:String,required:true,default:'user',enum:roles },
    name:{type:String,required:[true,'El nombre es necesario']},
    country:{type:String, default:""},
    phone:{type:String, default:""},
    birth:{type:Date, default:""},
    facebook:{type:String, default:""},
    instagram:{type:String, default:""},
    twitter:{type:String, default:""},
    linkedin:{type:String, default:""},
    date:{type:Date, default: Date.now},
    active:{type:Boolean, default:true},
    url_img:{type:String, default:""}   
});

//para validar que el email sea unico
userSchema.plugin(uniqueValidator, {message:'Error, se esperaba {PATH} único'});

//Este método se usa para no devolver la contraseña encriptada cuando se crea
userSchema.methods.toJSON = function(){
    const obj = this.toObject();
    delete obj.password;
    return obj;
}

const User = mongoose.model('User',userSchema);

export default User;