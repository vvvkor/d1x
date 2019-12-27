/*! d1 dialog */

// Replacement of standard Javascript dialogs: alert, confirm, prompt
// a.alert([title]|[data-caption])
// a.dialog[href]([title]|[data-caption])[data-prompt] [data-src][data-ok][data-cancel][data-reverse] 

var d1 = require('../d1.js');
//require('../plugins/toggle.js');

module.exports = new(function () {

  "use strict";

  this.name = 'dialog';
  this.dlg = null;
  
  this.opt = {
    customDialog: 1,
    aConfirm: '_confirm',
    aPrompt: 'data-prompt',
    cBtn: 'btn pad',
    qAlert: 'a.alert',
    qDialog: 'a.dialog, input.dialog'
  };
  
  this.init = function (opt) {
    d1.listen('click', e => this.onClick(e));
  }
  
  this.onClick = function(e){
    var as = d1.closest(e.target, 'a, input, button');
    if(as && as.matches(this.opt.qAlert+','+this.opt.qDialog)){
      //d = this.dialog(e, a, (m, v) => !console.log(v) && d1.unpop()); //custom callback
      e.preventDefault();
      return this.dialog(as);
    }
  }

  this.initDlg = function(n, h, t, f, def, rev){
    if(!this.dlg) this.dlg = d1.ins('div', '', {className:'dlg toggle'}, document.body);
    var c, d = this.dlg;
    while(c=d.firstChild) d.removeChild(c);
    var hh = d1.ins('div', '', {className: 'row bg'}, d);
    d1.ins('h3', h || '', {className: 'let pad'}, hh);
    d1.x(hh, 0, 'pad hover col-0');
    var b = d1.ins('div', '', {className: 'pad'}, d);
    if(t) d1.ins('div', t, {}, b);
    var inp = {value: true};
    if(def || def==='') inp = d1.ins('input', '', {value: def}, b);
    var bb = d1.ins('p', '', {className: 'r'}, b);
    var warn = this.opt.cBtn + ' ' + ((t.substr(0,1)==' ' || n.className.match(/-[we]\b/)) ? 'bg-e' : 'bg-y');
    var sec = this.opt.cBtn + ' bg-n';
    var yes = d1.ins('a', d1.attr(n, 'data-ok', d1.opt.sOk), {href: d1.opt.hClose, className: (rev ? sec : warn)}, bb);
    if(f){
      var no = d1.ins('a', d1.attr(n, 'data-cancel', d1.opt.sCancel), {href: d1.opt.hClose, className: (rev ? warn : sec)}, yes, rev ? -1 : 1);
      d1.ins('', ' ', {}, yes, rev ? -1 : 1);
      yes.href = d1.opt.hOk;
      d1.b([yes], 'click', e => { e.preventDefault(); f.call(this, inp.value); });
      if(inp.tagName) d1.b([inp], 'keyup', e => e.keyCode==13 ? f.call(this, inp.value, e) : null);
    }
    d1.plugins.toggle.toggle(this.dlg, true);
  }
  
  
  this.dialog = function(n, f){
    if (n.form && !n.form.checkValidity()){
      n.form.reportValidity();
      return;
    }
    var p = d1.attr(n, this.opt.aPrompt);
    var t = d1.attr(n, d1.opt.aCaption, n.title || p || '!');
    var rev = d1.attr(n, 'data-reverse');
    var src = d1.attr(n, 'data-src');
    src = src ? d1.q(src) : null;
    if(!src && n.form) src = n.form.elements[p];
    var v = null;
    var al = n.matches(this.opt.qAlert);
    var def = p ? (src ? src.value : d1.get(n, p)) : null;
    if(this.opt.customDialog){
      this.initDlg(n, '', t, al ? null : this.onAnswer.bind(this, n, f, p), def, rev);
    }
    else{
      if(al) v = alert(t);//undef
      else if(!p) v = confirm(t);//bool
      else v = prompt(t, def);//null|value
      this.onAnswer(n, f, p, v);
    }
    return this.dlg;
  }
  
  this.onAnswer = function(n, f, p, v){
    //call custom func
    if(f) f.call(this, n, v);
    //cancelled
    else if(!v && v!=='') ;
    //form submit
    else if(n.form){
      if(v!==true){
        var i = n.form.elements[p] || d1.ins('input', '', {type: 'hidden', name: p}, n.form);
        if(i) i.value = v;
      }
      if(n.form.reportValidity()){
        d1.ins('input', '', {type: 'hidden', name: n.name, value: n.value}, n.form);
        n.form.elements[this.opt.aConfirm] || d1.ins('input', '', {type: 'hidden', name: this.opt.aConfirm, value: 1}, n.form);
        n.form.submit();
      }
      else d1.unpop();
      //n.click();
    }
    //goto link
    else if(n.href){
      var ha = (d1.attr(n, 'href').substr(0, 1)=='#');
      var bl = (n.target=='_blank');
      if(ha || bl) d1.unpop();
      if(ha) u = n.hash;
      else{
        var a = {};
        a[this.opt.aConfirm] = 1;
        if(v!==true) a[p] = v;
        var u = d1.makeUrl(n, a);
      }
      if(n.target=='_blank') window.open(u, n.target);
      else location.href = u;
    }
  }
  
  d1.plug(this);

})();