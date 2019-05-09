const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const BookSchema=new Schema({
  title:String,
  pages:Number
});

const AuthorSchema=new Schema({
  name:String,
  age:Number,
  books:[BookSchema]
});

const AuthorModel=mongoose.model('authortable',AuthorSchema);

module.exports=AuthorModel;
