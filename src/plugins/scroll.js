/*! d1 example plugin */

let d1 = require('../d1.js');

module.exports = new(function () {

  "use strict";

  this.name = 'scroll';
  
  this.y = null;
  
  this.opt = {
  };
  
  this.init = function () {
    let ons = d1.throttle(this.onScroll.bind(this), 500);
    //ons(); // forces reflow
    setTimeout(this.onScroll.bind(this), 20);
    d1.b([window], 'scroll', ons);
  }
  
  this.onScroll = function(){
    //d1.dbg('scroll');
    if(this.y!==null){
      let dy = window.scrollY - this.y;
      d1.e('.topbar', n => this.decorate(n, window.scrollY, dy));
    }
    this.y = window.scrollY; // forces reflow
  }
  
  this.decorate = function(n, y, dy){
    n.classList[dy>0 ? 'add' : 'remove']('hide')
    n.classList[y && dy<=0 ? 'add' : 'remove']('box')
  }
  
  d1.plug(this);

})();
