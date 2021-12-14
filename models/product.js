import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const productSchema = new Schema({
   code:{type:Number},
   foreignIdQuestion:{type:String},
   foreignIdUser:{type:String},
   category:{type:String},
   order:{type:String}
},{timestamps:true});

const Product = mongoose.model('Answer',productSchema);

export default Product;
