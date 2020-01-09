/*! d1 responsive table */

let d1 = require('./d1.js');

module.exports = new(function () {

  "use strict";

  this.name = 'fliptable';

  this.opt = {
    qFlipTable: 'table.flip'
  };

  this.init = function () {
    d1.e(this.opt.qFlipTable, n => this.prepareFlipTable(n)); 
  }

  this.prepareFlipTable = function(t){
    var ths = t.querySelectorAll('thead th');
    var tds = t.querySelectorAll('tbody tr>*');
    var order = (t.getAttribute('data-order') || '0 1 2 3').split(/\D+/);
    t.parentNode.classList.remove('roll');
    for(var i=0;i<tds.length;i++){
      var td = tds[i];
      var th = ths[td.cellIndex];
      var ord = order.indexOf(''+td.cellIndex);
      if(ord==-1) ord = 99;
      td.style.order = ord;
      var t = td.textContent.replace(/\s+$/,'');
      if(t.length>0){
        if(th) var h = d1.ins('div', th.textContent, {className: 'hide-desktop bg text-n'});
        var v = document.createElement('div');
        while(td.firstChild) v.appendChild(td.firstChild);
        td.textContent = '';
        if(th) td.appendChild(h);
        td.appendChild(v);
      }
    }
  }
  
})();