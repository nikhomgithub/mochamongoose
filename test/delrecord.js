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


var record1;
//Test Find a record from collection
describe('Test Del 1 recrod',()=>{
  //Put a record of collection before test
  beforeEach(function(done){
    //system giv id for record1 after initate
    record1=new mModel({ name:'MooMoo'});
  
    record1.save().then(()=>{ done();});
  });
  
  it('Pass or Fail',(done)=>{
    mModel.findOneAndRemove({name:'MooMoo'}).then(()=>{
      mModel.findOne({name:'MooMoo'}).then((m)=>{
        assert(m===null);
        done();
      });
    });
  });
});