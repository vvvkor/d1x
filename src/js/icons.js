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
  
  this.icons = {
  };

  this.paths = {
    ok: 'M10,50l40,40 40,-80z'
  };
  
  this.init = function () {
    app.e('[' + this.opt.aReplace + ']',  n => this.addIcon(app.attr(n, this.opt.aReplace), n, true));
    app.e('[' + this.opt.aAdd + ']', n => this.addIcon(app.attr(n, this.opt.aAdd), n));
  }

  this.addIcon = function(ii, n, clr, cls){
    ii = ii.split(/\//);
    let i = ii[0];
    let w = ii[1];
    let h = ii[2];
    let t = n.textContent;
    let p = this.paths[i];
      let id = p ? null : app.opt.pSvg + i;
      let pp = id ? document.getElementById(id) : null;
    let svg = p || pp;
    if(!svg) clr = false;
    let cap = (!clr && n.textContent.replace(/\s+$/, '')!=='');
    let c = [((svg && !w && !h) ? app.opt.cIcon : ''), (cls || '')].filter(cc => !!cc).join(' ');
    let cc = c ? ' class="' + c + '"' : '';
    let prop = cc + ' width="' + (w || this.opt.width) + '" height="' + (h || this.opt.height) + '"';
    let add = p
      ? '<svg' + prop + ' viewBox="0 0 100 100">' + '<path d="' + p + '"/></svg>'
      : (cap
        ? ''
        : (cls
          ? '<span' + cc + '>[' + i + ']</span>'
          : '[' + i + ']'
          )
        );
    if(!p && pp) add = '<svg' + prop + '"><use xlink:href="#' + id + '"></use></svg>';
    n.innerHTML = add + (cap ? ' ' + n.innerHTML : '');
    if(!cap && !n.title) n.title = t;
    return n.firstChild;
  }

})();