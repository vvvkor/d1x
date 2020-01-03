/*! d1 tools */

let d1 = require('../d1.js');

module.exports = new(function () {

  "use strict";

  this.name = 'tools';

  this.opt = {
    minDesktop: 900
  };

  this.init = function () {
    d1.e('table[class]', this.alignCells.bind(this));
    d1.e('[data-class]', this.toggleClass.bind(this));
    d1.listen('click', e => this.onClick(e));
    this.onResize();
    d1.b([window], 'resize', this.onResize.bind(this));
  }

  this.onClick = function(e){
    let n = e.target;
    let a = d1.closest(n, '[data-class]');
    if(a) this.toggleClass(n, e)
  }

  this.alignCells = function(n) {
    let m = n.className.match(/\b[lcr]\d\d?\b/g);
    if (m) {
      for (let i = 0; i < m.length; i++) {
        d1.e(d1.qq('tr>*:nth-child(' + m[i].substr(1) + ')', n), c => c.classList.add(m[i].substr(0, 1)) );
      }
    }
  }

  this.setClass = function(a, c, on, n){
    n.classList[on ? 'add' : 'remove'](c);
    a.classList[on ? 'add' : 'remove'](d1.opt.cAct);
  }

  this.toggleClass = function(n, e) {
    let box = (n.type == 'checkbox');
    let q = d1.attr(n, 'data-nodes', n.hash);
    let c = d1.attr(n, 'data-class');
    let on = box ? n.checked : n.classList.contains(d1.opt.cAct);
    if(e && !box){
      on = !on;
      e.preventDefault();
    }
    if (c) d1.e(q, this.setClass.bind(this, n, c, on));
  }

  this.onResize = function() {
    let m = (window.innerWidth <= this.opt.minDesktop);
    m
      ? d1.e('[data-class-mobile]', n => n.className = n.getAttribute('data-class-mobile'))
      : d1.e('[data-class-desktop]', n => n.className = n.getAttribute('data-class-desktop'));
  }

  //d1.plug(this);

})();