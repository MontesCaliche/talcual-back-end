import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const storeSchema = new Schema({
   nit:{type:Number,required:true},
   name:{type:String},
   address:{type:String,required:true},
   city:{type:String},
   description:{type:String},
   url_img:{type:String}
},{timestamps:true});

const Store = mongoose.model('Document',storeSchema);

export default Store;