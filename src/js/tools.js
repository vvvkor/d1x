/*! d1 tools */

let d1 = require('./d1.js');

module.exports = new(function () {

  "use strict";

  this.name = 'tools';

  this.opt = {
    qTop: 'h2[id], h3[id], h4[id], h5[id], h6[id]', // h1[id],
    iTop: '&uarr;',
    minDesktop: 900
  };

  this.init = function () {
    d1.e('table[class]', n => this.alignCells(n));
    d1.e('[data-class]', n => this.toggleClass(n));
    d1.e(this.opt.qTop, n => this.addTopLink(n));
    d1.listen('click', e => this.onClick(e));
    this.onResize();
    d1.b([window], 'resize', e => this.onResize(e));
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
    if (c) d1.e(q, m => this.setClass(n, c, on, m));
  }

  this.addTopLink = function(n){
    n.style.position = 'relative';
    let a = d1.ins('a', this.opt.iTop, {href:'#', className: 'close l text-n'}, n);
  }

  this.onResize = function() {
    let m = (window.innerWidth <= this.opt.minDesktop);
    m
      ? d1.e('[data-class-mobile]', n => n.className = d1.attr(n, 'data-class-mobile'))
      : d1.e('[data-class-desktop]', n => n.className = d1.attr(n, 'data-class-desktop'));
  }

})();