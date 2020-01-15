/*! icons - include svg icons */

let app = require('./app.js');

module.exports = new(function () {

  "use strict";

  this.name = 'icons';

  this.opt = {
    aReplace: 'data-ico',
    aAdd: 'data-icon'
  };
  
  this.icons = {
    'user': ['user', ':)'],
    'find': ['find', '?'],
    'config': ['config', '*'],
    'open': ['add', '+'],
    'world': ['place', '%']
  };

  this.init = function () {
    app.e('[' + this.opt.aReplace + ']',  n => this.addIcon(n, app.attr(n, this.opt.aReplace), true));
    app.e('[' + this.opt.aAdd + ']', n => this.addIcon(n, app.attr(n, this.opt.aAdd)));
  }

  this.addIcon = function(n, i, clr){
    let t = n. textContent;
    if(clr) app.clr(n);
    let s = n.insertBefore(app.i(i), n.firstChild);
    if(s.nextSibling) app.ins(false, ' ', {}, s);
    else if(!n.title) n.title = t;
  }

})();