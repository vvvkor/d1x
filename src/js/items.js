/*! items - copy, hide, delete items */

let app = require('./app.js');

module.exports = new(function () {

  "use strict";

  this.name = 'items';

  this.opt = {
    qItem: 'li, tr, .item' // div
  };

  this.init = function () {
    app.listen('click', e => this.onClick(e));
  }

  this.onClick = function(e){
    let n = app.closest(e.target, 'a[href^="#"]');
    if(n && n.hash){
      let d = app.closest(e.target, this.opt.qItem);
      if(d){
        let cont = d.parentNode;
        if(this.process(d, n.hash.substr(1))){
          app.fire('updated', {n: cont});
          e.preventDefault();
          e.stopPropagation();
        }
      }
    }
  }
  
  this.process = function(n, x){
    let r = true;
    if(x=='copy'){
      n.parentNode.insertBefore(n.cloneNode(true), n.nextSibling);
    }
    else if(x=='del'){
      if(n.parentNode.children.length>1) n.parentNode.removeChild(n);
    }
    else if(x=='delete'){
      n.parentNode.removeChild(n);
    }
    else if(x=='hide'){
      n.classList.add(app.opt.cHide);
    }
    else r = false;
    return r;
  }

})();