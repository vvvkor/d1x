/*! d1 code sample */

let d1 = require('./d1.js');

module.exports = new(function () {

  "use strict";

  this.name = 'code';

  this.opt = {
    sCode: 'HTML'
  };

  this.init = function () {
    d1.e('.code', n => this.showCode(n));
  }

  this.showCode = function(src){
    let t = src.innerHTML.
      replace(/^\s*\r?\n|\s+$/g, '').
      replace(/\t/g, '  ').
      replace(/=""/g, '');
    let cont = d1.ins('div', '', {classList: 'bord'}, src, 1);
    cont.appendChild(src);
    src.classList.add('pad');
    let id = 'code-' + d1.seq();
    d1.ins('div', d1.ins('a', this.opt.sCode, {className: 'pad', href: '#'+id}), {className: '-r bg small'}, cont);
    let cod = d1.ins('pre', '', {className: 'let hide toggle', id: id}, cont);
    cod.textContent = t;
  }

})();