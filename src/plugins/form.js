/*! d1 form tools */

let d1 = require('../d1.js');
//require('../plugins/toggle.js');

module.exports = new(function () {

  "use strict";

  this.name = 'form';

  this.opt = {
  };

  this.init = function () {
    d1.e('input[type="color"]', this.prepareColor.bind(this));
    d1.listen('click', e => this.onClick(e));
  }

  this.onClick = function(e){
    let n = e.target;
    let a = d1.closest(n, 'a[href^="#"][data-value]');
    if(a){
      e.preventDefault();
      this.setValue(a);
    }
    else if(n.matches('input[data-group]')){
      this.checkBoxes(n);
    }
  }

  this.checkBoxes = function(n) {
    d1.e(d1.qq('input[type="checkbox"][class~="' + d1.attr(n, 'data-group') + '"]', n.form),
      m => m.checked = n.checked);
  }
  
  this.setValue = function(n) {
    let d = d1.q(n.hash);
    if (d) {
      d.value = d1.attr(n, 'data-value');
      d1.plugins.toggle.esc();
    }
  }

  this.prepareColor = function(n) {
    let m = document.createElement('input');
    m.type = "text";
    m.value = n.value;
    m.size = 7;
    m.className = 'color';
    n.parentNode.insertBefore(m, n);
    n.parentNode.insertBefore(document.createTextNode(' '), n);
    d1.b([n, m], 'input', e => (e.target==n ? m : n).value = e.target.value );
  }

  //d1.plug(this);

})();
