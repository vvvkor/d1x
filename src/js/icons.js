/*! icons - include svg icons */

let app = require('./app.js');

module.exports = new(function () {

  "use strict";

  this.name = 'icons';

  this.opt = {
    cIcon: 'icon',
    cLine: 'line',
    ns: 'xmlns="http://www.w3.org/2000/svg"',
    iconSize: 24,
    pSvg: 'svg-', //prefix
    aReplace: 'data-ico',
    aAdd: 'data-icon'
  };
  
  this.parsed = {};
  this.icons = {
    //find: '# M10,50l40,40 40,-80 -40,60z', // path (#x# or 100x100)
    //open: '<svg viewBox="0 0 100 100"><path d="M10,50l40,40 40,-80 -40,0z"/></svg>' // svg
    add: '7 M3 1h1v2h2v1h-2v2h-1v-2h-2v-1h2z',//7
    close: '20 M5 3l5 5 5-5 2 2-5 5 5 5-2 2-5-5-5 5-2-2 5-5-5-5z',
    config: '7 M2 3l1-1-1-1 q1.5 .2 2 1v1l2 2q-.2.8 -1 1l-2-2h-1q-.8-.5-1-2z',
    edit: '10 M7 1q1.6 .4 2 2l-5 5-3 1 1-3zM2.3 6.3l-.5 1.5.4.4 1.5-.5z',
    find: '10 M4 1a3 3 0 1 0 .01 0zm0 1a2 2 0 1 1-.01 0m2 3l-1 1 3 3 1-1z',
    left: '10 M6 1l1 1-3 3 3 3-1 1-4-4z',
    menu: '7 M1 1h5v1h-5zm0 2h5v1h-5zm0 2h5v1h-5z',
    ok: '8 M.8 4l1-1 1.5 1.5 3-3 1 1-4 4z',
    place: '10 M2 4a3 3 0 0 1 6 0q0 2 -3 5q-3-3-3-5zm3 -2a2 2 0 1 0 .01 0z',
    right: '10 M4 1l4 4-4 4-1-1 3-3-3-3z',
    user: '8 M4 1a1.7 2.2 0 1 0 .01 0m-3 5.5q3 1 6 0-3 -2.5 -6 0z',
    
    // https://github.com/danklammer/bytesize-icons
    // outline icons; must end with space; class="icon line"
    heart: '32 M4 16 C1 12 2 6 7 4 12 2 15 6 16 8 17 6 21 2 26 4 31 6 31 12 28 16 25 20 16 28 16 28 16 28 7 20 4 16Z ',
    message: '32 M2 4 L30 4 30 22 16 22 8 29 8 22 2 22Z ',
    mail: '32 M2 26 L30 26 30 6 2 6 Z M2 6 L16 16 30 6 ',
    home: '32 M12 20 L12 30 4 30 4 12 16 2 28 12 28 30 20 30 20 20Z ',
    login: '32 M3 16 L23 16 M15 8 L23 16 15 24 M21 4 L29 4 29 28 21 28 ',
    logout: '32 M28 16 L8 16 M20 8 L28 16 20 24 M11 28 L3 28 3 4 11 4 ',
    file: '32 M6 2 L6 30 26 30 26 10 18 2 Z M18 2 L18 10 26 10 ',
    folder: '32 M2 26 L30 26 30 7 14 7 10 4 2 4Z ',
    date: '32 M2 6 L2 30 30 30 30 6 Z M2 15 L30 15 M7 3 L7 9 M13 3 L13 9 M19 3 L19 9 M25 3 L25 9 ',
    upload: '32 M28 22 L28 30 4 30 4 22 M16 4 L16 24 M8 12 L16 4 24 12 ',
    download: '32 M28 22 L28 30 4 30 4 22 M16 4 L16 24 M8 16 L16 24 24 16 ',
    send: '32 M2 16 L30 2 16 30 12 20 Z M30 2 L12 20 ',
    link: '32 M18 8 C18 8 24 2 27 5 30 8 29 12 24 16 19 20 16 21 14 17 M14 24 C14 24 8 30 5 27 2 24 3 20 8 16 13 12 16 11 18 15 ',
    options: '32 M28 6 L4 6 M28 16 L4 16 M28 26 L4 26 M24 3 L24 9 M8 13 L8 19 M20 23 L20 29 ',
    star: '32 M16 2 L20 12 30 12 22 19 25 30 16 23 7 30 10 19 2 12 12 12Z ',
    warning: '32 M16 3 L30 29 2 29 Z M16 11 L16 19 M16 23 L16 25 ',
    refresh: '32 M29 16 C29 22 24 29 16 29 8 29 3 22 3 16 3 10 8 3 16 3 21 3 25 6 27 9 M20 10 L27 9 28 2 ',
    // not single path
    more: '<svg viewBox="0 0 32 32"><circle cx="16" cy="7" r="2"/><circle cx="16" cy="16" r="2"/><circle cx="16" cy="25" r="2"/></svg> ',
    info: '<svg viewBox="0 0 32 32"><path d="M16 14 L16 23 M16 8 L16 10"/><circle cx="16" cy="16" r="14"/></svg> ',
    clock: '<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="14"/><path d="M16 8 L16 16 20 20"/></svg> ',
    photo: '<svg viewBox="0 0 32 32"><path d="M20 24 L12 16 2 26 2 2 30 2 30 24 M16 20 L22 14 30 22 30 30 2 30 2 24"/><circle cx="10" cy="9" r="3"/></svg> ',
    lock: '<svg viewBox="0 0 32 32"><path d="M5 15 L5 30 27 30 27 15 Z M9 15 C9 9 9 5 16 5 23 5 23 9 23 15 M16 20 L16 23"/><circle cx="16" cy="24" r="1"/></svg> ',
    search: '<svg viewBox="0 0 32 32"><circle cx="14" cy="14" r="12" /><path d="M23 23 L30 30"  /></svg> '
  };
  
  this.init = function () {
    app.e('[' + this.opt.aReplace + ']',  n => this.addIcon(app.attr(n, this.opt.aReplace), n, true));
    app.e('[' + this.opt.aAdd + ']', n => this.addIcon(app.attr(n, this.opt.aAdd), n));
  }

  this.addIcon = function(i, n, clr){
    let t = n.textContent;
    let icon = this.i(i);
    if(icon){
      if(clr){
        app.clr(n);
        if(!n.title) n.title = t;
      }
      if(n.firstChild) n.insertBefore(document.createTextNode(' '), n.firstChild);
      n.insertBefore(icon, n.firstChild);
    }
  }

  this.i = function(ico, alt){
    let a = ico.split(/\//);
    ico = a[0];
    if(this.parsed[ico] === undefined){
      let svg = this.icons[ico];
      let line = svg && (svg.substr(-1) === ' ');
      app.dbg(['svg', ico, line, svg]);
      if(!svg){
        let id = this.opt.pSvg + ico;
        if(document.getElementById(id)) svg = '<svg ' + this.opt.ns + '><use xlink:href="#' + id + '"></use></svg>'; // from page
        else svg = ''; // none
      }
      else if(!svg.match(/</)){
        let m = svg.match(/^(\d+)/);
        let w = m ? m[1] : 100;
        svg = '<svg ' + this.opt.ns + ' viewBox="0 0 ' + w + ' ' + w + '"><path d="' + svg.replace(/^[\d\s]*/, '') + '"/></svg>'; // from array
      }

      let n;
      if(svg){
        let div = document.createElement('div');
        div.innerHTML = svg;
        n = div.firstChild;
        if(!app.attr(n, 'width'))  n.setAttribute('width', this.opt.iconSize);
        if(!app.attr(n, 'height')) n.setAttribute('height', this.opt.iconSize);
        if(!app.attr(n, 'class'))  n.setAttribute('class', this.opt.cIcon + (line ? ' ' + this.opt.cLine : ''));
      }
      else n = '';
      this.parsed[ico] = n;
    }
    return this.parsed[ico]
      ? this.prepareSvg(this.parsed[ico].cloneNode(true), a.slice(1))
      : (alt
        ? app.ins('span', alt)
        : null
        );
  }
  
  this.prepareSvg = function(n, a){
    if(a[0]) n.setAttribute('width', a[0]);
    if(a[1]) n.setAttribute('height', a[1]);
    if(a.length>0) n.setAttribute('class', a[2] || '');
    return n;
  }

})();