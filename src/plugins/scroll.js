/*! d1 example plugin */

let d1 = require('../d1.js');

module.exports = new(function () {

  "use strict";

  this.name = 'scroll';
  
  this.y = null;
  
  this.opt = {
  };
  
  this.init = function () {
    d1.listen('hash', e => this.onHash(e));
    let ons = d1.throttle(() => this.onScroll(), 500);
    //ons(); // forces reflow
    setTimeout(() => this.onScroll(), 20);
    d1.b([window], 'scroll', ons);
  }
  
  this.onHash = function(e){
    //to hide topbar on hash change
    if(e) this.y = window.scrollY - 10; // fires before onscroll
  }
  
  this.onScroll = function(){
    //d1.dbg(['scroll on']);
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
  
})();
