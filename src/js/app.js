/*! d1 app v0.0.0 */

// (() => {
//let main = new (function(){

module.exports = new (function(){

  this.sequence = 0;
  this.plugins = {};
  this.handlers = {};
  this.icons = {
    close: ['close', '&#x2715;'],//&times;
    menu:  ['menu',  '&equiv;'],
    add:   ['add',   '+'],
    edit:  ['edit',  '*'],
    ok:    ['ok',    '&check;'],//&#x2713;
    left:  ['left',  '&larr;'],
    right: ['right', '&rarr;'],
    up:    ['up',    '&uarr;'],
    down:  ['down',  '&darr;']
  };

  this.opt = {
    debug: 0,
    textIcons: false,
    aCaption: 'data-caption',
    cAct: 'act',
    cHide: 'hide',
    cToggle: 'toggle',
    cOff: 'off',
    cClose: 'close',
    cIcon: 'icon',
    cJs: 'js',
    hClose: '#cancel',
    hOk: '#ok',
    sCancel: 'Cancel',
    sOk: 'OK',
    pSvg: 'svg-', //prefix
  };

  this.init = function(opt){
    //options
    if(!opt){
      opt = this.attr(document.body, 'data-d1');
      if(opt) opt = JSON.parse(opt);
    }
    this.setOpt(this, opt);
    this.dbg(['opt', this.opt]);

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
    let i;
    if(opt) for(i in opt) if(i != 'plug') obj.opt[i] = opt[i];
  }

  this.plug = function(p) {
    this.plugins[p.name] = p;
  }

  this.initPlugins = function(opt){
    this.dbg(['plugins', this.plugins]);
    Object.keys(this.plugins).filter(p => !this.opt.disable || this.opt.disable.indexOf(p)==-1).forEach(k => {
        if(opt && opt.plug && opt.plug[k]) this.setOpt(this.plugins[k], opt.plug[k]);
        if(this.plugins[k].icons) Object.keys(this.plugins[k].icons).forEach(i => this.icons[i] = this.plugins[k].icons[i]);
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
    if(!n) return n;
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
      let r = (n || document).querySelectorAll(s);
      return this.a(r);
    }
    catch(e){
      return [];
    }
  }

  this.b = function(nn, et, f){
    if(typeof nn === 'string') nn = this.qq(nn);
    else if(nn.tagName) nn = [nn];
    else nn = this.a(nn);
    if(nn && f) nn.forEach(n => et ? n.addEventListener(et, e => f(e) /*f.bind(this)*/, false) : f.call(this, n));
  }

  this.e = function(nn, f){
    return this.b(nn, '', f);
  }

  this.attr = function(n, a, def){
    return (n && n.hasAttribute(a)) ? n.getAttribute(a) : (def !== undefined ? def : '');
  }

  //pos: -1=before, false=prepend, 0=append(default), 1=after
  this.ins = function(tag, t, attrs, n, pos) {
    let c = (tag===false && !(t && t.tagName))
      ? document.createTextNode(t || '')
      : document.createElement(tag || 'span');
      
    if (t && t.tagName) c.appendChild(t);
    else if (t && tag!==false) c.innerHTML = t;
    
    if (attrs && c.tagName) {
      for (let i in attrs) {
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
  
  this.clr = function(n){
    if(n) while(n.firstChild) n.removeChild(n.firstChild);
  }

  this.x = function(d, pos, cls){
    return this.ins('a', this.i('close'), {href: this.opt.hClose, className: (cls || '')}, d, pos);
  }

  this.svg = function(id, alt, c) {
    if (!id || this.opt.textIcons || !document.getElementById(id)) return this.ins('span', alt || '', {className: c || ''});
    return this.ins('span', '<svg class="' + this.opt.cIcon + ' ' + (c || '') + '" width="24" height="24"><use xlink:href="#' + id + '"></use></svg>');
  }
  
  this.i = function(ico, c) {
    //if(ico.constructor !== Array)
    if(typeof ico === 'string') ico = this.icons[ico] || [ico, ''];
    return this.svg(ico[0] ? this.opt.pSvg + ico[0] : '', ico[1] || '[' + ico[0] + ']', c);
  }

  this.vis = function(n){
    return !n.classList.contains(this.opt.cOff);
  }

  //func

  this.throttle = function(f, ms){
    let p = false, a;
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
    let i, gets={};
    let args = a.search ? a.search.replace(/^\?/, '').split('&') : [];
    for(i=0; i<args.length; i++){
      let v = args[i].split('=');
      gets[v[0]] = decodeURIComponent(v[1]).replace(/\+/, ' ');
    }
    return g ? gets[g] : gets;
    //protocol, host (hostname, port), pathname, search, hash
  }

  this.makeUrl = function(a, args){
    if(!a.tagName) a = this.ins('a', '', {href: a});
    let g = this.get(a);
    Object.keys(args).forEach(k => g[k] = args[k]);
    let q = Object.keys(g).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(g[k])).join('&');
    return a.protocol + '//' + a.host + a.pathname+(q ? '?' + q : '') + a.hash;
  }

})();

/*
if (this.window === this) window[main.name] = main;
else module.exports = main;
})();
*/