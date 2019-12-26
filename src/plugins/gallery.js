/*! d1 gallery */

// Lighweight image gallery
// .gallery a.pic 

var d1 = require('../d1.js');

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
  
  this.init = function (opt) {
    d1.e(this.opt.qGallery, this.prepare.bind(this));
    d1.b([document], 'keydown', this.key.bind(this));
    d1.b([window], 'hashchange', this.loadTarget.bind(this));
    if(location.hash) this.loadTarget();
  }
  
  this.onClick = function(e){
    var n = e.target;
    if(n.matches(this.opt.qGal)){
      if(e.clientX > 0 /* not Enter key */ && e.clientX < n.clientWidth / 3){
        if(this.prevImg(n)) e.preventDefault();
      }
      return n;
    }
  }
  
  this.prevImg = function(n) {
    var p = n.previousElementSibling || d1.qq('a[id]', n.parentNode).pop();
    if(p.id) location.hash = '#' + p.id;
    return p.id;
  }
  
  this.loadTarget = function() {
    var n = d1.q(location.hash);
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
    var g = d1.ins('div', '', {className: this.opt.cGal});
    var a = n.querySelectorAll(this.opt.qLinks);
    var z = a.length;
    var first = 0;
    for(var i=0; i<z; i++) if(!a[i].vDone) {
      var s = d1.seq();
      if(!i) first = s;
      var p = d1.ins('a', '', {
          id: this.opt.idPrefix + s,
          href: '#' + this.opt.idPrefix + (i==z-1 ? first : s+1)
          }, g);
      //p.style.setProperty('--img', 'url("' + a[i].getAttribute('href') + '")');
      //p.style.backgroundImage = 'url("' + a[i].getAttribute('href') + '")';//preload all
      p.vLink = a[i].getAttribute('href');//real link
      p.vImg = a[i].getAttribute('href');//preload prev & next
      p.setAttribute(d1.opt.aCaption, (this.opt.num ? (i+1)+'/'+z+(a[i].title ? ' - ' : '') : '') + (a[i].title || ''));
      a[i].href = '#' + p.id;
      a[i].vDone = 1;
    }
    d1.insClose(g);
    d1.b(d1.qq('a[id]', g), 'click', d1.gotoPrev);
    document.querySelector('body').appendChild(g);
  }

   this.key = function(e) {
    if(location.hash) {
      var a = d1.q(location.hash);
      if(a && a.hash){
        var k = e.keyCode;
        if (k==37 || k==38) this.prevImg(a);
        else if (k==39 || k==40) location.hash = a.hash;//a.click();
        else if(k==8){
          var h = a.vLink;
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

  d1.plug(this);

})();