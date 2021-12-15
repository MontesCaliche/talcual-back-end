import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const productSchema = new Schema({
   foreignIdUser:{type:String},
   productName:{type:String},
   productPrice:{type:Number},
   productCity:{type:String},
   productCategory:{type:String},
   productCategory:{type:String},
   productDescription:{type:String},
   imageurl:{type:String}
},{timestamps:true});

const Product = mongoose.model('Product',productSchema);

export default Product;
