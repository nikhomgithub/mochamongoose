const mocha = require('mocha');
const assert = require('assert');
const mModel = require('../M');

const mongoose = require('mongoose');
//ES6 Promises
mongoose.Promise=global.Promise;

//Connect to db before test
before(function(done){
  const db='mongodb://localhost/ex';
  mongoose.connect(db);
  mongoose.connection
    .once('open',()=>{
      console.log('connection success^-^');
      done();
    })
    .on('error',(e)=>{
      console.log(e);
    });
  });

//Drop collection before test
beforeEach(function(done){
  mongoose.connection.collections.mtables.drop(function(){
    done();
  });
});

//Save Test into collection
//In case of no collection exist, it will create one 
describe('Test Save',()=>{
  it('Pass or Fail',(done)=>{
    var record1=new mModel({
      name:'MooMoo'
    });
    record1.save().then(()=>{
      assert(record1.isNew===false);
      done();
    });
  });
});