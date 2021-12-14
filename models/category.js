import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const categorySchema = new Schema({
   name:{type:String,required:true},
   description:{type:String},
   price:{type:Number,required:true},
   id_category:{type:String},
   date:{type:Date, default: Date.now}
},{timestamps:true});

const Category = mongoose.model('Category',categorySchema);

export default Category;