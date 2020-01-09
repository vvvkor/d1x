/*! d1 example plugin */

// Interface components: dropdown, popup, toggle, modal dialog, tabs, drawer, tree, gallery
// .nav, .pop, .toggle, .dlg, .tabs, .drawer, .tree, .gal

let d1 = require('./d1.js');

module.exports = new(function () {

  "use strict";

  this.name = 'toggle';
  this.shown = null;

  this.opt = {
    keepHash: 1,

    qTgl: '.toggle[id]',
    qPop: '.pop>div[id]',
    qNav: '.nav.toggle ul',
    qDlg: '.dlg',
    qTab: '.tabs+div>[id]',
    qTre: 'ul.toggle:not(.nav) ul', //'.tree ul',
    qDrw: '.drawer',
    qAccRoot: 'ul.accordion',
    qAcc: 'ul.accordion ul',
    qGal: '.gal>a[id]', // dup of gallery.opt.qGal
    qSubMem: '.tabs.mem+div>[id], ul.mem:not(.nav) ul',
    qMedia: '.hide-mobile, .hide-desktop',
    qDrawer: '#menu',

    cMem: 'mem',
    cToggle : 'toggle',
    iToggle: ['open', '[+]']
  };

  this.init = function () {
    d1.listen('esc', e => this.esc(e));
    d1.listen('hash', e => this.onHash(e));
    d1.listen('key', e => this.onKey(e));
    d1.listen('click', e => this.onClick(e));
    d1.listen('clicked', e => this.unpop(e.target));
    d1.listen('after', e => this.after(e ? e.target : null));
    //toggle
    let q = this.opt;
    this.opt.qToggle = [q.qTgl, q.qPop, q.qNav, q.qDlg, q.qTab, q.qTre, q.qDrw, q.qMedia/*, q.qGal*/].join(', ');
    this.opt.qAutohide = [q.qPop, q.qNav, q.qDlg, q.qTab, q.qAcc, q.qDrw, q.qMedia/*, q.qGal*/].join(', ');
    this.opt.qUnpop = [q.qPop, q.qNav, q.qDlg, q.qDrw/*, q.qGal*/].join(', ');
    d1.e(this.opt.qToggle, n => n.classList.add(this.opt.cToggle)); //initialize togglers
    d1.e(this.opt.qAutohide, n => this.tgl(n, 0)); //autohide

    d1.e(this.opt.qNav + ', ' + this.opt.qTre, n => this.attachSubNav(n)); //nav, tree: attach to links
    d1.e(this.opt.qGal + ':last-child', n => d1.x(n, 1));//gal: auto add close link
    d1.e(this.opt.qSubMem, n => n.classList.add(this.opt.cMem)); //initialize sub mem
    d1.e('[id]', n => this.restoreVisibility(n));//restore visibility
    d1.e(this.opt.qTab + ':not(.hide) ~ [id]:not(.hide)', n => this.tgl(n, 0)); //undup tabs
    d1.e(this.opt.qTab + ':first-child', n => d1.a(n.parentNode.children).filter(m => d1.vis(m)).length ? null : this.tgl(d1.q(d1.q('a[href^="#"]', n.parentNode.previousElementSibling).hash), 1));//inactive tabs: show first
    d1.e('.' + this.opt.cToggle + '[id]', n => this.hiliteLinks(n));//init links state
  }

  this.after = function(n){
    this.shown = null;
    //let modal = d1.q(this.opt.qDlg+':not(.'+d1.opt.cHide+'), '+this.opt.qGal+':target'); // :target not updated after Esc key
    let modal = d1.q(this.opt.qDlg+':not(.'+d1.opt.cHide+'), '+this.opt.qGal+'[id="' + location.hash.substr(1) + '"]');
    let bar = window.innerWidth - document.documentElement.clientWidth; //scroll bar width
    let s = document.body.style;
    s.overflow = modal ? 'hidden' : '';
    if(!(modal && s.paddingRight)) s.paddingRight = modal ? '' + bar + 'px' : ''; // avoid width reflow
    d1.dbg(['after', n, modal, s.paddingRight]);
    if(modal){
      //let f = d1.q('input, a:not(.' + d1.opt.cClose + ')', modal);
      let f = d1.q('input, a:not([href="' + d1.opt.hClose + '"])', modal);
      if(f) f.focus();
    }
  }

  this.esc = function(e){
    if(e) e.preventDefault();
    this.unpop();
    this.unhash();
    this.after();
  }

  this.onHash = function(e){
    d1.dbg(['hash', location.hash]);
    if(location.hash===d1.opt.hClose) d1.fire('esc', e);
    else if(location.hash){
      let d = d1.q(location.hash);
      if(d){
        let t = d.matches(this.opt.qTgl);
        let g = d.matches(this.opt.qGal);
        if(t){
          this.unpop();
          this.toggle(d, true);
          if(!this.opt.keepHash) this.unhash();
        }
        if(t || g) this.after();
        else this.unpop();//d1.fire('esc', e);
      }
    }
  }

  this.onKey = function(e){
    let k = e.keyCode;
    d1.dbg(['key', k]);
    if(k==27) d1.fire('esc', e);
  }

  this.onClick = function(e){
    let n = e.target;
    let a = d1.closest(n, 'a');
    let d = (a && a.matches('a[href^="#"]')) ? d1.q(a.hash) : null;

    if(a && a.hash===d1.opt.hClose) d1.fire('esc', e);
    else if(d && d.matches(this.opt.qTgl)){
      e.preventDefault();
      d = this.toggle(d);
      if(d1.vis(d) && this.opt.keepHash) this.addHistory(a.hash);
      else this.unhash();
      return d;
    }
    else if(!a){
      this.unhash();
    }
    if(e.clientX<=5 && e.clientY>5 && this.opt.qDrawer) this.toggle(this.opt.qDrawer);
  }

  this.attachSubNav = function(n){
    //let a = n.previousElementSibling;
    let aa = d1.a(n.parentNode.children).filter(v => v.tagName=='A');
    let a = aa.filter(v => !v.href)[0] || aa[0]
      || (d1.ins('',' ',{},n.parentNode, false) && d1.ins('a', d1.i(this.opt.iToggle), {}, n.parentNode, false));
    if(a){
      if(!n.id) n.id = 'ul-' + d1.seq();
      a.href = '#' + n.id;
    }
  }

  //deep: -1=prepare, 0=click|hash, 1=deps|clo
  this.toggle = function(h, on, deep){
    let d = h ? (h.tagName ? h : d1.q(h)) : null;
    if(d){
      if(d.matches(this.opt.qTab) && on===undefined) on = true; //tabs: show instead of toggle
      //console.log('toggle '+d.id, on, deep);
      d.classList[on ? 'remove' : (on===undefined ? 'toggle' : 'add')](d1.opt.cHide);
      d1.dbg(['toggle' + (deep ? ' deep' : ''), on, d], deep ? 2 : 1);
      if(d1.vis(d)){
        this.fixPosition(d);
        if(!deep) this.shown = d;
      }
      if(deep!=-1){
        if(!deep) this.toggleDependent(d);
        this.hiliteLinks(d);
        this.storeVisibility(d);
        //if(!deep) this.after(d);
      }
    }
    return d;
  }

  this.tgl = function(d, on){
    if(d) d.classList[on ? 'remove' : (on===undefined ? 'toggle' : 'add')](d1.opt.cHide);
  }

  this.toggleDependent = function(d){
    if(d1.vis(d)){
      if(d.matches(this.opt.qDlg)) d1.e(this.opt.qDlg, n => n==d ? null : this.toggle(n, false, 1)); //hide other dialogs
      else if(d.matches(this.opt.qTab)) d1.e(d.parentNode.children, n => n==d ? null : this.toggle(n, false, 1)); //hide sibling tabs
      else if(d.matches(this.opt.qAcc)) d1.e(d1.qq(this.opt.qAcc, d1.closest(d, this.opt.qAccRoot)), n => n.contains(d) ? null : this.toggle(n, false, 1)); //hide other ul
    }
  }

  this.unpop = function(x){
    let keep = [x];
    keep.push(this.shown);
    let a = x ? d1.closest(x, 'a') : null;
    if(a && a.hash){
      //if(a.hash==d1.opt.hClose) keep = []; //to close all, even container
      //else
        keep.push(d1.q(a.hash));
    }
    d1.dbg(['unpop', keep]);
    d1.e(this.opt.qUnpop, n => (keep && keep.filter(m => m && m.tagName && n.contains(m)).length) ? null : this.toggle(n, false, 1));
  }

  this.unhash = function(){
    //v1.
    if(location.hash) location.hash = d1.opt.hClose;
    //v2.
    this.addHistory(location.pathname + location.search /* + d1.opt.hClose*/);
  }

  this.addHistory = function(h) {
    history.pushState({}, '', h);
    //following required to re-render hash changes (test: open gallery, esc)
    //history.pushState({}, '', h);
    //history.go(-1);
  }

  this.storeVisibility = function(n){
    if(n.classList.contains(this.opt.cMem)){
      localStorage.setItem('vis#'+n.id, d1.vis(n) ? 1 : -1);
    }
  }

  this.restoreVisibility = function(n){
    if(n.classList.contains(this.opt.cMem)){
      let v = localStorage.getItem('vis#'+n.id);
      if(v) this.toggle(n, v>0, -1);
    }
  }

  this.hiliteLinks = function(d){
    let op = d1.vis(d) ? 'add' : 'remove';
    d1.e('a[href="#'+d.id+'"]', a => a.classList[op](d1.opt.cAct));
  }

  this.fixPosition = function(n){
    let nav = n.matches(this.opt.qNav);
    let ss = nav ? window.getComputedStyle(n.parentNode.parentNode) : null;
    let vert = ss ? (ss.display!='flex') : false;
    if(n.matches(this.opt.qPop) || nav){
      let s = n.style;
      let p = n.parentNode;
      let i = p.nextElementSibling;
      i = (i && i.tagName=='INPUT') ? i : null;
      let r = i || n.parentNode;
      if(r){
        s.right = 'auto';
        s.left = vert ? '100%' : 0;
        s.top = vert ? 0 : '100%';
        let qn = n.getBoundingClientRect();
        let qr = r.getBoundingClientRect();
        let dx = (qn.right > window.innerWidth);
        let dy = (qn.bottom > window.innerHeight);
        let wide = (qr.width > 300);
        //x
        if(vert) s.left = (dx || wide) ? '3em' : '100%';
        else if(dx && qn.width > qr.width && qr.right > qn.width){
          //if(overflows-right && wider-then-container && enough-place-on-the-left) pop-left
          s.left = (qr.width - qn.width) + 'px';
        }
        else s.left = 0;
        //y
        if(vert) s.top = (dx || wide) ? '90%' : 0;
        else if(dy && qr.top > qn.height){
          //if(overflows-bottom && enough-place-on-the-top) pop-top
          s.top = ((i ? -qr.height : 0) - qn.height) + 'px';
        }
        else s.top = '100%';
        if(i) p.style.verticalAlign = 'bottom';
      }
    }
  }

  //d1.plug(this);

})();
