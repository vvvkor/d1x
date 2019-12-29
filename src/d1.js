/*! d1css v0.0.0 */

//require('../plugins/toggle.js'); 

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
  this.plugins = {};
  this.handlers = {};
  
  this.opt = {
    debug: 0,
    cHide: 'hide',
    aCaption: 'data-caption',
    cClose: 'close',
    cJs: 'js',
    hClose: '#cancel',
    hOk: '#ok',
    iClose: '&#x2715;', //&times;
    sCancel: 'Cancel',
    sOk: 'OK'
  };

  this.init = function(opt){
    //options
    if(!opt){
      opt = this.attr(document.body, 'data-d1');
      if(opt) opt = JSON.parse(opt);
    }
    this.setOpt(this, opt);
    
    this.initPlugins(opt); // plugins
    
    // bind events
    this.b([window], 'hashchange', e => this.on('hash', e));
    this.b([document], 'keydown', e => this.on('key', e));
    this.b([document], 'click', e => this.on('click', e));
    if(location.hash) this.on('hash')

    document.body.classList.add(this.opt.cJs); // prepare body: anti-hover, anti-target
    this.fire('after');
  }
  
  // event delegation
  // https://gomakethings.com/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/
  this.on = function(t, e){
    this.fire(t, e);
    this.fire(t + 'ed', e);
    this.fire('after', e);
  }
  
  //plugins
  
  this.setOpt = function(obj, opt){
    var i;
    if(opt) for(i in opt) obj.opt[i] = opt[i];
  }
  
  this.plug = function(p) {
    this.plugins[p.name] = p;
  }
  
  this.initPlugins = function(opt){
    Object.keys(this.plugins).forEach(k => {
        if(opt && opt.plug && opt.plug[k]) this.setOpt(this.plugins[k], opt.plug[k]);
        this.plugins[k].init();
    });
  }
  
  //events
  
  this.listen = function(t, f){
    if(!this.handlers[t]) this.handlers[t] = [];
    this.handlers[t].push(f);
  }
  
  this.fire = function(t, e){
    this.dbg(['fire ' + t, e]);
    if(this.handlers[t]) this.handlers[t].forEach(h => h.call(this, e));
  }
  
  //utils
  
  this.dbg = function(s, l, e){
    if(this.opt.debug >= (l || 1)) console[e ? 'error' : 'log'](s);
  }
  
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

  this.x = function(d, pos, cls){
    return this.ins('a', this.opt.iClose, {href: this.opt.hClose, className: (cls || '')}, d, pos);
  }
  
  this.vis = function(n){
    return !n.classList.contains(this.opt.cHide)
  }
  
  //func
  
  this.throttle = function(f, ms){
    var p = false, a;
    return function ff(){
      if (p) a = arguments; //2
      else{
        f.apply(null, arguments); //1
        p = true;
        setTimeout(() => { //3
          p = false;
          if(a){
            ff.apply(null, a);
            a = null;
          }
        }, ms);
      }
    }
  }
  
  // url
  
  this.get = function(a, g){
    if(!a || a.tagName!='A') return null;
    var i, gets={};
    var args = a.search ? a.search.replace(/^\?/, '').split('&') : [];
    for(i=0;i<args.length;i++){
      var v = args[i].split('=');
      gets[v[0]] = decodeURIComponent(v[1]).replace(/\+/, ' ');
    }
    return g ? gets[g] : gets;
    //protocol, host (hostname, port), pathname, search, hash
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
