/*! d1 example plugin */

let d1 = require('./d1.js');

module.exports = new(function () {

  "use strict";

  this.name = 'example';

  this.opt = {
  };

  this.init = function () {
    //d1.listen('click', e => this.onClick(e));
  }

  /*
  this.onClick = function(e){
    let n = e.target;
  }
  */

  //d1.plug(this);

})();