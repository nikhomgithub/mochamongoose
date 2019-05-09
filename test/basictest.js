const mocha = require('mocha');
const assert = require('assert');
const mModel = require('../M');

const mongoose = require('mongoose');
//ES6 Promises
mongoose.Promise=global.Promise;

//Basic Test How to Use
describe('Basic Test',()=>{
  it('Pass or Fail',()=>{
    assert(2+2===4);
  });
});