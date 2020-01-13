/*! d1 custom form validation */

let d1 = require('./d1.js');

module.exports = new(function () {

  "use strict";

  this.name = 'valid';

  this.opt = {
    aHint: 'data-hint',
    qValidate: 'form', // set custom text for browser tooltips
    cUnhint: 'js-unhint', // turn off browser tooltips
    cLiveVal: 'js-live-val' // live validation, disable submit buttons if invalid
  };
  
  this.init = function () {
    //let q = this.opt.qValidate;
    //let dh = '[' + this.opt.aHint + ']';
    //d1.e(q + ' input' + dh + ', ' + q + ' textarea' + dh + ', '+ q +' select' + dh, n => this.initInput(n));
    let inputs = ['input', 'textarea', 'select'].map(s => this.opt.qValidate + ' ' + s + '[' + this.opt.aHint + ']').join(', ');
    d1.e(inputs + ', .' + this.opt.cLiveVal + ' [name]', n => this.initInput(n));
    d1.e('form.' + this.opt.cUnhint, n => this.unhint(n));
    d1.e('form.' + this.opt.cLiveVal, n => this.validateForm(n));
    d1.b('form.' + this.opt.cUnhint, 'submit', e => this.validateForm(e.target, e));
  }
  
  this.initInput = function(n) {
    if (n.willValidate) {
      if (n.tagName == 'select' || n.type == 'radio' || n.type == 'checkbox') d1.b(n, 'change', e => this.validateInput(e.target));
      else d1.b([n], 'input', e => this.validateInput(e.target));
      d1.b([n], 'invalid', e => this.setCustomMessage(e.target));
    }
  }

  this.isLive = function(f){
    return (f && f.classList.contains(this.opt.cLiveVal));
  }
  
  this.validateInput = function(n) {
    if (n.type == 'radio') d1.e(d1.qq('[name="'+n.name+'"]', n.form), m => m.setCustomValidity(''));
    else n.setCustomValidity('');
    n.checkValidity();
    if(this.isLive(n.form)) this.validateForm(n.form);
  }

  this.setCustomMessage = function(n) {
    let t = n.getAttribute('data-hint') || '';// || n.title;
    t = t.replace(/%([\w\-]+)%/g, function(m,v){ return n.getAttribute(v); })
    n.setCustomValidity(t);
  }
  
  this.unhint = function(n) {
    n.setAttribute('novalidate', true);
  }
  
  this.validateForm = function(n, e) {
    if(e) n.classList.remove(this.opt.cUnhint);
    let ok = n.checkValidity();//!==false
    if (!ok && e) {
      e.preventDefault();
      e.stopPropagation();
      let f = d1.q(':invalid', n);
      if(f) f.focus();
    }
    if(this.isLive(n)){
      //d1.e(d1.qq('[type="submit"]', n), m => m.disabled = !ok);//if no cUnhint
      d1.e(d1.qq('[type="submit"]', n), m => m.classList[ok ? 'remove' : 'add']('bg-n'));//if cUnhint used
    }
  }

})();