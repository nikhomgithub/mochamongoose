const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
//const config = require('config');

//const db = config.get('mongoURI');
const db="mongodb+srv://nikhom123:meemee@cluster0-dniau.mongodb.net/test?retryWrites=true"
// Connect to Mongo
mongoose
  .connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

//local connect
/* 
const mongoose = require('mongoose');
const mModel = require('./M');
const db='mongodb://localhost';

mongoose.connect(db);

mongoose.connection.once('open',()=>{
    console.log('connectoin success');
}).on('error',(e)=>{
    console.log(e);
});
*/
/*1.Save record
var record1=new mModel({ name:'MeeMee'});
record1.save();
*/

/*2.Delete table
mongoose.connection.collections.mtables.drop();
*/