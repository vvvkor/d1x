/*! d1css v1.0.1 https://github.com/vvvkor/d1 */
/* Enhancements for d1css microframework */

(function(window, document, Element) {
  
  "use strict";

  //check single instance
  if (window && window.d1) {
    console.log("d1 already included");
  }
  else {

// begin module
 
var main = new (function(){

  this.sequence = 0;
  this.dlg = null;
  this.prevWidth = 0;
  
  this.opt = {
    dialog: 1,
    keepHash: 0,
  };
  
  this.qs = {
    tgl: '.toggle[id]',
    pop: '.pop>div[id]',
    nav: '.nav.toggle ul',
    dlg: '.dlg',
    tab: '.tabs+div>[id]',
    tre: 'ul.toggle:not(.nav) ul', //'.tree ul',
    drw: '.drawer',

    acc: 'ul.accordion',
    acco: 'ul.accordion ul',
    alert: 'a.alert',
    dialog: 'a.dialog, input.dialog',
    gal: '.gal>a[id]',
    subMem: '.tabs.mem+div>[id], ul.mem:not(.nav) ul',
    
    aCaption: 'data-caption',
    aConfirm: '_confirm',
    aPrompt: 'data-prompt',
    cBtn: 'btn pad',
    cClose: 'close',
    cHide: 'hide',
    cJs: 'js',
    cMem: 'mem',
    cToggle : 'toggle',
    hClose: '#cancel',
    hOk: '#ok',
    iClose: '&#x2715;', //&times;
    iToggle: '[+]',
    sCancel: 'Cancel',
    sOk: 'OK'
    };

  this.init = function(d){
    //prepare body
    document.body.classList.add(this.qs.cJs); //anti:hover, anti:target
    
    //toggle
    var q = this.qs;
    this.qs.toggle = [q.tgl, q.pop, q.nav, q.dlg, q.tab, q.tre, q.drw/*, q.gal*/].join(', ');
    this.qs.autohide = [q.pop, q.nav, q.dlg, q.tab, q.acco, q.drw/*, q.gal*/].join(', ');
    this.qs.unpop = [q.pop, q.nav, q.dlg, q.drw/*, q.gal*/].join(', ');
    this.e(this.qs.toggle, n => n.classList.add(this.qs.cToggle)); //initialize togglers
    this.e(this.qs.autohide, n => this.tgl(n, 0)); //autohide
    
    this.e(this.qs.nav + ', ' + this.qs.tre, this.attachSubNav); //nav, tree: attach to links
    this.e(this.qs.gal + ':last-child', n => this.insClose(n, 1));//gal: auto add close link
    this.e(this.qs.subMem, n => n.classList.add(this.qs.cMem)); //initialize sub mem
    this.e('[id]', this.restoreVisibility);//restore visibility
    this.onHash(); //activate hash
    this.e(this.qs.tab + ':not(.hide) ~ [id]:not(.hide)', n => this.tgl(n, 0)); //undup tabs
    this.e(this.qs.tab + ':first-child', n => this.a(n.parentNode.children).filter(m => this.vis(m)).length ? null : this.tgl(this.q(this.q('a[href^="#"]', n.parentNode.previousElementSibling).hash), 1));//inactive tabs: show first
    this.e('.' + this.qs.cToggle + '[id]', this.hiliteLinks);//init links state
    
    //bind events
    
    this.b([window], 'hashchange', this.onHash);
    this.b([document], 'keydown', this.onKey);
    this.b([document], 'click', this.onClick);
    this.afterAction();
  }
  
  //utils
  
  this.seq = function(){
    return ++this.sequence;
  }
  
  this.closest = function(n, q){ //including self
    //return n.parentNode.closest(q); //-ie
    do{
      if (n.matches && n.matches(q)) return n;
    } while (n = n.parentNode);
  }
  
  this.a = function(c){
    return c ? Array.prototype.slice.call(c) : c;
  }

  this.q = function(s, n){
    try{
      return (n || document).querySelector(s);
    }
    catch(e){
      return null;
    }
  }
  
  this.qq = function(s, n){
    try{
      var r = (n || document).querySelectorAll(s);
      return this.a(r);
    }
    catch(e){
      return [];
    }
  }
  
  this.b = function(nn, e, f){
    if(typeof nn === 'string') nn = this.qq(nn);
    else if(nn.tagName) nn = [nn];
    else nn = this.a(nn);
    if(nn && f) nn.forEach(n => e ? n.addEventListener(e, f.bind(this/*, n*/), false) : f.call(this, n));
  }
  
  this.e = function(nn, f){
    return this.b(nn, '', f);
  }
  
  this.attr = function(n, a, def){
    return (n && n.hasAttribute(a)) ? n.getAttribute(a) : (def || '');
  }
  
  //pos: -1=before, false=prepend, 0=append(default), 1=after
  this.ins = function(tag, t, attrs, n, pos) {
    var c = document.createElement(tag || 'span');
    if (t && t.tagName) c.appendChild(t);
    else if (t) c.innerHTML = t; //c.appendChild(document.createTextNode(t||''));
    if (attrs) {
      for (var i in attrs) {
        if(i.match(/-/)) c.setAttribute(i.replace(/^-/, ''), attrs[i]);
        else c[i] = attrs[i];
      }
    }
    return n
      ? (pos
        ? n.parentNode.insertBefore(c, pos<0 ? n : n.nextSibling)
        : (pos===false ? n.insertBefore(c, n.firstChild) : n.appendChild(c))
        )
      : c;
  }

  this.insClose = function(d, pos, cls){
    return this.ins('a', this.qs.iClose, {href: this.qs.hClose, className: this.qs.cClose + ' ' + (cls || '')}, d, pos);
  }
  
  //toggle
  
  this.vis = function(n){
    return !n.classList.contains(this.qs.cHide)
  }
  
  this.attachSubNav = function(n){
    //var a = n.previousElementSibling;
    var aa = this.a(n.parentNode.children).filter(v => v.tagName=='A');
    var a = aa.filter(v => !v.href)[0] || aa[0]
      || (this.ins('',' ',{},n.parentNode, false) && this.ins('a', this.qs.iToggle, {}, n.parentNode, false));
    if(a){
      if(!n.id) n.id = 'ul-' + this.seq();
      a.href = '#' + n.id;
    }
  }

  this.curDialog = function(){
    return this.q(this.qs.dlg+':not(.'+this.qs.cHide+')');
  }
  
  this.curGallery = function(){
    return this.q(this.qs.gal+':target');
  }
  
  this.afterAction = function(n){
    var d = this.curDialog();
    var g = d ? this.curGallery() : null;
    document.body.style.overflow = d || g ? 'hidden' : '';
    if(d){
      var f = this.q('input, a:not(.' + this.qs.cClose + ')', d);
      if(f) f.focus();
    }
  }
  
  this.onHash = function(e){
    if(location.hash){
      var d = this.q(location.hash);
      if(d && d.matches(this.qs.tgl)){
        this.unpop();
        this.toggle(d, true);
        if(!this.opt.keepHash) this.unhash();
        this.afterAction();
      }
    }
  }
  
  this.onKey = function(e){
    var k = e.keyCode;
    if(k==27){
      this.unpop();
      this.unhash();
      this.afterAction();
    }
  }
  
  //event delegation
  //https://gomakethings.com/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/
  this.onClick = function(e){
    var d = null;
    var n = e.target;
    var a = this.closest(n, 'a');
    var as = this.closest(n, 'a, input, button');
    var d = (a && a.matches('a[href^="#"]')) ? this.q(a.hash) : null;
    this.unpop([a, n, d]);
    if(n.matches(this.qs.gal)) this.prevImg(e);
    else if(d && d.matches(this.qs.tgl)){
      var d = this.q(a.hash);
      if(d && d.matches(this.qs.tgl)){
        e.preventDefault();
        d = this.toggle(d);
        if(this.vis(d) && this.opt.keepHash) this.addHistory(a.hash);
        else this.unhash();
      }
    }
    else if(as && as.matches(this.qs.alert+','+this.qs.dialog) && !this.curDialog() /*&& !(as.form && as.form.elements[this.qs.aConfirm])*/){
      //d = this.dialog(e, a, (n, v) => !console.log(v) && this.unpop()); //custom callback
      e.preventDefault();
      d = this.dialog(as);
    }
    else if(!d && !as){
      this.unhash();
    }
    this.afterAction(d);
  }

  //deep: -1=prepare, 0=click|hash, 1=deps|clo
  this.toggle = function(h, on, deep){
    var d = h ? (h.tagName ? h : this.q(h)) : null;
    if(d){
      if(d.matches(this.qs.tab) && on===undefined) on = true; //tabs: show instead of toggle
      //console.log('toggle '+d.id, on, deep);
      //d.classList.add('toggle');//anti:target
      this.prevWidth = window.innerWidth;
      d.classList[on ? 'remove' : (on===undefined ? 'toggle' : 'add')](this.qs.cHide);
      if(this.vis(d)) this.fixPosition(d);
      if(deep!=-1){
        if(!deep) this.toggleDependent(d);
        this.hiliteLinks(d);
        this.storeVisibility(d);
        //if(!deep) this.afterAction(d);
      }
    }
    return d;
  }
  
  this.tgl = function(d, on){
    if(d) d.classList[on ? 'remove' : (on===undefined ? 'toggle' : 'add')](this.qs.cHide);
  }
  
  this.toggleDependent = function(d){
    if(this.vis(d)){
      if(d.matches(this.qs.dlg)) this.e(this.qs.dlg, n => n==d ? null : this.toggle(n, false, 1)); //hide other dialogs
      else if(d.matches(this.qs.tab)) this.e(d.parentNode.children, n => n==d ? null : this.toggle(n, false, 1)); //hide sibling tabs
      else if(d.matches(this.qs.acco)) this.e(this.qq(this.qs.acco, this.closest(d, this.qs.acc)), n => n.contains(d) ? null : this.toggle(n, false, 1)); //hide other ul
    }
  }
  
  this.unpop = function(keep){
    if(keep && keep[0] && keep[0].hash==this.qs.hClose) keep = []; //to close all, even container
    this.e(this.qs.unpop, n => (keep && keep.filter(m => m && m.tagName && n.contains(m)).length) ? null : this.toggle(n, false, 1));
  }
  
  this.unhash = function(){
    //if(location.hash) location.hash = this.qs.hClose;
    this.addHistory(location.pathname + location.search);
  }
  
  this.addHistory = function(h) {
    history.pushState({}, '', h);
  //following required to re-render hash changes (test: open gallery, esc)
    history.pushState({}, '', h);
    history.go(-1);
  }

  this.storeVisibility = function(n){
    if(n.classList.contains(this.qs.cMem)){
      localStorage.setItem('vis#'+n.id, this.vis(n) ? 1 : -1);
    }
  }
  
  this.restoreVisibility = function(n){
    if(n.classList.contains(this.qs.cMem)){
      var v = localStorage.getItem('vis#'+n.id);
      if(v) this.toggle(n, v>0, -1);
    }
  }
  
  this.hiliteLinks = function(d){
    var op = this.vis(d) ? 'add' : 'remove';
    this.e('a[href="#'+d.id+'"]', a => a.classList[op]('act'));
  }
  
  this.fixPosition = function(n){
    var nav = n.matches(this.qs.nav);
    var ss = nav ? window.getComputedStyle(n.parentNode.parentNode) : null;
    var vert = ss ? (ss.display!='flex') : false;
    if(n.matches(this.qs.pop) || nav){
      var s = n.style;
      var p = n.parentNode;
      var i = p.nextElementSibling;
      var i = (i && i.tagName=='INPUT') ? i : null;
      var r = i || n.parentNode;
      if(r){
        s.right = 'auto';
        s.left = vert ? '100%' : 0;
        s.top = vert ? 0 : '100%';
        var qn = n.getBoundingClientRect();
        var qr = r.getBoundingClientRect();
        var dx = (qn.right > (this.prevWidth || window.innerWidth));
        var dy = (qn.bottom > window.innerHeight);
        //x
        if(vert) s.left = dx ? '3em' : '100%';
        else if(dx && qn.width > qr.width && qr.right > qn.width){
          //if(overflows-right && wider-then-container && enough-place-on-the-left) pop-left
          s.left = (qr.width - qn.width) + 'px';
        }
        else s.left = 0;
        //y
        if(vert) s.top = dx ? '90%' : 0;
        else if(dy && qr.top > qn.height){
          //if(overflows-bottom && enough-place-on-the-top) pop-top
          s.top = ((i ? -qr.height : 0) - qn.height) + 'px';
        }
        else s.top = '100%';
        if(i) p.style.verticalAlign = 'bottom';
      }
    }
  }

  this.prevImg = function(e) {
  var n = e.target;
    if(e.clientX < n.clientWidth / 3){
      var p = n.previousElementSibling || this.qq('a[id]', n.parentNode).pop();
      if(p.id){
        location.hash = '#' + p.id;
        e.preventDefault();
      }
    }
  }
  
  //dialog
  
  this.initDlg = function(n, h, t, f, def, rev){
    if(!this.dlg) this.dlg = this.ins('div', '', {className:'dlg toggle'}, document.body);
    var c, d = this.dlg;
    while(c=d.firstChild) d.removeChild(c);
    var hh = this.ins('div', '', {className: 'row bg'}, d);
    this.ins('h3', h || '', {className: 'let pad'}, hh);
    this.insClose(hh, 0, 'pad hover col-0');
    var b = this.ins('div', '', {className: 'pad'}, d);
    if(t) this.ins('div', t, {}, b);
    var inp = {value: true};
    if(def || def==='') inp = this.ins('input', '', {value: def}, b);
    var bb = this.ins('p', '', {className: 'r'}, b);
    var warn = this.qs.cBtn + ' ' + ((t.substr(0,1)==' ' || n.className.match(/-[we]\b/)) ? 'bg-e' : 'bg-y');
    var sec = this.qs.cBtn + ' bg-n';
    var yes = this.ins('a', this.attr(n, 'data-ok', this.qs.sOk), {href: this.qs.hClose, className: (rev ? sec : warn)}, bb);
    if(f){
      var no = this.ins('a', this.attr(n, 'data-cancel', this.qs.sCancel), {href: this.qs.hClose, className: (rev ? warn : sec)}, yes, rev ? -1 : 1);
      this.ins('', ' ', {}, yes, rev ? -1 : 1);
      yes.href = this.qs.hOk;
      this.b([yes], 'click', e => { e.preventDefault(); f.call(this, inp.value); });
      if(inp.tagName) this.b([inp], 'keyup', e => e.keyCode==13 ? f.call(this, inp.value, e) : null);
    }
    this.toggle(this.dlg, true);
  }
  
  
  this.dialog = function(n, f){
    if (n.form && !n.form.checkValidity()){
      n.form.reportValidity();
      return;
    }
    var p = this.attr(n, 'data-prompt');
    var t = this.attr(n, 'data-caption', n.title || p || '!');
    var rev = this.attr(n, 'data-reverse');
    var src = this.attr(n, 'data-src');
    src = src ? this.q(src) : null;
    if(!src && n.form) src = n.form.elements[p];
    var v = null;
    var al = n.matches(this.qs.alert);
    var def = p ? (src ? src.value : this.get(n, p)) : null;
    if(this.opt.dialog){
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
      this.ins('input', '', {type: 'hidden', name: this.qs.aConfirm, value: 1}, n.form);
      var i = n.form.elements[p] || this.ins('input', '', {type: 'hidden', name: p}, n.form);
      i.value = v;
      n.click();
    }
    //goto link
    else if(n.href){
      if(this.attr(n, 'href').substr(0, 1)=='#'){
        this.unpop()
        u = n.hash;
      }
      else{
        var a = {};
        a[this.qs.aConfirm] = 1;
        if(v!==true) a[p] = v;
        var u = this.makeUrl(n, a);
      }
      if(n.target=='_blank'){
        this.unpop();
        window.open(u, n.target);
      }
      else location.href = u;
    }
  }
  
  this.get = function(a, g){
    if(!a || a.tagName!='A') return null;
    var i, gets={};
    var args = a.search ? a.search.replace(/^\?/, '').split('&') : [];
    for(i=0;i<args.length;i++){
      var v = args[i].split('=');
      gets[v[0]] = decodeURIComponent(v[1]).replace(/\+/, ' ');
    }
    return g ? gets[g] : gets;
    //protocol, host (hostname,port), pathname, search, hash
  }
  
  this.makeUrl = function(a, args){
    var g = this.get(a);
    Object.keys(args).forEach(k => g[k] = args[k]);
    var q = Object.keys(g).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(g[k])).join('&');
    return a.protocol + '//' + a.host + a.pathname+(q ? '?' + q : '') + a.hash;
  }
  
})();

// end module
// var isNode    = (typeof module !== 'undefined' && this.module !== module); // use module or global
// var isBrowser = (typeof window !== 'undefined' && this.window === this);

    if (typeof module !== "undefined") {
      //console.log("npm require d1", module);
      module.exports = main;
    }
    else if (window) {
      //console.log("browser include d1");
      window.d1 = main;
    }
  }

})(window, document, Element);


d1.b([document], 'DOMContentLoaded', d1.init);

