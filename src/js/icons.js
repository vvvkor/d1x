/*! icons - include svg icons */

let app = require('./app.js');

module.exports = new(function () {

  "use strict";

  this.name = 'icons';

  this.opt = {
    cIcon: 'icon',
    //cLine: 'line',
    //ns: 'xmlns="http://www.w3.org/2000/svg"',
    iconSize: 24,
    pSvg: 'svg-', //prefix
    aReplace: 'data-ico',
    aAdd: 'data-icon'
  };
  
  this.parsed = {};
  this.icons = {
    menu: [7, 'M.5 1h6v1h-6zm0 2h6v1h-6zm0 2h6v1h-6z'],
    sort: [7, 'M1 1h2v1h-2zm0 2h3.5v1h-3.5zm0 2h5v1h-5z'],
    more: [17, 'M7 2h3v3h-3zm0 5h3v3h-3zm0 5h3v3h-3z'],
    grid: [7, 'M1 1h2v2h-2zM4 1h2v2h-2zM1 4h2v2h-2zM4 4h2v2h-2z'],
  
    home: [10, 'M1 5h1v4h2v-3h2v3h2v-4h1l-4-4z'],
    user: [10, 'M5 9C13 -1.5 -3 -1.5 5 9zM1 8.5q4 1 8 0-4 -3 -8 0z'],
    exit: [7, ''],
    close: [12, 'M2 1l4 4 4-4 1 1-4 4 4 4-1 1-4-4-4 4-1-1 4-4-4-4z'],
  
    find: [12, 'M5 1a4 4 0 1 0 .01 0zm0 1a3 3 0 1 1-.01 0m3 5l-1 1 3 3 1-1z'],
    folder: [12, 'M1 1.5h4l1 2h5v7h-10zm1 3v5h8v-5z'],
    file: [7, ''],
    attach: [7, ''],
  
    edit: [10, 'M7 1q1.6 .4 2 2l-5 5-3 1 1-3zM2.3 6.3l-.5 1.5.4.4 1.5-.5z'],
    plus: [7, 'M3 1h1v2h2v1h-2v2h-1v-2h-2v-1h2z'],
    delete: [20, 'M5 3l5 5 5-5 2 2-5 5 5 5-2 2-5-5-5 5-2-2 5-5-5-5z'],
    check: [100, 'M10 48l11-9 18 22 40-50 11 9-51 65z'],
  
    gear: [20, 'M18.4,12.2 L16.2,16.2 C15.3,15.4 14.1,15.2 13.3,15.7 C12.4,16.2 12.0,17.3 12.2,18.5 L7.7,18.5 C7.9,17.3 7.5,16.2 6.6,15.7 C5.8,15.3 4.6,15.4 3.7,16.2 L1.5,12.2 C2.5,11.8 3.3,10.9 3.3,9.9 C3.3,9 2.5,8.1 1.5,7.7 L3.7,3.7 C4.6,4.5 5.7,4.7 6.6,4.2 C7.5,3.7 7.9,2.6 7.7,1.5 L12.2,1.5 C12.0,2.6 12.4,3.7 13.3,4.2 C14.2,4.7 15.3,4.5 16.2,3.7 L18.4,7.7 C17.4,8.1 16.6,8.9 16.7,10.0 C16.6,11.0 17.4,11.9 18.4,12.2 L18.4,12.2 zM10 6.5a3.5 3.5 0 1 0 .01 0z'],
    pin: [10, 'M2 4a3 3 0 0 1 6 0q0 2 -3 5q-3-3-3-5zm3 -2a2 2 0 1 0 .01 0z'],
    refresh: [20, 'M10 1.5v3a7 7 0 1 0 7 7h-2a5 5 0 1 1-5-5v3l5-4z'],
    help: [7, ''],

    north: [10, 'M1 6l4-4 4 4-1 1-3-3-3 3z'],
    south: [10, 'M1 4l4 4 4-4-1-1-3 3-3-3z'],
    west: [10, 'M6 1l1 1-3 3 3 3-1 1-4-4z'],
    east: [10, 'M4 1l4 4-4 4-1-1 3-3-3-3z'],

    up:   [12, 'M2 7l-1-1 5-5 5 5-1 1 -3.25 -3.2v7h-1.5v-7z'],
    down: [12, 'M2 5l-1 1 5 5 5-5-1-1 -3.25 3.2v-7h-1.5v7z'],
    left: [12, 'M7 2l-1-1 -5 5 5 5 1-1 -3.2 -3.25h7v-1.5h-7z'],
    right: [12, 'M5 2l 1-1 5 5 -5 5 -1-1 3.2 -3.25h-7v-1.5h7z'],

    upload: [10, 'M1 8h8v1h-8zm1-4h2v3h2v-3h2l-3-3z'],
    download: [10, 'M1 8h8v1h-8zm1-3.7h2v-3h2v3h2l-3 3z'],
    first: [12, 'M2 2h1.5v8h-1.5zm2 4l6-4v8z'],
    last: [12, 'M2 2v8l6-4zm6.5 0h1.5v8h-1.5z'],
  
    date: [10, 'M1 1.8h8v7h-8zm1 2v4h6v-4zm.5-3v2h1.5v-2zm3.5 0v2h1.5v-2z'],
    time: [24, 'M12 1a10 10 0 1 1 -.01 0zm0 2a8 8 0 1 0 .01 0zm-1.2 1h2v6.5l3.5 3.5-1.5 1.5-4-4z'],
  
    audio: [7, ''],
    video: [7, ''],
    image: [7, ''],
    text: [7, ''],
  
    tree: [7, ''],
    list: [7, 'M1 1h1v1h-1zm0 2h1v1h-1zm0 2h1v1h-1z M3 1h3v1h-3zm0 2h3v1h-3zm0 2h3v1h-3z'],
    link: [7, ''],
    chart: [10, 'M1 9v-3h2v3zm3 0v-5h2v5zm3 0v-7h2v7z'],
  
    ban: [7, ''],
    info: [7, ''],
    minus: [7, 'M1 3h5v1h-5z'],
    warning: [7, ''],
  
    bookmark: [8, 'M4 5l-2 2v-6h4v6z'],
    star: [34, 'M17 3 l4 10 10 0-8 7 3 11-9-7-9 7 3-11-8-7 10,0z'],
    heart: [7, ''],
    tag: [9, 'M1 5.2l4-4h3v3l-4 4zm6-3.1a.6 .6 0 1 0 .01 .01z'],
  
    mail: [14, 'M1 2.5h12v9h-12zm1 1v1l5 5 5 -5v-1z'],
    card: [14, 'M1 3h12v8h-12zm1 1v1h10v-1zm0 3v3h10v-3z'],
    phone: [7, ''],
    send: [7, ''],
    chat: [7, ''],
  
    copy: [9, 'M1 3 h1v4h4v1h-5zm2-2h5v5h-5zm1 1v3h3v-3z'],
    db: [9, 'M1 1h7v3h-7zm0 4h7v3h-7zm4-3v1h2v-1zm0 4v1h2v-1z'],
    key: [7, ''],
    lock: [7, ''],
    sum: [7, ''],
    share: [7, ''],
    world: [12, 'M6 1.2a4.8 4.8 0 1 0 .01 0zm0 .8a4 4 0 1 1-.01 0za3 4 0 1 0 .01 0za2.2 4 0 1 1-.01 0za.5 4 0 1 0 .01 0zm4 4a4 .2 0 1 0 0 .01z'],
    view: [7, ''],
    box: [7, ''],

    expand: [10, 'M1 1h3v1h-2v2h-1zm5 0h3v3h-1v-2h-2zm2 5h1v3h-3v-1h2zm-7 0h1v2h2v1h-3z'],
    collapse: [10, 'M4 4h-3v-1h2v-2h1zm2 0v-3h1v2h2v1zm0 2h3v1h-2v2h-1zm-2 0v3h-1v-2h-2v-1z'],
    flag: [10, 'M2 1h1v1q2-1 3 0t3-0v4q-2 1-3 0t-3 0v3h-1z'],
    columns: [11, 'M1 1.5h9v8h-9zm1 2v5h3v-5zm4 0v5h3v-5z'],
    settings: [11, 'M1 2h2v-1h1v1h6v1h-6v1h-1v-1h-2zm0 3h6v-1h1v1h2v1h-2v1h-1v-1h-6zm0 3h3v-1h1v1h5v1h-5v1h-1v-1h-3z'],
    power: [18, 'M6 3a6.7 6.7 0 1 0 6 0v2a4.9 4.9 0 1 1 -6 0zm2-1.5h2v8h-2z'],
    energy: [11, 'M5 1l-2 4h2l-2 5 5-6h-2l2-3z'],
    print: [10, 'M2 1.5h4v5h-4zm-1 3v4h8v-4zm6 1h1v1h-1z'],
    play: [12, 'M3 2v8l7-4z'],
    pause: [9, 'M2 2h2v5h-2zm3 0h2v5h-2z'],
    stop: [9, 'M2 2h5v5h-5z'],
    rec: [10, 'M5 2a3 3 0 1 0 .01 0z'],
    sound: [9, 'M3 6h-2v-3h2l3-2v7zm3.7-3q2 1.5 0 3z'],
    mic: [20, 'M7 5 a3 3 0 1 1 6 0v4a3 3 0 1 1 -6 0zm-2 4a5 5 0 1 0 10 0zm4 4v3h-3v2h8v-2h-3v-3z']
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
      //if(n.firstChild) n.insertBefore(document.createTextNode(' '), n.firstChild);
      if(n.firstChild && !n.firstChild.tagName) app.ins('span', n.firstChild, {}, n, false);
      n.insertBefore(icon, n.firstChild);
    }
  }

  this.i = function(ico, alt){
    let a = ico.split(/\//);
    ico = a[0];
    if(this.parsed[ico] === undefined){
      let svg = this.icons[ico];
      //let line = svg && (svg.substr(-1) === ' ');
      if(!svg){
        let id = this.opt.pSvg + ico;
        if(document.getElementById(id)) svg = '<svg><use xlink:href="#' + id + '"></use></svg>'; // from page
        else svg = ''; // none
      }
      else if(typeof svg !== 'string'){
        svg = '<svg viewBox="0 0 ' + svg[0] + ' ' + svg[0] + '"><path d="' + svg[1] + '"/></svg>'; // from array
      }

      let n;
      if(svg){
        let div = document.createElement('div');
        div.innerHTML = svg;
        n = div.firstChild;
        if(!app.attr(n, 'width'))  n.setAttribute('width', this.opt.iconSize);
        if(!app.attr(n, 'height')) n.setAttribute('height', this.opt.iconSize);
        if(!app.attr(n, 'class'))  n.setAttribute('class', this.opt.cIcon /* + (line ? ' ' + this.opt.cLine : '')*/);
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