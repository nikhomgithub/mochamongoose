const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const mSchema=new Schema({
  name:String,
  age:Number
});

const mModel=mongoose.model('mTable',mSchema);

module.exports=mModel;
