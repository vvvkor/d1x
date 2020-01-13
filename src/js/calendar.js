/*! d1 calendar */

let d1 = require('./d1.js');
//require('./toggle.js');

module.exports = new(function () {

  "use strict";

  this.name = 'calendar';
  
  this.icons = {
    date:  ['date', '#'],
    now:   ['now', '&check;'],
    clear: ['delete', '&#x2715;'],
    prev:  ['', '&lsaquo;'],
    next:  ['', '&rsaquo;'],
    prev2: ['', '&laquo;'],
    next2: ['', '&raquo;']
  }

  this.opt = {
    cBtn: 'pad hover',
    dateFormat: 'd', //y=Y-m-d, d=d.m.Y, m=m/d Y
    hashCancel: '#cancel',
    hashNow: '#now',
    addIcons: ['date', 'now', 'clear'],
    idPicker: 'pick-date',
    minWidth: 801,
    qsCalendar: 'input.calendar',
    showModal: 0,
    sizeLimit: 801,
    stepMinutes: 1,
    inPop: 0
  };

  this.win = null;

  this.init = function(opt) {
    let i;
    for(i in opt) this.opt[i] = opt[i];

    if(window.innerWidth < this.opt.minWidth) return;
    this.win = d1.ins('div', '', {id: this.opt.idPicker, className: d1.opt.cToggle + ' ' + d1.opt.cOff + ' pad'});//dlg hide pad
    this.win.style.whiteSpace = 'nowrap';
    //this.toggle(false);
    document.body.appendChild(this.win);
    
    let t = d1.qq(this.opt.qsCalendar);
    for (let i = 0; i < t.length; i++){
      this.preparePick(t[i]);
      d1.b(t[i], 'click', e => this.openDialog(t[i], null, e), false);
      d1.b(t[i], 'input', e => this.validate(t[i], 0), false);
    }
  }
  
  this.toggle = function(on, n){
    if(n){
      var m = d1.attr(n, 'data-modal');
      if(m!==null) m = parseInt(m, 10);
      else m = this.opt.showModal || (Math.min(window.innerWidth, window.innerHeight) < this.opt.sizeLimit);
      if(on){
        this.win.className = d1.opt.cToggle + ' ' + d1.opt.cOff + ' pad ' + (m ? 'dlg' : '');
        (m ? document.body : n.thePop).appendChild(this.win);
        if(m){
          var s = this.win.style;
          s.left = s.right = s.top = s.bottom = '';
        }
        this.win.vRel = m ? null : n;
      }
    }
    d1.plugins.toggle.toggle(this.win, on);
    d1.fire('after');
  }
  
  this.preparePick = function(n){
    n.vTime = (n.type == 'datetime-local' || n.classList.contains('datetime'));
    n.type = 'text';
    n.autocomplete = 'off';
    if(n.value) n.value = this.fmt(this.parse(n.value), 0, n.vTime);
    let pop = d1.ins('div', '', {className:'pop l'}, n, -1); //''
    if(!this.opt.inPop) pop.style.verticalAlign = 'bottom';
    n.thePop = pop;
    if(this.opt.addIcons.length>0){
      let ico = [];
      var ic = d1.ins('span', '', {className:'input-tools'}, n, 1);//icons container
      for(let i in this.opt.addIcons){
        d1.ins('', ' ', {}, ic);
        let ii = ic.appendChild(d1.i(this.opt.addIcons[i]));
        ii.style.cursor = 'pointer';
        ico.push(ii);
      }
      if(ico[0]) d1.b(ico[0], 'click', e => this.openDialog(n, null, e), false);
      if(ico[1]) d1.b(ico[1], 'click', e => this.closeDialog(n, true, null, null, e), false);
      if(ico[2]) d1.b(ico[2], 'click', e => this.closeDialog(n, '', null, null, e), false);
    }
    if(this.opt.inPop) pop.appendChild(n);
  }
  
  this.switchMonth = function(n, y, m, d, ch, ci, e){
    e.preventDefault();
    if(d>28){
      var days = (new Date(y, m+1, 0)).getDate();//days in month
      d = Math.min(d, days);
    }
    var h = ch ? parseInt(ch.textContent, 10) : 0;
    var i = ci ? parseInt(ci.textContent, 10) : 0;
    this.openDialog(n, new Date(y, m, d, h, i), e);
  }
  
  this.openDialog = function(n, d, e){
    e.stopPropagation();
    this.build(n, d || n.value);
    this.toggle(true, n);
  }

  this.closeDialog = function(n, d, h, m, e){
    e.preventDefault();
    e.stopPropagation();
    if(n){
      this.setValue(n, d, h, m);
      n.focus();
    }
    this.toggle(false);
  }
  
  this.setValue = function(n, d, h, m){
    if(d !== null){
      n.value = (d===true) ? this.fmt(0, 0, n.vTime) : d;
      if(!(d===true && n.vTime) && h && m) n.value += ' ' + this.n(h.textContent) + ':' + this.n(m.textContent);
      this.validate(n, 0);
    }
  }
  
  this.n = function(v, l){
    return ('000'+v).substr(-(l || 2));
  }
  
  this.getLimit = function(n, a, t){
    let r = d1.attr(n, a);
    return r ? this.fmt(this.parse(r), 0, t, 'y') : (a == 'max' ? '9999' : '0000');
  }
  
  this.errLimits = function(n){
    let min = this.getLimit(n, 'min', n.vTime);
    let max = this.getLimit(n, 'max', n.vTime);
    let v = this.fmt(this.parse(n.value), 0, n.vTime, 'y');
    return (min && v<min) || (max && v>max) ? min + ' .. ' + max : '';
  }
  
  this.validate = function(n, re){
    n.setCustomValidity((re || n.value=='') ? '' : this.errLimits(n));
    n.checkValidity();
    n.reportValidity();
  }
  
  this.build = function(n, x){
    while(this.win.firstChild) this.win.removeChild(this.win.firstChild);
    if (typeof x === 'string') x = this.parse(x || d1.attr(n, 'data-def'));
    let min = this.getLimit(n, 'min', 0);
    let max = this.getLimit(n, 'max', 0);
    //time
    let ch = null;
    let ci = null;
    let p2 = null;
    if(n.vTime){
        p2 = d1.ins('p', '', {className: 'c'});
        let ph = this.btn('#prev-hour', d1.i('prev'), p2);
        ch = d1.ins('span', this.n(x.getHours()), {className: 'pad'}, p2);
        let nh = this.btn('#next-hour', d1.i('next'), p2);
        d1.ins('span', ':', {className: 'pad'}, p2);
        let pi = this.btn('#prev-min', d1.i('prev'), p2);
        ci = d1.ins('span', this.n(x.getMinutes()), {className: 'pad'}, p2);
        let ni = this.btn('#next-min', d1.i('next'), p2);
        d1.b(ph, 'click', e => this.setTime(n, ch, ci, -1, 'h', e), false);
        d1.b(nh, 'click', e => this.setTime(n, ch, ci, +1, 'h', e), false);
        d1.b(pi, 'click', e => this.setTime(n, ch, ci, -this.opt.stepMinutes, 'i', e), false);
        d1.b(ni, 'click', e => this.setTime(n, ch, ci, +this.opt.stepMinutes, 'i', e), false);
    }
   //buttons
    let y = x.getFullYear();
    let m = x.getMonth();
    let d = x.getDate();
    let my = this.n(m+1) + '.' + y;
    let p1 = d1.ins('p', '', {className: 'c'}, this.win);
    let now = this.btn(this.opt.hashNow, d1.i('now'), p1);
    let py = this.btn('#prev-year', d1.i('prev2'), p1);
    let pm = this.btn('#prev-month', d1.i('prev'), p1);
    let cur = d1.ins('span', my, {className: 'pad'}, p1);
    let nm = this.btn('#next-month', d1.i('next'), p1);
    let ny = this.btn('#next-year', d1.i('next2'), p1);
    let cls = this.btn(this.opt.hashCancel, d1.i('close'), p1);
    d1.ins('hr', '', {}, this.win);
    d1.b(now, 'click', e => this.closeDialog(n, true, ch, ci, e), false);
    d1.b(cls, 'click', e => this.closeDialog(n, null, null, null, e), false);
    d1.b(py, 'click', e => this.switchMonth(n, y-1, m, d, ch, ci, e), false);
    d1.b(ny, 'click', e => this.switchMonth(n, y+1, m, d, ch, ci, e), false);
    d1.b(pm, 'click', e => this.switchMonth(n, y, m-1, d, ch, ci, e), false);
    d1.b(nm, 'click', e => this.switchMonth(n, y, m+1, d, ch, ci, e), false);
    //dates
    let days = (new Date(y, m+1, 0)).getDate();//days in month
    let skip = ((new Date(y, m, 1)).getDay() + 6) % 7;//skip weekdays
    let maxd = Math.ceil((skip + days) / 7) * 7 - skip;
    let c, vv, sel, today, off, wd;
    let cd = this.fmt(new Date());
    let xd = this.fmt(x);
    let row;
    for(let i=-skip+1; i<=maxd; i++){
      wd = ((skip+i-1)%7)+1;
      if(wd == 1) row = d1.ins('div', '', {className:'row'}, this.win);
      if(i<1 || i>days) c = d1.ins('a', '', {className: 'pad c center'}, row);
      else{
        let v = this.fmt(x, i);
        vv = this.fmt(x, i, 0, 'y');
        sel = (v == xd);
        today = false;//(v == cd);
        off = (min && vv<min) || (max && vv>max);
        c = d1.ins('a', i, {className: 'pad c center ' + (sel ? 'bg-w ' : '') + (today ? 'bg-y ' : '') + (off ? 'text-n ' : 'hover ') + (wd>5 ? 'text-e ' : '')}, row);
        if(!off){
          c.href = '#' + i;
          d1.b(c, 'click', e => this.closeDialog(n, v, ch, ci, e), false);
        }
      }
    }
    if(n.vTime){
      d1.ins('hr', '', {}, this.win);
      this.win.appendChild(p2);
    }
  }
  
  this.setTime = function(n, ch, ci, step, item, e){
    let max = (item == 'h') ? 24 : 60;
    let m = (item == 'h') ? ch : ci;
    e.preventDefault();
    let v = parseInt(m.textContent, 10);
    let x = v % Math.abs(step);
    v += x ? (step>0 ? step-x : -x) : max+step;
    m.textContent = this.n(v % max);
    this.setValue(n, this.fmt(this.parse(n.value)), ch, ci);
  }

  this.parse = function(d){
    if(!d) d = '';
    let mode = d.indexOf('/')!=-1 ? 'm' : (d.indexOf('.')!=-1 ? 'd' : 'y');
    let seq = (mode=='m') ? [2, 0, 1] : (mode=='d' ? [2, 1, 0] : [0, 1, 2]);
    d = d.split(/\D/);
    while(d.length<6) d.push(d.length==2 ? 1 : 0);
    d = new Date(parseInt(d[seq[0]], 10), parseInt(d[seq[1]]-1, 10), parseInt(d[seq[2]], 10), parseInt(d[3], 10), parseInt(d[4], 10), parseInt(d[5], 10));
    if(!d.getFullYear()) d = new Date();
    return d;
  }
  
  this.fmt = function(x, i, t, f){
    if(!x) x = new Date();
    if(i) x = new Date(x.getFullYear(), x.getMonth(), i);
    let d = this.n(x.getDate());
    let m = this.n(x.getMonth()+1);
    let y = x.getFullYear();
    if(!f) f = this.opt.dateFormat;
    return (f=='m' ? m + '/' + d + ' ' + y : (f=='d' ? d + '.' + m + '.' + y : y + '-' + m + '-' + d))
      + (t ? ' '+this.n(x.getHours())+':'+this.n(x.getMinutes()) : '');
  }
  
  this.btn = function(h, s, p){
    return d1.ins('a', s, {href: h, className: this.opt.cBtn}, p);
  }

})();