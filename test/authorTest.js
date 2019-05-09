const assert = require('assert');
const AuthorModel = require('../Mauthor');

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
beforeEach((done)=>{
  mongoose.connection.collections.authortables.drop(()=>{
    done();
  });
});



describe('Author Test',()=>{
  //Put a record of collection before test
  before((done)=>{
    //system give id for record1 after initate
    var record1=new AuthorModel({ 
      name:'Nik', 
      age:40,
      books:[{title:'Basic Book',pages:400}]
    });
    record1.save().then(()=>{ 
      AuthorModel.findOne({name:'Nik'}).then(m=>{
        //assert(m.books.length===1);
        done();
      });
    });
  });

  it('Pass or Fail',(done)=>{
    var record1=new AuthorModel({ 
      name:'Nik', 
      age:40,
      books:[{title:'Basic Book',pages:400}]
    });

    record1.save().then(()=>{
      AuthorModel.findOne({name:'Nik'}).then(()=>{
        record1.books.push({title:'Advance Book',pages:200});
        record1.save().then(()=>{
          AuthorModel.findOne({name:'Nik'}).then(m=>{
            assert(record1.books.length===2);
            done();
          });
        });
      });
    });

  });

});

