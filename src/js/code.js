/*! code - source code sample */

let app = require('./app.js');

module.exports = new(function () {

  "use strict";

  this.name = 'code';

  this.opt = {
    sCode: 'HTML'
  };

  this.init = function () {
    app.e('.code', n => this.showCode(n));
  }

  this.showCode = function(src){
    let t = src.innerHTML.
      replace(/^\s*\r?\n|\s+$/g, '').
      replace(/\t/g, '  ').
      replace(/=""/g, '');
    let cont = app.ins('div', '', {classList: 'bord'}, src, 1);
    cont.appendChild(src);
    src.classList.add('pad');
    let id = 'code-' + app.seq();
    app.ins('div', app.ins('a', this.opt.sCode, {className: 'pad', href: '#'+id}), {className: '-r bg small'}, cont);
    let cod = app.ins('pre', '', {className: app.opt.cToggle + ' ' + app.opt.cOff + ' fit pad', id: id}, cont);
    cod.textContent = t;
  }

})();