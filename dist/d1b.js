/*! d1x v1.0.10 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*! d1css v1.0.10 */
// (() => {
//let main = new (function(){
module.exports = new function () {
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
    iClose: '&#x2715;',
    //&times;
    sCancel: 'Cancel',
    sOk: 'OK'
  };

  this.init = function (opt) {
    var _this = this;

    //options
    if (!opt) {
      opt = this.attr(document.body, 'data-d1');
      if (opt) opt = JSON.parse(opt);
    }

    this.setOpt(this, opt);
    this.dbg(['opt', this.opt]);
    this.initPlugins(opt); // plugins
    // bind events

    this.b([window], 'hashchange', function (e) {
      return _this.on('hash', e);
    });
    this.b([document], 'keydown', function (e) {
      return _this.on('key', e);
    });
    this.b([document], 'click', function (e) {
      return _this.on('click', e);
    });
    if (location.hash) this.on('hash');
    document.body.classList.add(this.opt.cJs); // prepare body: anti-hover, anti-target

    this.fire('after');
  }; // event delegation
  // https://gomakethings.com/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/


  this.on = function (t, e) {
    this.fire(t, e);
    this.fire(t + 'ed', e);
    this.fire('after', e);
  }; //plugins


  this.setOpt = function (obj, opt) {
    var i;
    if (opt) for (i in opt) {
      if (i != 'plug') obj.opt[i] = opt[i];
    }
  };

  this.plug = function (p) {
    this.plugins[p.name] = p;
  };

  this.initPlugins = function (opt) {
    var _this2 = this;

    this.dbg(['plugins', this.plugins]);
    Object.keys(this.plugins).forEach(function (k) {
      if (opt && opt.plug && opt.plug[k]) _this2.setOpt(_this2.plugins[k], opt.plug[k]);

      _this2.plugins[k].init();
    });
  }; //events


  this.listen = function (t, f) {
    if (!this.handlers[t]) this.handlers[t] = [];
    this.handlers[t].push(f);
  };

  this.fire = function (t, e) {
    var _this3 = this;

    this.dbg(['fire ' + t, e]);
    if (this.handlers[t]) this.handlers[t].forEach(function (h) {
      return h.call(_this3, e);
    });
  }; //utils


  this.dbg = function (s, l, e) {
    if (this.opt.debug >= (l || 1)) console[e ? 'error' : 'log'](s);
  };

  this.seq = function () {
    return ++this.sequence;
  };

  this.closest = function (n, q) {
    //including self
    //return n.parentNode.closest(q); //-ie
    do {
      if (n.matches && n.matches(q)) return n;
    } while (n = n.parentNode);
  };

  this.a = function (c) {
    return c ? Array.prototype.slice.call(c) : c;
  };

  this.q = function (s, n) {
    try {
      return (n || document).querySelector(s);
    } catch (e) {
      return null;
    }
  };

  this.qq = function (s, n) {
    try {
      var r = (n || document).querySelectorAll(s);
      return this.a(r);
    } catch (e) {
      return [];
    }
  };

  this.b = function (nn, e, f) {
    var _this4 = this;

    if (typeof nn === 'string') nn = this.qq(nn);else if (nn.tagName) nn = [nn];else nn = this.a(nn);
    if (nn && f) nn.forEach(function (n) {
      return e ? n.addEventListener(e, f.bind(_this4
      /*, n*/
      ), false) : f.call(_this4, n);
    });
  };

  this.e = function (nn, f) {
    return this.b(nn, '', f);
  };

  this.attr = function (n, a, def) {
    return n && n.hasAttribute(a) ? n.getAttribute(a) : def || '';
  }; //pos: -1=before, false=prepend, 0=append(default), 1=after


  this.ins = function (tag, t, attrs, n, pos) {
    var c = document.createElement(tag || 'span');
    if (t && t.tagName) c.appendChild(t);else if (t) c.innerHTML = t; //c.appendChild(document.createTextNode(t||''));

    if (attrs) {
      for (var i in attrs) {
        if (i.match(/-/)) c.setAttribute(i.replace(/^-/, ''), attrs[i]);else c[i] = attrs[i];
      }
    }

    return n ? pos ? n.parentNode.insertBefore(c, pos < 0 ? n : n.nextSibling) : pos === false ? n.insertBefore(c, n.firstChild) : n.appendChild(c) : c;
  };

  this.x = function (d, pos, cls) {
    return this.ins('a', this.opt.iClose, {
      href: this.opt.hClose,
      className: cls || ''
    }, d, pos);
  };

  this.vis = function (n) {
    return !n.classList.contains(this.opt.cHide);
  }; //func


  this.throttle = function (f, ms) {
    var p = false,
        a;
    return function ff() {
      if (p) a = arguments; //2
      else {
          f.apply(null, arguments); //1

          p = true;
          setTimeout(function () {
            //3
            p = false;

            if (a) {
              ff.apply(null, a);
              a = null;
            }
          }, ms);
        }
    };
  }; // url


  this.get = function (a, g) {
    if (!a || a.tagName != 'A') return null;
    var i,
        gets = {};
    var args = a.search ? a.search.replace(/^\?/, '').split('&') : [];

    for (i = 0; i < args.length; i++) {
      var v = args[i].split('=');
      gets[v[0]] = decodeURIComponent(v[1]).replace(/\+/, ' ');
    }

    return g ? gets[g] : gets; //protocol, host (hostname, port), pathname, search, hash
  };

  this.makeUrl = function (a, args) {
    var g = this.get(a);
    Object.keys(args).forEach(function (k) {
      return g[k] = args[k];
    });
    var q = Object.keys(g).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(g[k]);
    }).join('&');
    return a.protocol + '//' + a.host + a.pathname + (q ? '?' + q : '') + a.hash;
  };
}();
/*
if (this.window === this) window[main.name] = main;
else module.exports = main;
})();
*/

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*! d1 example plugin */
// Interface components: dropdown, popup, toggle, modal dialog, tabs, drawer, tree, gallery
// .nav, .pop, .toggle, .dlg, .tabs, .drawer, .tree, .gal
var d1 = __webpack_require__(0);

module.exports = new function () {
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
    qTre: 'ul.toggle:not(.nav) ul',
    //'.tree ul',
    qDrw: '.drawer',
    qAccRoot: 'ul.accordion',
    qAcc: 'ul.accordion ul',
    qGal: '.gal>a[id]',
    // dup of gallery.opt.qGal
    qSubMem: '.tabs.mem+div>[id], ul.mem:not(.nav) ul',
    qMedia: '.hide-mobile, .hide-desktop',
    cMem: 'mem',
    cToggle: 'toggle',
    iToggle: '[+]'
  };

  this.init = function () {
    var _this = this;

    d1.listen('esc', function (e) {
      return _this.esc(e);
    });
    d1.listen('hash', function (e) {
      return _this.onHash(e);
    });
    d1.listen('key', function (e) {
      return _this.onKey(e);
    });
    d1.listen('click', function (e) {
      return _this.onClick(e);
    });
    d1.listen('clicked', function (e) {
      return _this.unpop(e.target);
    });
    d1.listen('after', function (e) {
      return _this.after(e ? e.target : null);
    }); //toggle

    var q = this.opt;
    this.opt.qToggle = [q.qTgl, q.qPop, q.qNav, q.qDlg, q.qTab, q.qTre, q.qDrw, q.qMedia
    /*, q.qGal*/
    ].join(', ');
    this.opt.qAutohide = [q.qPop, q.qNav, q.qDlg, q.qTab, q.qAcc, q.qDrw, q.qMedia
    /*, q.qGal*/
    ].join(', ');
    this.opt.qUnpop = [q.qPop, q.qNav, q.qDlg, q.qDrw
    /*, q.qGal*/
    ].join(', ');
    d1.e(this.opt.qToggle, function (n) {
      return n.classList.add(_this.opt.cToggle);
    }); //initialize togglers

    d1.e(this.opt.qAutohide, function (n) {
      return _this.tgl(n, 0);
    }); //autohide

    d1.e(this.opt.qNav + ', ' + this.opt.qTre, this.attachSubNav.bind(this)); //nav, tree: attach to links

    d1.e(this.opt.qGal + ':last-child', function (n) {
      return d1.x(n, 1);
    }); //gal: auto add close link

    d1.e(this.opt.qSubMem, function (n) {
      return n.classList.add(_this.opt.cMem);
    }); //initialize sub mem

    d1.e('[id]', this.restoreVisibility.bind(this)); //restore visibility

    d1.e(this.opt.qTab + ':not(.hide) ~ [id]:not(.hide)', function (n) {
      return _this.tgl(n, 0);
    }); //undup tabs

    d1.e(this.opt.qTab + ':first-child', function (n) {
      return d1.a(n.parentNode.children).filter(function (m) {
        return d1.vis(m);
      }).length ? null : _this.tgl(d1.q(d1.q('a[href^="#"]', n.parentNode.previousElementSibling).hash), 1);
    }); //inactive tabs: show first

    d1.e('.' + this.opt.cToggle + '[id]', this.hiliteLinks.bind(this)); //init links state
  };

  this.after = function (n) {
    this.shown = null;
    d1.dbg(['after', n]); //let modal = d1.q(this.opt.qDlg+':not(.'+d1.opt.cHide+'), '+this.opt.qGal+':target'); // :target not updated after Esc key

    var modal = d1.q(this.opt.qDlg + ':not(.' + d1.opt.cHide + '), ' + this.opt.qGal + '[id="' + location.hash.substr(1) + '"]');
    var bar = window.innerWidth - document.documentElement.clientWidth; //scroll bar width

    var s = document.body.style;
    s.overflow = modal ? 'hidden' : '';
    s.paddingRight = modal ? '' + bar + 'px' : ''; // avoid width reflow

    if (modal) {
      //let f = d1.q('input, a:not(.' + d1.opt.cClose + ')', modal);
      var f = d1.q('input, a:not([href="' + d1.opt.hClose + '"])', modal);
      if (f) f.focus();
    }
  };

  this.esc = function (e) {
    if (e) e.preventDefault();
    this.unpop();
    this.unhash();
    this.after();
  };

  this.onHash = function (e) {
    d1.dbg(['hash', location.hash]);
    if (location.hash == d1.opt.hClose) d1.fire('esc', e);else if (location.hash) {
      var d = d1.q(location.hash);

      if (d) {
        var t = d.matches(this.opt.qTgl);
        var g = d.matches(this.opt.qGal);

        if (t) {
          this.unpop();
          this.toggle(d, true);
          if (!this.opt.keepHash) this.unhash();
        }

        if (t || g) this.after();
      }
    }
  };

  this.onKey = function (e) {
    var k = e.keyCode;
    d1.dbg(['key', k]);
    if (k == 27) d1.fire('esc', e);
  };

  this.onClick = function (e) {
    var n = e.target;
    var a = d1.closest(n, 'a');
    var d = a && a.matches('a[href^="#"]') ? d1.q(a.hash) : null;
    if (a && a.hash == d1.opt.hClose) d1.fire('esc', e);else if (d && d.matches(this.opt.qTgl)) {
      e.preventDefault();
      d = this.toggle(d);
      if (d1.vis(d) && this.opt.keepHash) this.addHistory(a.hash);else this.unhash();
      return d;
    } else if (!a) {
      this.unhash();
    }
  };

  this.attachSubNav = function (n) {
    //let a = n.previousElementSibling;
    var aa = d1.a(n.parentNode.children).filter(function (v) {
      return v.tagName == 'A';
    });
    var a = aa.filter(function (v) {
      return !v.href;
    })[0] || aa[0] || d1.ins('', ' ', {}, n.parentNode, false) && d1.ins('a', this.opt.iToggle, {}, n.parentNode, false);

    if (a) {
      if (!n.id) n.id = 'ul-' + d1.seq();
      a.href = '#' + n.id;
    }
  }; //deep: -1=prepare, 0=click|hash, 1=deps|clo


  this.toggle = function (h, on, deep) {
    var d = h ? h.tagName ? h : d1.q(h) : null;

    if (d) {
      if (d.matches(this.opt.qTab) && on === undefined) on = true; //tabs: show instead of toggle
      //console.log('toggle '+d.id, on, deep);

      d.classList[on ? 'remove' : on === undefined ? 'toggle' : 'add'](d1.opt.cHide);
      d1.dbg(['toggle' + (deep ? ' deep' : ''), on, d], deep ? 2 : 1);

      if (d1.vis(d)) {
        this.fixPosition(d);
        if (!deep) this.shown = d;
      }

      if (deep != -1) {
        if (!deep) this.toggleDependent(d);
        this.hiliteLinks(d);
        this.storeVisibility(d); //if(!deep) this.after(d);
      }
    }

    return d;
  };

  this.tgl = function (d, on) {
    if (d) d.classList[on ? 'remove' : on === undefined ? 'toggle' : 'add'](d1.opt.cHide);
  };

  this.toggleDependent = function (d) {
    var _this2 = this;

    if (d1.vis(d)) {
      if (d.matches(this.opt.qDlg)) d1.e(this.opt.qDlg, function (n) {
        return n == d ? null : _this2.toggle(n, false, 1);
      }); //hide other dialogs
      else if (d.matches(this.opt.qTab)) d1.e(d.parentNode.children, function (n) {
          return n == d ? null : _this2.toggle(n, false, 1);
        }); //hide sibling tabs
        else if (d.matches(this.opt.qAcc)) d1.e(d1.qq(this.opt.qAcc, d1.closest(d, this.opt.qAccRoot)), function (n) {
            return n.contains(d) ? null : _this2.toggle(n, false, 1);
          }); //hide other ul
    }
  };

  this.unpop = function (x) {
    var _this3 = this;

    var keep = [x];
    keep.push(this.shown);
    var a = x ? d1.closest(x, 'a') : null;

    if (a && a.hash) {
      //if(a.hash==d1.opt.hClose) keep = []; //to close all, even container
      //else
      keep.push(d1.q(a.hash));
    }

    d1.dbg(['unpop', keep]);
    d1.e(this.opt.qUnpop, function (n) {
      return keep && keep.filter(function (m) {
        return m && m.tagName && n.contains(m);
      }).length ? null : _this3.toggle(n, false, 1);
    });
  };

  this.unhash = function () {
    //v1.
    if (location.hash) location.hash = d1.opt.hClose; //v2.

    this.addHistory(location.pathname + location.search
    /* + d1.opt.hClose*/
    );
  };

  this.addHistory = function (h) {
    history.pushState({}, '', h); //following required to re-render hash changes (test: open gallery, esc)
    //history.pushState({}, '', h);
    //history.go(-1);
  };

  this.storeVisibility = function (n) {
    if (n.classList.contains(this.opt.cMem)) {
      localStorage.setItem('vis#' + n.id, d1.vis(n) ? 1 : -1);
    }
  };

  this.restoreVisibility = function (n) {
    if (n.classList.contains(this.opt.cMem)) {
      var v = localStorage.getItem('vis#' + n.id);
      if (v) this.toggle(n, v > 0, -1);
    }
  };

  this.hiliteLinks = function (d) {
    var op = d1.vis(d) ? 'add' : 'remove';
    d1.e('a[href="#' + d.id + '"]', function (a) {
      return a.classList[op]('act');
    });
  };

  this.fixPosition = function (n) {
    var nav = n.matches(this.opt.qNav);
    var ss = nav ? window.getComputedStyle(n.parentNode.parentNode) : null;
    var vert = ss ? ss.display != 'flex' : false;

    if (n.matches(this.opt.qPop) || nav) {
      var s = n.style;
      var p = n.parentNode;
      var i = p.nextElementSibling;
      i = i && i.tagName == 'INPUT' ? i : null;
      var r = i || n.parentNode;

      if (r) {
        s.right = 'auto';
        s.left = vert ? '100%' : 0;
        s.top = vert ? 0 : '100%';
        var qn = n.getBoundingClientRect();
        var qr = r.getBoundingClientRect();
        var dx = qn.right > window.innerWidth;
        var dy = qn.bottom > window.innerHeight;
        var wide = qr.width > 300; //x

        if (vert) s.left = dx || wide ? '3em' : '100%';else if (dx && qn.width > qr.width && qr.right > qn.width) {
          //if(overflows-right && wider-then-container && enough-place-on-the-left) pop-left
          s.left = qr.width - qn.width + 'px';
        } else s.left = 0; //y

        if (vert) s.top = dx || wide ? '90%' : 0;else if (dy && qr.top > qn.height) {
          //if(overflows-bottom && enough-place-on-the-top) pop-top
          s.top = (i ? -qr.height : 0) - qn.height + 'px';
        } else s.top = '100%';
        if (i) p.style.verticalAlign = 'bottom';
      }
    }
  };

  d1.plug(this);
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*! d1 dialog */
// Replacement of standard Javascript dialogs: alert, confirm, prompt
// a.alert([title]|[data-caption])
// a.dialog[href]([title]|[data-caption])[data-prompt] [data-src][data-ok][data-cancel][data-reverse] 
var d1 = __webpack_require__(0); //require('../plugins/toggle.js');


module.exports = new function () {
  "use strict";

  this.name = 'dialog';
  this.dlg = null;
  this.opt = {
    customDialog: 1,
    aConfirm: '_confirm',
    aPrompt: 'data-prompt',
    cBtn: 'btn pad',
    qAlert: 'a.alert',
    qDialog: 'a.dialog, input.dialog'
  };

  this.init = function () {
    var _this = this;

    if (d1.plugins.toggle) {
      d1.listen('click', function (e) {
        return _this.onClick(e);
      });
    } else {
      console.error('Module "dialog" requires "toggle"');
    }
  };

  this.onClick = function (e) {
    var as = d1.closest(e.target, 'a, input, button');

    if (as && as.matches(this.opt.qAlert + ',' + this.opt.qDialog)) {
      //d = this.dialog(e, a, (m, v) => !console.log(v) && d1.plugins.toggle.unpop()); //custom callback
      e.preventDefault();
      return this.dialog(as);
    }
  };

  this.initDlg = function (n, h, t, f, def, rev) {
    var _this2 = this;

    if (!this.dlg) this.dlg = d1.ins('div', '', {
      className: 'dlg toggle'
    }, document.body);
    var c,
        d = this.dlg;

    while (c = d.firstChild) {
      d.removeChild(c);
    }

    var hh = d1.ins('div', '', {
      className: 'row bg'
    }, d);
    d1.ins('h3', h || '', {
      className: 'let pad'
    }, hh);
    d1.x(hh, 0, 'pad hover col-0');
    var b = d1.ins('div', '', {
      className: 'pad'
    }, d);
    if (t) d1.ins('div', t, {}, b);
    var inp = {
      value: true
    };
    if (def || def === '') inp = d1.ins('input', '', {
      value: def
    }, b);
    var bb = d1.ins('p', '', {
      className: 'r'
    }, b);
    var warn = this.opt.cBtn + ' ' + (t.substr(0, 1) == ' ' || n.className.match(/-[we]\b/) ? 'bg-e' : 'bg-y');
    var sec = this.opt.cBtn + ' bg-n';
    var yes = d1.ins('a', d1.attr(n, 'data-ok', d1.opt.sOk), {
      href: d1.opt.hClose,
      className: rev ? sec : warn
    }, bb);

    if (f) {
      d1.ins('a', d1.attr(n, 'data-cancel', d1.opt.sCancel), {
        href: d1.opt.hClose,
        className: rev ? warn : sec
      }, yes, rev ? -1 : 1);
      d1.ins('', ' ', {}, yes, rev ? -1 : 1);
      yes.href = d1.opt.hOk;
      d1.b([yes], 'click', function (e) {
        e.preventDefault();
        f.call(_this2, inp.value);
      });
      if (inp.tagName) d1.b([inp], 'keyup', function (e) {
        return e.keyCode == 13 ? f.call(_this2, inp.value, e) : null;
      });
    }

    d1.plugins.toggle.toggle(this.dlg, true);
  };

  this.dialog = function (n, f) {
    if (n.form && !n.form.checkValidity()) {
      n.form.reportValidity();
      return;
    }

    var p = d1.attr(n, this.opt.aPrompt);
    var t = d1.attr(n, d1.opt.aCaption, n.title || p || '!');
    var rev = d1.attr(n, 'data-reverse');
    var src = d1.attr(n, 'data-src');
    src = src ? d1.q(src) : null;
    if (!src && n.form) src = n.form.elements[p];
    var v = null;
    var al = n.matches(this.opt.qAlert);
    var def = p ? src ? src.value : d1.get(n, p) : null;

    if (this.opt.customDialog) {
      this.initDlg(n, '', t, al ? null : this.onAnswer.bind(this, n, f, p), def, rev);
    } else {
      if (al) v = alert(t); //undef
      else if (!p) v = confirm(t); //bool
        else v = prompt(t, def); //null|value

      this.onAnswer(n, f, p, v);
    }

    return this.dlg;
  };

  this.onAnswer = function (n, f, p, v) {
    //call custom func
    if (f) f.call(this, n, v); //cancelled
    else if (!v && v !== '') ; //form submit
      else if (n.form) {
          if (v !== true) {
            var i = n.form.elements[p] || d1.ins('input', '', {
              type: 'hidden',
              name: p
            }, n.form);
            if (i) i.value = v;
          }

          if (n.form.reportValidity()) {
            d1.q('[type="hidden"][name="' + n.name + '"]', n.form) || d1.ins('input', '', {
              type: 'hidden',
              name: n.name,
              value: n.value
            }, n.form);
            n.form.elements[this.opt.aConfirm] || d1.ins('input', '', {
              type: 'hidden',
              name: this.opt.aConfirm,
              value: 1
            }, n.form);
            n.form.submit();
          } else d1.plugins.toggle.unpop(); //n.click();

        } //goto link
        else if (n.href) {
            var ha = d1.attr(n, 'href').substr(0, 1) == '#';
            var bl = n.target == '_blank';
            if (ha || bl) d1.plugins.toggle.unpop();
            var u;
            if (ha) u = n.hash;else {
              var a = {};
              a[this.opt.aConfirm] = 1;
              if (v !== true) a[p] = v;
              u = d1.makeUrl(n, a);
            }
            if (n.target == '_blank') window.open(u, n.target);else location.href = u;
          }
  };

  d1.plug(this);
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*! d1 gallery */
// Lighweight image gallery
// .gallery a.pic 
var d1 = __webpack_require__(0);

module.exports = new function () {
  "use strict";

  this.name = 'gallery';
  this.opt = {
    idPrefix: 'pic-',
    num: true,
    cGal: 'gal',
    qGal: '.gal>a[id]',
    // dup of toggle.opt.qGal
    qGallery: '.gallery',
    qLinks: 'a.pic'
  };

  this.init = function () {
    var _this = this;

    d1.listen('hash', function (e) {
      return _this.onHash(e);
    });
    d1.listen('key', function (e) {
      return _this.onKey(e);
    });
    d1.listen('click', function (e) {
      return _this.onClick(e);
    });
    d1.e(this.opt.qGallery, this.prepare.bind(this));
  };

  this.onClick = function (e) {
    var n = e.target;

    if (n.matches(this.opt.qGal)) {
      if (e.clientX > 0
      /* not Enter key */
      && e.clientX < n.clientWidth / 3) {
        if (this.prevImg(n)) e.preventDefault();
      } //return n;

    }
  };

  this.prevImg = function (n) {
    var p = n.previousElementSibling || d1.qq('a[id]', n.parentNode).pop();
    if (p.id) location.hash = '#' + p.id;
    return p.id;
  };

  this.onHash = function () {
    var n = d1.q(location.hash);

    if (n) {
      this.loadImg(n);
      this.loadImg(d1.q(n.hash));
    }
  };

  this.loadImg = function (n) {
    if (n && n.vImg) {
      n.style.backgroundImage = 'url("' + n.vImg + '")';
      n.vImg = '';
    }
  };

  this.prepare = function (n) {
    var g = d1.ins('div', '', {
      className: this.opt.cGal
    });
    var a = n.querySelectorAll(this.opt.qLinks);
    var z = a.length;
    var first = 0;

    for (var i = 0; i < z; i++) {
      if (!a[i].vDone) {
        var s = d1.seq();
        if (!i) first = s;
        var p = d1.ins('a', '', {
          id: this.opt.idPrefix + s,
          href: '#' + this.opt.idPrefix + (i == z - 1 ? first : s + 1)
        }, g); //p.style.setProperty('--img', 'url("' + a[i].getAttribute('href') + '")');
        //p.style.backgroundImage = 'url("' + a[i].getAttribute('href') + '")';//preload all

        p.vLink = a[i].getAttribute('href'); //real link

        p.vImg = a[i].getAttribute('href'); //preload prev & next

        p.setAttribute(d1.opt.aCaption, (this.opt.num ? i + 1 + '/' + z + (a[i].title ? ' - ' : '') : '') + (a[i].title || ''));
        a[i].href = '#' + p.id;
        a[i].vDone = 1;
      }
    }

    d1.x(g);
    d1.b(d1.qq('a[id]', g), 'click', d1.gotoPrev);
    document.querySelector('body').appendChild(g);
  };

  this.onKey = function (e) {
    if (location.hash) {
      var a = d1.q(location.hash);

      if (a && a.hash) {
        var k = e.keyCode;
        if (k == 37 || k == 38) this.prevImg(a);else if (k == 39 || k == 40) location.hash = a.hash; //a.click();
        else if (k == 8) {
            var h = a.vLink;

            if (!h) {
              h = window.getComputedStyle(a).backgroundImage;
              h = h.substring(4, h.length - 1).replace(/^"|"$/g, '');
            }

            if (h) location.href = h;
          } //e.preventDefault();
      }
    }
  };

  d1.plug(this);
}();

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var d1 = __webpack_require__(0);

__webpack_require__(1), __webpack_require__(2), __webpack_require__(3);
d1.b([document], 'DOMContentLoaded', function (e) {
  return d1.init();
});
if (window) window.d1 = d1;

/***/ })
/******/ ]);