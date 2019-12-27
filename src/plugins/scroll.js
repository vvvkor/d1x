/*! d1 example plugin */

var d1 = require('../d1.js');

module.exports = new(function () {

  "use strict";

  this.name = 'scroll';
  
  this.y = null;
  
  this.opt = {
  };
  
  this.init = function (opt) {
    d1.b([window], 'scroll', this.onScroll.bind(this));
    this.onScroll();
  }
  
  this.onScroll = function(e){
    if(this.y!==null){
      var dy = window.scrollY - this.y;
      d1.e('.topbar', n => this.decorate(n, window.scrollY, dy));
    }
    this.y = window.scrollY;
  }
  
  this.decorate = function(n, y, dy){
    n.classList[dy>0 ? 'add' : 'remove']('hide')
    n.classList[y && dy<=0 ? 'add' : 'remove']('box')
  }
  
  d1.plug(this);

})();
