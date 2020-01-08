/*! d1 example plugin */

let d1 = require('./d1.js');

module.exports = new(function () {

  "use strict";

  this.name = 'scroll';
  
  this.y = null;
  //this.hashed = false;
  
  this.opt = {
    //gap: 20,
    cBox: 'box',
    qTopbar: '.topbar.let',
    //qTopbarFixed: '.topbar:not(.let)'
  };
  
  this.init = function () {
    let t;
    //if(d1.q(this.opt.qTopbar)){
      d1.listen('hash', e => this.onHash(e));
      let ons = d1.throttle(() => this.onScroll(), 500);
      //let ons = d1.throttle((h) => this.onScroll(h), 500);
      //ons(); // forces reflow
      setTimeout(() => this.onScroll(), 20);
      d1.b([window], 'scroll', e => ons(/*this.hashed*/));
    //}
    /*
    else if(t = d1.q(this.opt.qTopbarFixed)){
      d1.listen('hash', e => this.fixScroll());
    }
    */
  }
  
  this.onHash = function(e){
    //to hide topbar on hash change
    // fires before onscroll, but page is already scrolled
    d1.dbg(['scroll hash',location.hash,e]);
    if(e && location.hash && d1.q(location.hash)){
      this.y = window.scrollY - 10;
      //this.y = 1;
      //this.hashed = true;
    }
  }
  
  this.onScroll = function(/*h*/){
    //let mode = this.hashed ? 'hash' : (h ? 'fix' : 'scroll');
    //d1.dbg(['scroll']); // ,mode,h,this.hashed
    if(this.y!==null/* && !h*/){
      let dy = window.scrollY - this.y;
      d1.e(this.opt.qTopbar, n => this.decorate(n, window.scrollY, dy));
    }
    this.y = window.scrollY; // forces reflow
    //if(this.hashed) this.fixScroll();
    //this.hashed = false;
  }
  
  this.decorate = function(n, y, dy){
    n.classList[dy>0 ? 'add' : 'remove'](d1.opt.cHide)
    n.classList[y && dy<=0 ? 'add' : 'remove'](this.opt.cBox)
  }

  /*
  this.fixScroll = function(){
    d1.dbg(['scroll-fix',location.hash]);
    if(d1.q(location.hash)){
      //let t = d1.q(this.opt.qTopbar + ':not(.'+ d1.opt.cHide +')');
      let t = d1.q(this.opt.qTopbarFixed);
      window.scrollBy(0, (t ? -t.offsetHeight : 0) - this.opt.gap);
    }
    //this.hashed = false;
    //setTimeout(() => this.hashed = false, 500);
  }
  */
})();
