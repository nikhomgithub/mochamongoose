const mocha = require('mocha');
const assert = require('assert');
const mModel = require('../M');

const mongoose = require('mongoose');
//ES6 Promises
mongoose.Promise=global.Promise;

//Coonect to db before test
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
describe('Test Update Operator',()=>{
  //Put a record of collection before test
  beforeEach(function(done){
    //system giv id for record1 after initate
    record1=new mModel({ name:'MooMoo', age:50});
    record1.save().then(()=>{ done();});
  });
  
  beforeEach((done)=>{
     mModel.findOneAndUpdate({name:'MooMoo'},{name:'MeeMee'}).then(()=>{
        done();
     });
  });

  it('Pass or Fail',(done)=>{
    mModel.update({},{$inc:{age:5}}).then(()=>{
      mModel.findOne({name:'MeeMee'}).then((m)=>{
        assert(m.age===55);
        done();
      });
    });
  });


});
