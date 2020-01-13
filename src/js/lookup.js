/*! d1 autocomplete lookups with data from XHTTP request */

let d1 = require('./d1.js');
//require('./toggle.js');
//require('./fetch.js');

module.exports = new(function () {

  "use strict";

  this.name = 'lookup';

  this.icons = {
    goto: ['', '&rarr;']
  };

  this.opt = {
    aLabel: 'data-label',
    aLookup: 'data-lookup',
    aUrl: 'data-url',
    aGoto: 'data-goto',
    cacheLimit: 0,
    pList: 'lookup-list-',
    max: 10,
    wait: 300,
    inPop: 0
  };
  
  this.seq = 0;
  this.win = null;

  this.init = function() {
    this.win = d1.ins('div', '', {id: this.opt.pList + d1.seq(), className: d1.opt.cToggle + ' ' + d1.opt.cOff});
    this.closeList();
    document.body.appendChild(this.win);

    d1.e('[' + this.opt.aLookup + ']', n => this.prepare(n));
    d1.b('[data-chain]', 'change', e => this.updateChain(e.target));
    d1.e('[data-chain]', n => this.updateChain(n));
    d1.listen('key', e => this.onKey(e))
  }

  this.prepare = function(n) {
    let pop = d1.ins('div', '', {className: 'pop l'}, n, 1);
    if(!this.opt.inPop) pop.style.verticalAlign = 'bottom';
    n.thePop = pop;
    n.classList.add('bg-n');
    n.classList.add(d1.opt.cHide);
    //n.type = 'hidden';
    n.vLabel = d1.attr(n, this.opt.aLabel) || n.value || '';//@@
    let m = d1.ins('input', '', {type: 'text', value: n.vLabel, className:'input-lookup subinput'}, pop, this.opt.inPop ? 0 : 1);
    m.name = 'lookup-' + n.name;
    //m.required = n.required;
    //n.required = false;
    if(n.id) {
      m.id = 'lookup-' + n.id;
      if(n.title) m.title = n.title;
      d1.e('[for="' + n.id + '"]', lbl => lbl.htmlFor = m.id);
    }
    if(n.placeholder) m.placeholder = n.placeholder;
    m.autocomplete = 'off';
    let i = null;
    if(d1.attr(n, this.opt.aUrl)){
      let ic = d1.ins('span', '', {className:'input-tools'}, this.opt.inPop ? pop : m, 1);//icons container
      i = d1.ins('a', d1.i('goto'), {}, ic);
      i.style.cursor = 'pointer';
      d1.ins('', ' ', {}, ic, -1);
    }
    this.setHandlers(n, m, i);
  }
  
  this.setHandlers = function(n, m, i) {
    n.vCap = m;//todo: avoid
    m.vId = n;//todo: avoid
    d1.b(m, 'input', e => this.planFind(n, 0), false);
    if(i) d1.b(i, 'click', e => this.go(n, e), false);
  }
  
  this.planFind = function(n, now){
    if(n.vCap.value===''){
      this.fix(n, '', '');
    }
    else{
      this.seq++;
      n.vSeq = this.seq;
      if(n.vWait) clearTimeout(n.vWait);
      if(n.vCache && n.vCache[n.vCap.value]) this.openList(n, n.vCache[n.vCap.value]);
      else n.vWait = setTimeout(this.find.bind(this, n), now ? 0 : this.opt.wait);
    }
  }
  
  this.find = function(n){
    let u = encodeURI(decodeURI(d1.makeUrl(d1.attr(n, this.opt.aLookup), {
        //value: n.vCap.value,
        seq: this.seq,
        time: (new Date()).getTime()
    })).replace(/\{q\}/, n.vCap.value));
    n.vCur = null;
    d1.plugins.fetch.fetch(u, this.list.bind(this, n.vCap.value, this.seq, n));
  }
  
  this.list = function(u, seq, n, req){
    let d = JSON.parse(req.responseText);
    if(seq==n.vSeq) this.openList(n, d.data);
    this.store(n, u, d);
  }

  this.openList = function(n, d, e){
    if(e) e.stopPropagation();
    this.closeList();
    let pop = n.thePop;
    pop.appendChild(this.win);//.pop
    this.win.vRel = n.vCap;
    d1.plugins.toggle.toggle(this.win, true);
    this.build(n, d);
    d1.plugins.toggle.shown = null;
  }
  
  this.closeList = function(){
    d1.plugins.toggle.toggle(this.win, false);
  }
  
  this.build = function(n, d){
    while(this.win.firstChild) this.win.removeChild(this.win.firstChild);
    let ul = d1.ins('ul', '', {className: 'nav let hover'}, this.win);
    let w, j = 0;
    let go = d1.attr(n, this.opt.aGoto);
    for(let i in d){
      w = d1.ins('li', '', {}, ul);
      let a = d1.ins('a', '', {href: go ? go.replace(/\{id\}/, d[i].id) : '#' + d[i].id, className: '-pad -hover'}, w);
      d1.ins('span', d[i].nm, {}, a);
      if(d[i].info){
        d1.ins('br', '', {}, a);
        d1.ins('small', d[i].info, {className: 'text-n'}, a);
      }
      if(!go) d1.b(a, 'click', e => this.choose(n, a, e), false);
      j++;
      if(j >= this.opt.max) break;
    }
    if(ul.firstChild) this.hilite(n, ul.firstChild.firstChild);
  }
  
  this.hilite = function(n, a){
    if(n.vCur) n.vCur.classList.remove(d1.opt.cAct);
    a.classList.add(d1.opt.cAct);
    n.vCur = a;
  }
  
  this.hiliteNext = function(n, prev){
    if(n.vCur) {
      let a = n.vCur.parentNode[prev ? 'previousSibling' : 'nextSibling'];
      if(!a) a = n.vCur.parentNode.parentNode[prev ? 'lastChild' : 'firstChild'];
      a = a.firstChild;
      this.hilite(n, a);
    }
  }
  
  this.choose = function(n, a, e){
    if(e) e.preventDefault();
    n.vCur = a;
    this.fix(n, a.hash.substr(1), a.firstChild.textContent);
  }
  
  this.fix = function(n, v, c){
    n.vCur = null;
    n.vSeq = 0;
    if(n.vWait) clearTimeout(n.vWait);
    n.value = v;
    n.vLabel = n.vCap.value = c;
    if(typeof(Event) === 'function') n.dispatchEvent(new Event('input'));//-ie
    this.closeList();
  }
  
  this.onKey = function(e){
    let n = e.target.vId;
    if(n){
      if(e.keyCode == 27) this.fix(n, n.value, n.vLabel);
      else if(e.keyCode == 40 && !d1.vis(this.win)) this.planFind(n, 1);
      else if(e.keyCode == 38 || e.keyCode == 40) this.hiliteNext(n, e.keyCode == 38);
      //else if(e.keyCode == 13) this.choose(n, n.vCur);
      else if(e.keyCode == 13 && n.vCur){
        if(d1.vis(this.win)) e.preventDefault();
        n.vCur.click();
      }
    }
  }
  
  this.go = function(n, e){
    e.preventDefault();
    let u = d1.attr(n, this.opt.aUrl);
    if(n.value.length>0 && u) location.href = encodeURI(decodeURI(u).replace(/\{id\}/, n.value));
  }

  // update chain
  
  this.updateChain = function(n){
    let m = d1.q(d1.attr(n, 'data-chain'),0);
    if(m){
      if(!n.value) this.setOptions(m,[]);
      else{
        let u = d1.attr(m, 'data-filter').replace(/\{q\}/,n.value);
        if(m.vCache && m.vCache[u]) this.setOptions(m,m.vCache[u]);
        else d1.plugins.fetch.fetch(u, this.onChainData.bind(this, u, m));
      }
    }
  }
  
  this.onChainData = function(u, n, req){
    let d = JSON.parse(req.responseText);
    this.setOptions(n, d.data);
    this.store(n, u, d);
  }

  this.setOptions = function(n,a){
    while(n.firstChild) n.removeChild(n.firstChild);
    let z = d1.attr(n, 'data-placeholder') || '';
    if(!a || a.length==0 || z) d1.ins('option',z||'-',{value:''},n);
    if(a) for(let i=0;i<a.length;i++) d1.ins('option',a[i].nm,{value:a[i].id},n);
  }
  
  this.store = function(n,u,d){
    let c = d1.attr(n, 'data-cache');
    if(c===undefined) c = this.opt.cacheLimit;
    c = parseInt(c, 10);
    if(c){
      if(!n.vCache || Object.keys(n.vCache).length>=c) n.vCache = {};
      if(d) n.vCache[u] = d.data;
    }
  }

})();