/*! d1 gallery */

// Lighweight image gallery
// .gallery a.pic 

let d1 = require('./d1.js');

module.exports = new(function () {

  "use strict";

  this.name = 'gallery';
  
  this.opt = {
    idPrefix: 'pic-',
    num: true,
    cGal: 'gal',
    qGal: '.gal>a[id]', // dup of toggle.opt.qGal
    qGallery: '.gallery',
    qLinks: 'a.pic'
  };
  
  this.init = function () {
    d1.listen('hash', e => this.onHash(e));
    d1.listen('key', e => this.onKey(e));
    d1.listen('click', e => this.onClick(e));
    d1.e(this.opt.qGallery, n => this.prepare(n));
  }
  
  this.onClick = function(e){
    let n = e.target;
    if(n.matches(this.opt.qGal)){
      if(e.clientX > 0 /* not Enter key */ && e.clientX < n.clientWidth / 3){
        if(this.prevImg(n)) e.preventDefault();
      }
      //return n;
    }
  }
  
  this.prevImg = function(n) {
    let p = n.previousElementSibling || d1.qq('a[id]', n.parentNode).pop();
    if(p.id) location.hash = '#' + p.id;
    return p.id;
  }
  
  this.onHash = function() {
    let n = d1.q(location.hash);
    if(n) {
      this.loadImg(n);
      this.loadImg(d1.q(n.hash));
    }
  }
  
  this.loadImg = function(n){
    if(n && n.vImg){
      n.style.backgroundImage = 'url("' + n.vImg + '")';
      n.vImg = '';
    }
  }
  
  this.prepare = function (n) {
    let g = d1.ins('div', '', {className: this.opt.cGal});
    let a = d1.qq(this.opt.qLinks, n);
    let z = a.length;
    let first = 0;
    for(let i=0; i<z; i++) if(!a[i].vDone) {
      let s = d1.seq();
      if(!i) first = s;
      let p = d1.ins('a', '', {
          id: this.opt.idPrefix + s,
          href: '#' + this.opt.idPrefix + (i==z-1 ? first : s+1)
          }, g);
      //p.style.setProperty('--img', 'url("' + d1.attr(a[i], 'href') + '")');
      //p.style.backgroundImage = 'url("' + d1.attr(a[i], 'href') + '")';//preload all
      p.vLink = d1.attr(a[i], 'href');//real link
      p.vImg = d1.attr(a[i], 'href');//preload prev & next
      p.setAttribute(d1.opt.aCaption, (this.opt.num ? (i+1)+'/'+z+(a[i].title ? ' - ' : '') : '') + (a[i].title || ''));
      a[i].href = '#' + p.id;
      a[i].vDone = 1;
    }
    d1.x(g);
    d1.b(d1.qq('a[id]', g), 'click', d1.gotoPrev);
    document.body.appendChild(g);
  }

  this.onKey = function(e) {
    if(location.hash) {
      let a = d1.q(location.hash);
      if(a && a.hash){
        let k = e.keyCode;
        if (k==37 || k==38) this.prevImg(a);
        else if (k==39 || k==40) location.hash = a.hash;//a.click();
        else if(k==8){
          let h = a.vLink;
          if(!h){
            h = window.getComputedStyle(a).backgroundImage;
            h = h.substring(4, h.length-1).replace(/^"|"$/g, '');
          }
          if(h) location.href = h;
        }
        //e.preventDefault();
      }
    }
  }

})();