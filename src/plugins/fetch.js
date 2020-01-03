/*! d1 async fetch */

let d1 = require('../d1.js');
//require('../plugins/dialog.js');
//require('../plugins/toggle.js');

module.exports = new(function () {

  "use strict";

  this.name = 'fetch';

  this.opt = {
  };

  this.init = function () {
    d1.listen('click', e => this.onClick(e));
  }

  this.onClick = function(e){
    let a = d1.closest(e.target, 'a[data-target]');
    if(a){
      e.preventDefault();
      this.fetchBy(a);
    }
  }

  this.fetchBy = function(n, f) {
    this.fetch(d1.attr(n, 'href'), f ? f.bind(null, n) : this.recv.bind(this, n));
  }

  this.fetch = function(url, f) {
    let req = new XMLHttpRequest();
    if (f) req.addEventListener('load', f.bind(null, req));
    req.open('GET', url);
    req.send();
  }

  this.recv = function(n, req, e) {
    // JSON.parse(req.responseText)
    let d = d1.q(d1.attr(n, 'data-target'));
    if (req.status == '200') {
      if (d) {
        d.innerHTML = req.responseText;
        let dlg = d1.closest(d, '.dlg[id]');
        if (dlg) d1.plugins.toggle.toggle(dlg, true);
      }
      else {
        d1.plugins.dialog.initDlg(null, '', req.responseText);
      }
    }
    else console.error('XHTTP request failed', req);
    d1.fire('after', e);
  }

})();
