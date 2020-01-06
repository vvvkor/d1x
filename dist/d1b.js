/*! d1x v1.0.14 */
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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*! d1css v1.0.14 */
// (() => {
//let main = new (function(){
module.exports = new function () {
  this.sequence = 0;
  this.plugins = {};
  this.handlers = {};
  this.opt = {
    debug: 0,
    cAct: 'act',
    cHide: 'hide',
    aCaption: 'data-caption',
    cClose: 'close',
    cIcon: 'icon',
    cJs: 'js',
    hClose: '#cancel',
    hOk: '#ok',
    iClose: '&#x2715;',
    //&times;
    sCancel: 'Cancel',
    sOk: 'OK',
    svgSuffix: 'svg-'
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

  this.b = function (nn, et, f) {
    var _this4 = this;

    if (typeof nn === 'string') nn = this.qq(nn);else if (nn.tagName) nn = [nn];else nn = this.a(nn);
    if (nn && f) nn.forEach(function (n) {
      return et ? n.addEventListener(et, function (e) {
        return f(e);
      }
      /*f.bind(this)*/
      , false) : f.call(_this4, n);
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

  this.svg = function (id, alt, c) {
    if (!document.getElementById(id)) return this.ins('span', alt || '', {
      className: c || ''
    });
    return this.ins('span', '<svg class="' + this.opt.cIcon + ' ' + (c || '') + '" width="24" height="24"><use xlink:href="#' + id + '"></use></svg>');
  };

  this.i = function (id, alt, c) {
    return this.svg(id ? this.opt.svgSuffix + id : '', alt, c);
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

var map = {
	"./calendar.js": 2,
	"./code.js": 3,
	"./dialog.js": 4,
	"./example.js": 5,
	"./fetch.js": 6,
	"./form.js": 7,
	"./gallery.js": 8,
	"./scroll.js": 9,
	"./tablex.js": 10,
	"./theme.js": 11,
	"./toggle.js": 12,
	"./tools.js": 13
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 1;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*! d1 calendar */
var d1 = __webpack_require__(0); //require('../plugins/toggle.js');


module.exports = new function () {
  "use strict";

  this.name = 'calendar';
  this.opt = {
    cBtn: 'pad hover',
    dateFormat: 'd',
    //y=Y-m-d, d=d.m.Y, m=m/d Y
    hashCancel: '#cancel',
    hashNow: '#now',
    icons: [['date', '#'], ['now', '&#x2713;'], ['delete', '&#x2715;']],
    idPicker: 'pick-date',
    minWidth: 801,
    qsCalendar: 'input.calendar',
    showModal: 0,
    sizeLimit: 801,
    stepMinutes: 1,
    inPop: 0
  };
  this.win = null;

  this.init = function (opt) {
    var _this = this;

    var i;

    for (i in opt) {
      this.opt[i] = opt[i];
    }

    if (window.innerWidth < this.opt.minWidth) return;
    this.win = d1.ins('div', '', {
      id: this.opt.idPicker,
      className: 'toggle pad'
    }); //dlg hide pad

    this.win.style.whiteSpace = 'nowrap';
    this.toggle(false);
    document.body.appendChild(this.win);
    var t = d1.qq(this.opt.qsCalendar);

    var _loop = function _loop(_i) {
      _this.preparePick(t[_i]);

      d1.b(t[_i], 'click', function (e) {
        return _this.openDialog(t[_i], null, e);
      }, false);
      d1.b(t[_i], 'input', function (e) {
        return _this.validate(t[_i], 0);
      }, false);
    };

    for (var _i = 0; _i < t.length; _i++) {
      _loop(_i);
    }
  };

  this.toggle = function (on, n) {
    if (n) {
      var m = n.getAttribute('data-modal');
      if (m !== null) m = parseInt(m, 10);else m = this.opt.showModal || Math.min(window.innerWidth, window.innerHeight) < this.opt.sizeLimit;

      if (on) {
        this.win.className = m ? 'dlg hide toggle pad' : 'toggle pad';
        (m ? document.body : n.thePop).appendChild(this.win);

        if (m) {
          var s = this.win.style;
          s.left = s.right = s.top = s.bottom = '';
        }

        this.win.vRel = m ? null : n;
      }
    }

    d1.plugins.toggle.toggle(this.win, on);
    d1.fire('after');
  };

  this.preparePick = function (n) {
    var _this2 = this;

    n.vTime = n.type == 'datetime-local' || n.classList.contains('datetime');
    n.type = 'text';
    n.autocomplete = 'off';
    if (n.value) n.value = this.fmt(this.parse(n.value), 0, n.vTime);
    var pop = d1.ins('div', '', {
      className: 'pop l'
    }, n, -1); //''

    if (!this.opt.inPop) pop.style.verticalAlign = 'bottom';
    n.thePop = pop;

    if (this.opt.icons.length > 0) {
      var ico = [];
      var ic = d1.ins('span', '', {
        className: 'input-tools'
      }, n, 1); //icons container

      for (var i in this.opt.icons) {
        d1.ins('', ' ', {}, ic);
        var ii = ic.appendChild(d1.i.apply(d1, this.opt.icons[i]));
        ii.style.cursor = 'pointer';
        ico.push(ii);
      }

      if (ico[0]) d1.b(ico[0], 'click', function (e) {
        return _this2.openDialog(n, null, e);
      }, false);
      if (ico[1]) d1.b(ico[1], 'click', function (e) {
        return _this2.closeDialog(n, true, null, null, e);
      }, false);
      if (ico[2]) d1.b(ico[2], 'click', function (e) {
        return _this2.closeDialog(n, '', null, null, e);
      }, false);
    }

    if (this.opt.inPop) pop.appendChild(n);
  };

  this.switchMonth = function (n, y, m, d, ch, ci, e) {
    e.preventDefault();

    if (d > 28) {
      var days = new Date(y, m + 1, 0).getDate(); //days in month

      d = Math.min(d, days);
    }

    var h = ch ? parseInt(ch.textContent, 10) : 0;
    var i = ci ? parseInt(ci.textContent, 10) : 0;
    this.openDialog(n, new Date(y, m, d, h, i), e);
  };

  this.openDialog = function (n, d, e) {
    e.stopPropagation();
    this.build(n, d || n.value);
    this.toggle(true, n);
  };

  this.closeDialog = function (n, d, h, m, e) {
    e.preventDefault();
    e.stopPropagation();

    if (n) {
      this.setValue(n, d, h, m);
      n.focus();
    }

    this.toggle(false);
  };

  this.setValue = function (n, d, h, m) {
    if (d !== null) {
      n.value = d === true ? this.fmt(0, 0, n.vTime) : d;
      if (!(d === true && n.vTime) && h && m) n.value += ' ' + this.n(h.textContent) + ':' + this.n(m.textContent);
      this.validate(n, 0);
    }
  };

  this.n = function (v, l) {
    return ('000' + v).substr(-(l || 2));
  };

  this.getLimit = function (n, a, t) {
    var r = n.getAttribute(a);
    return r ? this.fmt(this.parse(r), 0, t, 'y') : a == 'max' ? '9999' : '0000';
  };

  this.errLimits = function (n) {
    var min = this.getLimit(n, 'min', n.vTime);
    var max = this.getLimit(n, 'max', n.vTime);
    var v = this.fmt(this.parse(n.value), 0, n.vTime, 'y');
    return min && v < min || max && v > max ? min + ' .. ' + max : '';
  };

  this.validate = function (n, re) {
    n.setCustomValidity(re || n.value == '' ? '' : this.errLimits(n));
    n.checkValidity();
    n.reportValidity();
  };

  this.build = function (n, x) {
    var _this3 = this;

    while (this.win.firstChild) {
      this.win.removeChild(this.win.firstChild);
    }

    if (typeof x === 'string') x = this.parse(x || n.getAttribute('data-def'));
    var min = this.getLimit(n, 'min', 0);
    var max = this.getLimit(n, 'max', 0); //time

    var ch = null;
    var ci = null;
    var p2 = null;

    if (n.vTime) {
      p2 = d1.ins('p', '', {
        className: 'c'
      });
      var ph = this.btn('#prev-hour', d1.i('prev', '&lsaquo;'), p2);
      ch = d1.ins('span', this.n(x.getHours()), {
        className: 'pad'
      }, p2);
      var nh = this.btn('#next-hour', d1.i('next', '&rsaquo;'), p2);
      d1.ins('span', ':', {
        className: 'pad'
      }, p2);
      var pi = this.btn('#prev-min', d1.i('prev', '&lsaquo;'), p2);
      ci = d1.ins('span', this.n(x.getMinutes()), {
        className: 'pad'
      }, p2);
      var ni = this.btn('#next-min', d1.i('next', '&rsaquo;'), p2);
      d1.b(ph, 'click', function (e) {
        return _this3.setTime(n, ch, ci, -1, 'h', e);
      }, false);
      d1.b(nh, 'click', function (e) {
        return _this3.setTime(n, ch, ci, +1, 'h', e);
      }, false);
      d1.b(pi, 'click', function (e) {
        return _this3.setTime(n, ch, ci, -_this3.opt.stepMinutes, 'i', e);
      }, false);
      d1.b(ni, 'click', function (e) {
        return _this3.setTime(n, ch, ci, +_this3.opt.stepMinutes, 'i', e);
      }, false);
    } //buttons


    var y = x.getFullYear();
    var m = x.getMonth();
    var d = x.getDate();
    var my = this.n(m + 1) + '.' + y;
    var p1 = d1.ins('p', '', {
      className: 'c'
    }, this.win);
    var now = this.btn(this.opt.hashNow, d1.i('now', '&#x2713;'), p1);
    var py = this.btn('#prev-year', d1.i('first', '&laquo;'), p1);
    var pm = this.btn('#prev-month', d1.i('prev', '&lsaquo;'), p1);
    var cur = d1.ins('span', my, {
      className: 'pad'
    }, p1);
    var nm = this.btn('#next-month', d1.i('next', '&rsaquo;'), p1);
    var ny = this.btn('#next-year', d1.i('last', '&raquo;'), p1);
    var cls = this.btn(this.opt.hashCancel, d1.i('close', '&#x2715;'), p1);
    d1.ins('hr', '', {}, this.win);
    d1.b(now, 'click', function (e) {
      return _this3.closeDialog(n, true, ch, ci, e);
    }, false);
    d1.b(cls, 'click', function (e) {
      return _this3.closeDialog(n, null, null, null, e);
    }, false);
    d1.b(py, 'click', function (e) {
      return _this3.switchMonth(n, y - 1, m, d, ch, ci, e);
    }, false);
    d1.b(ny, 'click', function (e) {
      return _this3.switchMonth(n, y + 1, m, d, ch, ci, e);
    }, false);
    d1.b(pm, 'click', function (e) {
      return _this3.switchMonth(n, y, m - 1, d, ch, ci, e);
    }, false);
    d1.b(nm, 'click', function (e) {
      return _this3.switchMonth(n, y, m + 1, d, ch, ci, e);
    }, false); //dates

    var days = new Date(y, m + 1, 0).getDate(); //days in month

    var skip = (new Date(y, m, 1).getDay() + 6) % 7; //skip weekdays

    var maxd = Math.ceil((skip + days) / 7) * 7 - skip;
    var c, vv, sel, today, off, wd;
    var cd = this.fmt(new Date());
    var xd = this.fmt(x);
    var row;

    for (var i = -skip + 1; i <= maxd; i++) {
      wd = (skip + i - 1) % 7 + 1;
      if (wd == 1) row = d1.ins('div', '', {
        className: 'row'
      }, this.win);
      if (i < 1 || i > days) c = d1.ins('a', '', {
        className: 'pad c center'
      }, row);else {
        (function () {
          var v = _this3.fmt(x, i);

          vv = _this3.fmt(x, i, 0, 'y');
          sel = v == xd;
          today = false; //(v == cd);

          off = min && vv < min || maxd && vv > maxd;
          c = d1.ins('a', i, {
            className: 'pad c center ' + (sel ? 'bg-w ' : '') + (today ? 'bg-y ' : '') + (off ? 'text-n ' : 'hover ') + (wd > 5 ? 'text-e ' : '')
          }, row);

          if (!off) {
            c.href = '#' + i;
            d1.b(c, 'click', function (e) {
              return _this3.closeDialog(n, v, ch, ci, e);
            }, false);
          }
        })();
      }
    }

    if (n.vTime) {
      d1.ins('hr', '', {}, this.win);
      this.win.appendChild(p2);
    }
  };

  this.setTime = function (n, ch, ci, step, item, e) {
    var max = item == 'h' ? 24 : 60;
    var m = item == 'h' ? ch : ci;
    e.preventDefault();
    var v = parseInt(m.textContent, 10);
    var x = v % Math.abs(step);
    v += x ? step > 0 ? step - x : -x : max + step;
    m.textContent = this.n(v % max);
    this.setValue(n, this.fmt(this.parse(n.value)), ch, ci);
  };

  this.parse = function (d) {
    if (!d) d = '';
    var mode = d.indexOf('/') != -1 ? 'm' : d.indexOf('.') != -1 ? 'd' : 'y';
    var seq = mode == 'm' ? [2, 0, 1] : mode == 'd' ? [2, 1, 0] : [0, 1, 2];
    d = d.split(/\D/);

    while (d.length < 6) {
      d.push(d.length == 2 ? 1 : 0);
    }

    d = new Date(parseInt(d[seq[0]], 10), parseInt(d[seq[1]] - 1, 10), parseInt(d[seq[2]], 10), parseInt(d[3], 10), parseInt(d[4], 10), parseInt(d[5], 10));
    if (!d.getFullYear()) d = new Date();
    return d;
  };

  this.fmt = function (x, i, t, f) {
    if (!x) x = new Date();
    if (i) x = new Date(x.getFullYear(), x.getMonth(), i);
    var d = this.n(x.getDate());
    var m = this.n(x.getMonth() + 1);
    var y = x.getFullYear();
    if (!f) f = this.opt.dateFormat;
    return (f == 'm' ? m + '/' + d + ' ' + y : f == 'd' ? d + '.' + m + '.' + y : y + '-' + m + '-' + d) + (t ? ' ' + this.n(x.getHours()) + ':' + this.n(x.getMinutes()) : '');
  };

  this.btn = function (h, s, p) {
    return d1.ins('a', s, {
      href: h,
      className: this.opt.cBtn
    }, p);
  };
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*! d1 code sample */
var d1 = __webpack_require__(0);

module.exports = new function () {
  "use strict";

  this.name = 'code';
  this.opt = {
    sCode: 'show code'
  };

  this.init = function () {
    var _this = this;

    d1.e('.code', function (n) {
      return _this.showCode(n);
    });
  };

  this.showCode = function (src) {
    var t = src.innerHTML.replace(/^\s*\r?\n|\s+$/g, '').replace(/\t/g, '  ').replace(/=""/g, '');
    var cont = d1.ins('div', '', {
      classList: 'bord'
    }, src, 1);
    cont.appendChild(src);
    src.classList.add('pad');
    var id = 'code-' + d1.seq();
    d1.ins('div', d1.ins('a', this.opt.sCode, {
      className: 'pad',
      href: '#' + id
    }), {
      className: '-r bg small'
    }, cont);
    var cod = d1.ins('pre', '', {
      className: 'let hide toggle',
      id: id
    }, cont);
    cod.textContent = t;
  };
}();

/***/ }),
/* 4 */
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
    var warn = this.opt.cBtn + ' ' + (t.substr(0, 1) == ' ' || n && n.className.match(/-[we]\b/) ? 'bg-e' : 'bg-y');
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
    var _this3 = this;

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
      this.initDlg(n, '', t, al ? null : function (w) {
        return _this3.onAnswer(n, f, p, w);
      }, def, rev);
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
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*! d1 example plugin */
var d1 = __webpack_require__(0);

module.exports = new function () {
  "use strict";

  this.name = 'example';
  this.opt = {};

  this.init = function () {} //d1.listen('click', e => this.onClick(e));

  /*
  this.onClick = function(e){
    let n = e.target;
  }
  */
  //d1.plug(this);
  ;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*! d1 async fetch */
var d1 = __webpack_require__(0); //require('../plugins/dialog.js');
//require('../plugins/toggle.js');


module.exports = new function () {
  "use strict";

  this.name = 'fetch';
  this.opt = {};

  this.init = function () {
    var _this = this;

    d1.listen('click', function (e) {
      return _this.onClick(e);
    });
  };

  this.onClick = function (e) {
    var a = d1.closest(e.target, 'a[data-target]');

    if (a) {
      e.preventDefault();
      this.fetchBy(a);
    }
  };

  this.fetchBy = function (n, f) {
    var _this2 = this;

    this.fetch(d1.attr(n, 'href'), function (r) {
      return f ? f(n, r) : _this2.recv(n, r);
    });
  };

  this.fetch = function (url, f) {
    var req = new XMLHttpRequest();
    if (f) req.addEventListener('load', function (e) {
      return f(req);
    });
    req.open('GET', url);
    req.send();
  };

  this.recv = function (n, req, e) {
    // JSON.parse(req.responseText)
    var d = d1.q(d1.attr(n, 'data-target'));

    if (req.status == '200') {
      if (d) {
        d.innerHTML = req.responseText;
        var dlg = d1.closest(d, '.dlg[id]');
        if (dlg) d1.plugins.toggle.toggle(dlg, true);
      } else {
        d1.plugins.dialog.initDlg(null, '', req.responseText);
      }
    } else console.error('XHTTP request failed', req);

    d1.fire('after', e);
  };
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*! d1 form tools */
var d1 = __webpack_require__(0); //require('../plugins/toggle.js');


module.exports = new function () {
  "use strict";

  this.name = 'form';
  this.opt = {};

  this.init = function () {
    var _this = this;

    d1.e('input[type="color"]', function (n) {
      return _this.prepareColor(n);
    });
    d1.listen('click', function (e) {
      return _this.onClick(e);
    });
  };

  this.onClick = function (e) {
    var n = e.target;
    var a = d1.closest(n, 'a[href^="#"][data-value]');

    if (a) {
      e.preventDefault();
      this.setValue(a);
    } else if (n.matches('input[data-group]')) {
      this.checkBoxes(n);
    }
  };

  this.checkBoxes = function (n) {
    d1.e(d1.qq('input[type="checkbox"][class~="' + d1.attr(n, 'data-group') + '"]', n.form), function (m) {
      return m.checked = n.checked;
    });
  };

  this.setValue = function (n) {
    var d = d1.q(n.hash);

    if (d) {
      d.value = d1.attr(n, 'data-value');
      d1.plugins.toggle.esc();
    }
  };

  this.prepareColor = function (n) {
    var m = d1.ins('input', '', {
      type: 'text',
      value: n.value,
      size: 7,
      className: 'color'
    }, n, -1);
    d1.ins('', ' ', {}, m, 1);
    d1.b([n, m], 'input', function (e) {
      return (e.target == n ? m : n).value = e.target.value;
    });
  };
}();

/***/ }),
/* 8 */
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
    d1.e(this.opt.qGallery, function (n) {
      return _this.prepare(n);
    });
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
    var a = d1.qq(this.opt.qLinks, n);
    var z = a.length;
    var first = 0;

    for (var i = 0; i < z; i++) {
      if (!a[i].vDone) {
        var s = d1.seq();
        if (!i) first = s;
        var p = d1.ins('a', '', {
          id: this.opt.idPrefix + s,
          href: '#' + this.opt.idPrefix + (i == z - 1 ? first : s + 1)
        }, g); //p.style.setProperty('--img', 'url("' + d1.attr(a[i], 'href') + '")');
        //p.style.backgroundImage = 'url("' + d1.attr(a[i], 'href') + '")';//preload all

        p.vLink = d1.attr(a[i], 'href'); //real link

        p.vImg = d1.attr(a[i], 'href'); //preload prev & next

        p.setAttribute(d1.opt.aCaption, (this.opt.num ? i + 1 + '/' + z + (a[i].title ? ' - ' : '') : '') + (a[i].title || ''));
        a[i].href = '#' + p.id;
        a[i].vDone = 1;
      }
    }

    d1.x(g);
    d1.b(d1.qq('a[id]', g), 'click', d1.gotoPrev);
    document.body.appendChild(g);
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
}();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*! d1 example plugin */
var d1 = __webpack_require__(0);

module.exports = new function () {
  "use strict";

  this.name = 'scroll';
  this.y = null;
  this.opt = {};

  this.init = function () {
    var _this = this;

    d1.listen('hash', function (e) {
      return _this.onHash(e);
    });
    var ons = d1.throttle(function () {
      return _this.onScroll();
    }, 500); //ons(); // forces reflow

    setTimeout(function () {
      return _this.onScroll();
    }, 20);
    d1.b([window], 'scroll', ons);
  };

  this.onHash = function (e) {
    //to hide topbar on hash change
    if (e) this.y = window.scrollY - 10; // fires before onscroll
  };

  this.onScroll = function () {
    var _this2 = this;

    //d1.dbg(['scroll on']);
    if (this.y !== null) {
      var dy = window.scrollY - this.y;
      d1.e('.topbar', function (n) {
        return _this2.decorate(n, window.scrollY, dy);
      });
    }

    this.y = window.scrollY; // forces reflow
  };

  this.decorate = function (n, y, dy) {
    n.classList[dy > 0 ? 'add' : 'remove']('hide');
    n.classList[y && dy <= 0 ? 'add' : 'remove']('box');
  };
}();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*! d1tablex */
// Filter and sort HTML table
// table.sort[data-filter] [data-filter-report][data-case][data-filter-cols]
// todo: optimize: bind to arrFunc, getAttribute to attr, querySelector(All) to q/qq
//       appendChild/insertBefore to ins
var d1 = __webpack_require__(0);

module.exports = new function () {
  "use strict";

  this.name = 'tablex';
  this.lang = '';
  this.skipComma = 0;
  this.opt = {
    aFilter: 'data-filter',
    cFilter: 'bg-w',
    // filter-on - non-empty filter field
    cScan: 'text-i',
    // col-scan - searchable columns' header (used if "data-filter-cols" is set)
    cShow: '',
    // row-show - matching row
    //cHide: 'hide', // row-hide - non-matching row (if not set the "display:none" is used)
    cSort: '',
    // col-sort - sortable column's header
    cAsc: 'bg-y',
    // col-asc - !non-empty! - header of currently sorted column (ascending)
    cDesc: 'bg-w',
    // col-desc - header of currently sorted column (descending)
    qSort: 'table.sort',
    wait: 200
  };

  this.init = function () {
    this.lang = d1.attr(document.documentElement, 'lang') || 'en';
    this.skipComma = this.lang == 'en'; //let t = document.querySelectorAll(this.opt.qSort + ', table[' + this.opt.aFilter + ']');
    //t.forEach(this.prepare.bind(this));
    //for (i = 0; i < t.length; i++) this.prepare(t[i]);

    d1.e(this.opt.qSort + ', table[' + this.opt.aFilter + ']', this.prepare.bind(this));
  };

  this.prepare = function (n) {
    var i,
        j,
        start = 0;
    var tb = n.querySelector('tbody');
    var rh = n.querySelector('thead tr');

    if (!rh) {
      rh = tb.rows[0];
      start = 1;
    }

    if (!rh || !tb || !tb.rows || tb.rows.length < 2) return;
    var a = [];
    var h = [];

    for (j = 0; j < rh.cells.length; j++) {
      h[j] = rh.cells[j]; //if (this.opt.cSort && this.isSortable(rh.cells[j])) h[j].classList.add(this.opt.cSort);
    } //let inp = d1.ins('input','',{type:'search',size:4},rh.cells[0]);


    n.vCase = n.getAttribute('data-case') !== null;
    var fq = n.getAttribute(this.opt.aFilter);
    n.vInp = fq ? document.querySelector(fq) : n.querySelector('[name="_q"]');

    if (n.vInp) {
      //n.vInp.onsearch = n.vInp.onkeyup = this.doFilter.bind(this,n);
      if (!n.vInp.vListen) n.vInp.addEventListener('input', this.doFilter.bind(this, n), false);
      n.vInp.vListen = 1;
      this.doFilter(n);
    }

    for (i = start; i < tb.rows.length; i++) {
      var c = tb.rows[i].cells;
      var row = [];

      for (j = 0; j < c.length; j++) {
        row[j] = this.val(c[j], n.vCase); //c[j].setAttribute('data-cell', row[j]);
      }

      a.push({
        d: row,
        n: tb.rows[i]
      }); //data,row_node
    }

    n.vData = a;
    n.vHead = h;

    if (n.classList.contains('sort')) {
      for (j = 0; j < h.length; j++) {
        if (this.isSortable(h[j])) {
          if (this.opt.cSort) h[j].classList.add(this.opt.cSort); //h[j].onclick = this.doSort.bind(this,n,h[j]);

          if (!h[j].vListen) h[j].addEventListener('click', this.doSort.bind(this, n, h[j]), false);
          h[j].vListen = 1;
        }
      }
    }
  };

  this.doFilter = function (t, e) {
    if (t.vPrev !== t.vInp.value || !e) {
      t.vPrev = t.vInp.value;
      if (this.opt.cFilter) t.vInp.classList[t.vPrev.length > 0 ? 'add' : 'remove'](this.opt.cFilter);
      clearTimeout(t.vTimeout);
      t.vTimeout = setTimeout(this.filter.bind(this, t, t.vInp.value), this.opt.wait);
    }
  };

  this.doSort = function (t, th, e) {
    if (e.target.closest ? !e.target.closest('a,input,select,label') : ' A INPUT SELECT LABEL '.indexOf(' ' + e.target.tagName + ' ') == -1) {
      //e.preventDefault();
      this.sort(t, th.cellIndex);
    }
  };

  this.isSortable = function (th) {
    //return this.val(th).length > 0;
    return !th.hasAttribute('data-unsort');
  };

  this.val = function (s, cs) {
    var r = s.tagName ? s.innerHTML : '' + s;
    r = r.replace(/<!--.*?-->/g, '').replace(/<.*?>/g, '').replace(/&nbsp;/gi, ' ').replace(/^\s+/, '').replace(/\s+$/, '');
    if (!cs) r = r.toLowerCase();
    return r;
  };

  this.filter = function (n, q) {
    var cnt = 0;
    var i, j, data, s, hide;

    if (!n.vCols) {
      n.vCols = n.getAttribute('data-filter-cols');
      n.vCols = n.vCols ? n.vCols.split(/\D+/) : false;
      if (n.vCols && this.opt.cScan) for (i = 0; i < n.vCols.length; i++) {
        if (n.vHead[n.vCols[i]]) n.vHead[n.vCols[i]].classList.add(this.opt.cScan);
      }
    }

    for (i = 0; i < n.vData.length; i++) {
      hide = 0;

      if (q !== '') {
        if (n.vCols.length > 0) {
          data = [];

          for (j = 0; j < n.vCols.length; j++) {
            data.push(n.vData[i].d[n.vCols[j]]);
          }
        } else data = n.vData[i].d;

        s = '|' + data.join('|') + '|';
        hide = !this.matches(s, q, n.vCase);
      }

      if (d1.opt.cHide) n.vData[i].n.classList[hide ? 'add' : 'remove'](d1.opt.cHide);else n.vData[i].n.style.display = hide ? 'none' : '';
      if (this.opt.cShow) n.vData[i].n.classList[hide ? 'remove' : 'add'](this.opt.cShow);
      if (!hide) cnt++;
    }

    if (n.vInp) {
      n.vInp.title = cnt + '/' + n.vData.length;
      var rep = n.getAttribute('data-filter-report');
      if (rep) rep = document.querySelector(rep);
      if (rep) rep.textContent = n.vInp.title;
    }
  };

  this.matches = function (s, q, cs) {
    if (q.substr(0, 1) == '=') return s.indexOf('|' + q.substr(1).toLowerCase() + '|') != -1;else if (q.indexOf('*') != -1) {
      q = '\\|' + q.replace(/\*/g, '.*') + '\\|';
      return new RegExp(q, cs ? '' : 'i').test(s);
    } else return s.indexOf(cs ? q : q.toLowerCase()) != -1;
  };

  this.sort = function (n, col, desc) {
    if (desc === undefined) desc = this.opt.cAsc && n.vHead[col].classList.contains(this.opt.cAsc);
    n.vData.sort(this.cmp.bind(this, col));
    if (desc) n.vData.reverse();

    for (var j = 0; j < n.vHead.length; j++) {
      this.mark(n.vHead[j], j == col ? desc ? -1 : 1 : 0);
    }

    this.build(n);
  };

  this.build = function (n) {
    var tb = n.querySelector('tbody');

    for (var i = 0; i < n.vData.length; i++) {
      tb.appendChild(n.vData[i].n);
    }
  };

  this.mark = function (h, d) {
    if (this.opt.cAsc) h.classList[d > 0 ? 'add' : 'remove'](this.opt.cAsc);
    if (this.opt.cDesc) h.classList[d < 0 ? 'add' : 'remove'](this.opt.cDesc);
  };

  this.cmp = function (by, a, b) {
    a = a.d[by];
    b = b.d[by]; //date?

    var mode = 'd';
    var aa = this.dt(a);
    var bb = this.dt(b);

    if (isNaN(aa) || isNaN(bb)) {
      //size?
      mode = 'b';
      aa = this.sz(a);
      bb = this.sz(b);
    }

    if (isNaN(aa) || isNaN(bb)) {
      //interval?
      mode = 'i';
      aa = this.interval(a);
      bb = this.interval(b);
    }

    if (isNaN(aa) || isNaN(bb)) {
      //number?
      mode = 'n';
      aa = this.nr(a);
      bb = this.nr(b);
    }

    if (isNaN(aa) || isNaN(bb)) {
      //string
      mode = 's';
      aa = a;
      bb = b;
    } //console.log('['+mode+'] A '+a+' = '+aa+' == '+(new Date(aa))+'; B '+b+' = '+bb+' == '+(new Date(bb)));


    return aa < bb ? -1 : aa > bb ? 1 : 0;
  };

  this.nr = function (s) {
    //use Number instead of parseFloat for more strictness
    s = this.skipComma ? s.replace(/(\$|,|\s)/g, '') : s.replace(/(\$|\s)/g, '').replace(',', '.');
    return parseFloat(s);
  };

  this.dt = function (s) {
    var m = s.match(/^(\d+)(\D)(\d+)\D(\d+)(\D(\d+))?(\D(\d+))?(\D(\d+))?(\D(\d+))?$/);

    if (m) {
      var x;
      if (m[2] == '.') x = [4, 3, 1]; //d.m.Y
      else if (m[2] == '/') x = [4, 1, 3]; //m/d Y
        else x = [1, 3, 4]; //Y-m-d

      var d = new Date(m[x[0]], m[x[1]] - 1, m[x[2]], m[6] || 0, m[8] || 0, m[10] || 0, m[12] || 0);
      return d ? d.getTime() : NaN;
    }

    return NaN;
  };

  this.interval = function (s) {
    var x = {
      msec: .001,
      ms: .001,
      s: 1,
      mi: 60,
      sec: 1,
      min: 60,
      h: 3600,
      d: 86400,
      w: 604800,
      m: 2592000,
      y: 31536000
    };
    var m = s.match(/^(\d+)\s*(y|m|w|d|h|min|mi|sec|s|ms|msec)$/i);
    if (m && x[m[2]]) return m[1] * x[m[2]];
    return NaN;
  };

  this.sz = function (s) {
    var x = {
      b: 1,
      kb: 1024,
      mb: 1048576,
      gb: 1073741824,
      tb: 1099511627776,
      pb: 1125899906842624
    };
    var m = s.match(/^((\d*\.)?\d+)\s*(([kmgtp]i?)?b)$/i);

    if (m) {
      m[3] = m[3].replace(/ib$/i, 'b').toLowerCase();
      if (x[m[3]]) return m[1] * x[m[3]];
    }

    return NaN;
  };
}();

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*! d1 live theme configurator */
var d1 = __webpack_require__(0);

module.exports = new function () {
  "use strict";

  this.name = 'theme';
  this.drw = null;

  this.init = function () {
    var _this = this;

    this.restore(document.documentElement, 'theme-html');
    this.restore(document.body, 'theme-body'); //button

    var a = d1.ins('a', 'Theme', {
      href: '#theme',
      className: 'fix pad btn theme-btn'
    }, document.body);
    var s = a.style;
    s.transform = 'rotate(-90deg)';
    s.transformOrigin = '100% 100%';
    s.top = '10vh';
    s.right = '-.2em';
    s.bottom = s.left = 'auto';
    s.margin = 0; //drawer

    this.drw = d1.ins('div', '', {
      id: 'theme',
      className: 'drawer toggle hide pad shift theme-drawer'
    }, document.body);
    d1.ins('a', '&#x2715;', {
      href: '#cancel',
      className: 'pad hover close'
    }, this.drw); //menu

    this.h('Theme', 2);
    d1.b([d1.ins('a', 'Reset to default', {
      href: '#',
      className: ''
    }, this.drw)], 'click', function (e) {
      return _this.unstyle(e);
    });
    this.put('Background', ['#fff', '#eee', '#ffeee6', '#ffe', '#efe', '#e6fcf9', '#e3eeff', '#f9e9ff'], '--bg');
    this.put('Menu', ['rgba(255,255,255,0)', 'rgba(0,0,0,.1)', 'hsla(1,100%,55%,.3)', 'hsla(45,100%,50%,.3)', 'hsla(120,100%,35%,.3)', 'hsla(180,100%,35%,.3)', 'hsla(220,100%,55%,.3)', 'hsla(290,100%,50%,.3)'], ['--bg-pane', '--bg-hilite']);
    this.put('Links', ['#000', '#777', '#c00', '#c60', '#090', '#088', '#00c', '#909'], ['--link', '--visited', '--hover']);
    this.put('Text', ['#000', '#222', '#444', '#555', '#666', '#777', '#888', '#999'], '--text');
    this.put('Font', ['sans-serif', 'serif', 'monospace', 'Roboto', 'Open Sans', 'Georgia', 'PT Sans', 'PT Serif', 'PT Mono'], 'font-family');
    this.put('Gaps', ['0.5', '0.7', '1', '1.2', '1.5'], '--gap');
  };

  this.restore = function (n, v) {
    var css = localStorage.getItem(v);
    if (css) n.style = css;
  };

  this.style = function (k, v, deep) {
    var _this2 = this;

    if (k instanceof Array) k.forEach(function (w) {
      return _this2.style(w, v, 1);
    });else {
      var n = k.substr(0, 2) == '--' ? document.documentElement : document.body;
      n.style.setProperty(k, v);
      localStorage.setItem('theme-' + n.tagName.toLowerCase(), n.style.cssText);
    }
  };

  this.unstyle = function (e) {
    e.preventDefault();
    document.documentElement.style = document.body.style = '';
    localStorage.removeItem('theme-html');
    localStorage.removeItem('theme-body');
  };

  this.h = function (s, l) {
    d1.ins('h' + (l || 1), s, {
      className: 'mar'
    }, this.drw);
  };

  this.put = function (hh, arr, func) {
    var _this3 = this;

    this.h(hh, 3);
    var c = [];
    arr.forEach(function (v
    /*, k*/
    ) {
      var color = v.match(/[#(]/);
      var a = d1.ins('a', color ? '' : v, {
        href: '#',
        title: v,
        className: color ? 'pad hover bord' : 'pad hover'
      }, _this3.drw);
      if (color) a.style.backgroundColor = v;else if (typeof func === 'string') a.style[func] = v;
      c.push(a);
    });
    d1.b(c, 'click', func instanceof Function ? func : function (e) {
      e.preventDefault();

      _this3.style(func, e.target.title);
    });
  };
}();

/***/ }),
/* 12 */
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

    d1.e(this.opt.qNav + ', ' + this.opt.qTre, function (n) {
      return _this.attachSubNav(n);
    }); //nav, tree: attach to links

    d1.e(this.opt.qGal + ':last-child', function (n) {
      return d1.x(n, 1);
    }); //gal: auto add close link

    d1.e(this.opt.qSubMem, function (n) {
      return n.classList.add(_this.opt.cMem);
    }); //initialize sub mem

    d1.e('[id]', function (n) {
      return _this.restoreVisibility(n);
    }); //restore visibility

    d1.e(this.opt.qTab + ':not(.hide) ~ [id]:not(.hide)', function (n) {
      return _this.tgl(n, 0);
    }); //undup tabs

    d1.e(this.opt.qTab + ':first-child', function (n) {
      return d1.a(n.parentNode.children).filter(function (m) {
        return d1.vis(m);
      }).length ? null : _this.tgl(d1.q(d1.q('a[href^="#"]', n.parentNode.previousElementSibling).hash), 1);
    }); //inactive tabs: show first

    d1.e('.' + this.opt.cToggle + '[id]', function (n) {
      return _this.hiliteLinks(n);
    }); //init links state
  };

  this.after = function (n) {
    this.shown = null; //let modal = d1.q(this.opt.qDlg+':not(.'+d1.opt.cHide+'), '+this.opt.qGal+':target'); // :target not updated after Esc key

    var modal = d1.q(this.opt.qDlg + ':not(.' + d1.opt.cHide + '), ' + this.opt.qGal + '[id="' + location.hash.substr(1) + '"]');
    var bar = window.innerWidth - document.documentElement.clientWidth; //scroll bar width

    var s = document.body.style;
    s.overflow = modal ? 'hidden' : '';
    if (!(modal && s.paddingRight)) s.paddingRight = modal ? '' + bar + 'px' : ''; // avoid width reflow

    d1.dbg(['after', n, modal, s.paddingRight]);

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
      return a.classList[op](d1.opt.cAct);
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
  }; //d1.plug(this);

}();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/*! d1 tools */
var d1 = __webpack_require__(0);

module.exports = new function () {
  "use strict";

  this.name = 'tools';
  this.opt = {
    minDesktop: 900
  };

  this.init = function () {
    var _this = this;

    d1.e('table[class]', function (n) {
      return _this.alignCells(n);
    });
    d1.e('[data-class]', function (n) {
      return _this.toggleClass(n);
    });
    d1.listen('click', function (e) {
      return _this.onClick(e);
    });
    this.onResize();
    d1.b([window], 'resize', function (e) {
      return _this.onResize(e);
    });
  };

  this.onClick = function (e) {
    var n = e.target;
    var a = d1.closest(n, '[data-class]');
    if (a) this.toggleClass(n, e);
  };

  this.alignCells = function (n) {
    var m = n.className.match(/\b[lcr]\d\d?\b/g);

    if (m) {
      var _loop = function _loop(i) {
        d1.e(d1.qq('tr>*:nth-child(' + m[i].substr(1) + ')', n), function (c) {
          return c.classList.add(m[i].substr(0, 1));
        });
      };

      for (var i = 0; i < m.length; i++) {
        _loop(i);
      }
    }
  };

  this.setClass = function (a, c, on, n) {
    n.classList[on ? 'add' : 'remove'](c);
    a.classList[on ? 'add' : 'remove'](d1.opt.cAct);
  };

  this.toggleClass = function (n, e) {
    var _this2 = this;

    var box = n.type == 'checkbox';
    var q = d1.attr(n, 'data-nodes', n.hash);
    var c = d1.attr(n, 'data-class');
    var on = box ? n.checked : n.classList.contains(d1.opt.cAct);

    if (e && !box) {
      on = !on;
      e.preventDefault();
    }

    if (c) d1.e(q, function (m) {
      return _this2.setClass(n, c, on, m);
    });
  };

  this.onResize = function () {
    var m = window.innerWidth <= this.opt.minDesktop;
    m ? d1.e('[data-class-mobile]', function (n) {
      return n.className = d1.attr(n, 'data-class-mobile');
    }) : d1.e('[data-class-desktop]', function (n) {
      return n.className = d1.attr(n, 'data-class-desktop');
    });
  };
}();

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var d1 = __webpack_require__(0);

['toggle', 'dialog', 'gallery'].forEach(function (p) {
  return d1.plug(__webpack_require__(1)("./" + p + ".js"));
}); //let opt = {hOk:'#yex', plug: {gallery: {idPrefix: 'imx-'}}};

d1.b([document], 'DOMContentLoaded', function (e) {
  return d1.init();
});
if (window) window.d1 = d1;

/***/ })
/******/ ]);