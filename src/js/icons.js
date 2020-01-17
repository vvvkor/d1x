/*! icons - include svg icons */

let app = require('./app.js');

module.exports = new(function () {

  "use strict";

  this.name = 'icons';

  this.opt = {
    width: 24,
    height: 24,
    aReplace: 'data-ico',
    aAdd: 'data-icon'
  };
  
  this.paths = {
    ok: 'M10,50l40,40 40,-80z'
  };
  
  this.init = function () {
    app.e('[' + this.opt.aReplace + ']',  n => this.addIcon(app.attr(n, this.opt.aReplace), n, true));
    app.e('[' + this.opt.aAdd + ']', n => this.addIcon(app.attr(n, this.opt.aAdd), n));
  }

  this.addIcon = function(i, n, clr){
    let t = n.textContent;
    let icon = app.i(i);
    if(icon){
      if(clr){
        app.clr(n);
        if(!n.title) n.title = t;
      }
      if(n.firstChild) n.insertBefore(document.createTextNode(' '), n.firstChild);
      n.insertBefore(icon, n.firstChild);
    }
  }

})();