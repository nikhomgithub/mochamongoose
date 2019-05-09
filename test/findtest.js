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


//Test Find a record from collection
describe('Test Find',()=>{
  //Put a record of collection before test
  beforeEach(function(done){
    var record1=new mModel({ name:'MooMoo'});
  
    record1.save()
      .then(()=>{
        done();
      })
  });
  
  
  it('Pass or Fail',(done)=>{
    mModel.findOne({name:'Moomoo'})
      .then((m)=>{
        assert(m.name==='MooMoo');
        done();
      })
      .catch (err=>{
        done();
      });
  });
});