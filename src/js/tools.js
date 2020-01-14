/*! tools - miscellaneous utilities */

let app = require('./app.js');

module.exports = new(function () {

  "use strict";

  this.name = 'tools';

  this.opt = {
    qTop: 'h2[id], h3[id], h4[id], h5[id], h6[id]', // h1[id],
    minDesktop: 900
  };

  this.init = function () {
    app.e('table[class]', n => this.alignCells(n));
    app.e('[data-class]', n => this.toggleClass(n));
    app.e(this.opt.qTop, n => this.addTopLink(n));
    app.listen('click', e => this.onClick(e));
    this.onResize();
    app.b([window], 'resize', e => this.onResize(e));
  }

  this.onClick = function(e){
    let n = e.target;
    let a = app.closest(n, '[data-class]');
    if(a) this.toggleClass(n, e)
  }

  this.alignCells = function(n) {
    let m = n.className.match(/\b[lcr]\d\d?\b/g);
    if (m) {
      for (let i = 0; i < m.length; i++) {
        app.e(app.qq('tr>*:nth-child(' + m[i].substr(1) + ')', n), c => c.classList.add(m[i].substr(0, 1)) );
      }
    }
  }

  this.setClass = function(a, c, on, n, u){
    app.dbg(['setclass', n, c]);
    if(u !== false) n.className = on ? c : (u || '');
    else c.split(/\s+/).filter(cc => cc).forEach(cc => n.classList[on ? 'add' : 'remove'](cc));
    a.classList[on ? 'add' : 'remove'](app.opt.cAct);
  }

  this.toggleClass = function(n, e) {
    if(n.type == 'radio' && !n.checked) return;
    let box = (n.type == 'checkbox' || n.type == 'radio');
    let q = app.attr(n, 'data-nodes', n.hash);
    let c = app.attr(n, 'data-class', false);
    let u = (n.type == 'radio') ? '' : app.attr(n, 'data-unclass', false);
    let on = box ? n.checked : n.classList.contains(app.opt.cAct);
    if(e && !box){
      on = !on;
      e.preventDefault();
    }
    if (c !== false) app.e(q, m => this.setClass(n, c, on, m, u));
  }

  this.addTopLink = function(n){
    n.style.position = 'relative';
    let a = app.ins('a', app.i('up'), {href:'#', className: 'close l text-n'}, n);
  }

  this.onResize = function() {
    let m = (window.innerWidth <= this.opt.minDesktop);
    m
      ? app.e('[data-class-mobile]', n => n.className = app.attr(n, 'data-class-mobile'))
      : app.e('[data-class-desktop]', n => n.className = app.attr(n, 'data-class-desktop'));
  }

})();