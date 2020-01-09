/*! d1 responsive table */

let d1 = require('./d1.js');

module.exports = new(function () {

  "use strict";

  this.name = 'fliptable';

  this.opt = {
    qFlipTable: 'table.flip',
    cCellHead: 'hide-desktop bg text-n'
  };

  this.init = function () {
    d1.e(this.opt.qFlipTable, n => this.prepareFlipTable(n)); 
  }

  this.prepareFlipTable = function(t){
    var ths = d1.qq('thead th', t);
    var tds = d1.qq('tbody tr>*', t);
    var order = (d1.attr(t, 'data-order') || '0 1 2 3').split(/\D+/);
    //t.parentNode.classList.remove('roll');
    for(var i=0; i<tds.length; i++){
      var td = tds[i];
      var th = ths[td.cellIndex];
      var ord = order.indexOf('' + td.cellIndex);
      if(ord==-1) ord = 99;
      td.style.order = ord;
      if(td.textContent.replace(/\s+$/, '').length>0){
        var v = d1.ins('div');
        while(td.firstChild) v.appendChild(td.firstChild);
        td.textContent = '';
        if(th) d1.ins('div', th.textContent, {className: this.opt.cCellHead}, td)
        td.appendChild(v);
      }
    }
  }

})();