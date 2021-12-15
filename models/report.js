import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const reportSchema = new Schema({
   foreignIdUser:{type:String},
   emailUser:{type:String},
   title:{type:String},
   lastPrice:{type:Number},
   currentPrice:{type:Number},
   category:{type:String},
   description:{type:String},
   imageurl:{type:String}
},{timestamps:true});

const Report = mongoose.model('Report',reportSchema);

export default Report;