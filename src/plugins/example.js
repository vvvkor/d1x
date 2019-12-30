/*! d1 example plugin */

let d1 = require('../d1.js');

module.exports = new(function () {

  "use strict";

  this.name = 'example';
  
  this.opt = {
  };
  
  this.init = function (opt) {
  }
  
  /*
  this.onClick = function(e){
    let n = e.target;
    if(0) return n;
  }
  */

  d1.plug(this);

})();
