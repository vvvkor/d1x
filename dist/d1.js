/*! d1x v1.0.2 */
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*! d1css v1.0.2 */
(function (window, document, Element) {
  "use strict"; //check single instance

  if (window && window.d1) {
    console.log("d1 already included");
  } else {
    // begin module
    var main = new function () {
      this.sequence = 0;
      this.dlg = null;
      this.plugins = {}; //this.prevWidth = 0;

      this.opt = {
        dialog: 1,
        keepHash: 0
      };
      this.qs = {
        tgl: '.toggle[id]',
        pop: '.pop>div[id]',
        nav: '.nav.toggle ul',
        dlg: '.dlg',
        tab: '.tabs+div>[id]',
        tre: 'ul.toggle:not(.nav) ul',
        //'.tree ul',
        drw: '.drawer',
        acc: 'ul.accordion',
        acco: 'ul.accordion ul',
        alert: 'a.alert',
        dialog: 'a.dialog, input.dialog',
        gal: '.gal>a[id]',
        subMem: '.tabs.mem+div>[id], ul.mem:not(.nav) ul',
        aCaption: 'data-caption',
        aConfirm: '_confirm',
        aPrompt: 'data-prompt',
        cBtn: 'btn pad',
        cClose: 'close',
        cHide: 'hide',
        cJs: 'js',
        cMem: 'mem',
        cToggle: 'toggle',
        hClose: '#cancel',
        hOk: '#ok',
        iClose: '&#x2715;',
        //&times;
        iToggle: '[+]',
        sCancel: 'Cancel',
        sOk: 'OK'
      };

      this.init = function (d) {
        var _this = this;

        this.initPlugins(); //toggle

        var q = this.qs;
        this.qs.toggle = [q.tgl, q.pop, q.nav, q.dlg, q.tab, q.tre, q.drw
        /*, q.gal*/
        ].join(', ');
        this.qs.autohide = [q.pop, q.nav, q.dlg, q.tab, q.acco, q.drw
        /*, q.gal*/
        ].join(', ');
        this.qs.unpop = [q.pop, q.nav, q.dlg, q.drw
        /*, q.gal*/
        ].join(', ');
        this.e(this.qs.toggle, function (n) {
          return n.classList.add(_this.qs.cToggle);
        }); //initialize togglers

        this.e(this.qs.autohide, function (n) {
          return _this.tgl(n, 0);
        }); //autohide

        this.e(this.qs.nav + ', ' + this.qs.tre, this.attachSubNav); //nav, tree: attach to links

        this.e(this.qs.gal + ':last-child', function (n) {
          return _this.insClose(n, 1);
        }); //gal: auto add close link

        this.e(this.qs.subMem, function (n) {
          return n.classList.add(_this.qs.cMem);
        }); //initialize sub mem

        this.e('[id]', this.restoreVisibility); //restore visibility

        this.onHash(); //activate hash

        this.e(this.qs.tab + ':not(.hide) ~ [id]:not(.hide)', function (n) {
          return _this.tgl(n, 0);
        }); //undup tabs

        this.e(this.qs.tab + ':first-child', function (n) {
          return _this.a(n.parentNode.children).filter(function (m) {
            return _this.vis(m);
          }).length ? null : _this.tgl(_this.q(_this.q('a[href^="#"]', n.parentNode.previousElementSibling).hash), 1);
        }); //inactive tabs: show first

        this.e('.' + this.qs.cToggle + '[id]', this.hiliteLinks); //init links state
        //bind events

        this.b([window], 'hashchange', this.onHash);
        this.b([document], 'keydown', this.onKey);
        this.b([document], 'click', this.onClick); //prepare body

        document.body.classList.add(this.qs.cJs); //anti:hover, anti:target

        this.afterAction();
      };

      this.plug = function (p) {
        this.plugins[p.name] = p;
      };

      this.initPlugins = function (opts) {
        var _this2 = this;

        Object.keys(this.plugins).forEach(function (k) {
          return _this2.plugins[k].init({});
        }); // todo: avoid {}
      }; //utils


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
        var _this3 = this;

        if (typeof nn === 'string') nn = this.qq(nn);else if (nn.tagName) nn = [nn];else nn = this.a(nn);
        if (nn && f) nn.forEach(function (n) {
          return e ? n.addEventListener(e, f.bind(_this3
          /*, n*/
          ), false) : f.call(_this3, n);
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

      this.insClose = function (d, pos, cls) {
        return this.ins('a', this.qs.iClose, {
          href: this.qs.hClose,
          className: this.qs.cClose + ' ' + (cls || '')
        }, d, pos);
      }; //toggle


      this.vis = function (n) {
        return !n.classList.contains(this.qs.cHide);
      };

      this.attachSubNav = function (n) {
        //var a = n.previousElementSibling;
        var aa = this.a(n.parentNode.children).filter(function (v) {
          return v.tagName == 'A';
        });
        var a = aa.filter(function (v) {
          return !v.href;
        })[0] || aa[0] || this.ins('', ' ', {}, n.parentNode, false) && this.ins('a', this.qs.iToggle, {}, n.parentNode, false);

        if (a) {
          if (!n.id) n.id = 'ul-' + this.seq();
          a.href = '#' + n.id;
        }
      };

      this.curDialog = function () {
        return this.q(this.qs.dlg + ':not(.' + this.qs.cHide + ')');
      };

      this.curGallery = function () {
        return this.q(this.qs.gal + ':target');
      };

      this.afterAction = function (n) {
        var d = this.curDialog();
        var g = d ? this.curGallery() : null;
        document.body.style.overflow = d || g ? 'hidden' : '';

        if (d) {
          var f = this.q('input, a:not(.' + this.qs.cClose + ')', d);
          if (f) f.focus();
        }
      };

      this.onHash = function (e) {
        if (location.hash) {
          var d = this.q(location.hash);

          if (d && d.matches(this.qs.tgl)) {
            this.unpop();
            this.toggle(d, true);
            if (!this.opt.keepHash) this.unhash();
            this.afterAction();
          }
        }
      };

      this.onKey = function (e) {
        var k = e.keyCode;

        if (k == 27) {
          this.unpop();
          this.unhash();
          this.afterAction();
        }
      }; //event delegation
      //https://gomakethings.com/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/


      this.onClick = function (e) {
        var d = null;
        var n = e.target;
        var a = this.closest(n, 'a');
        var as = this.closest(n, 'a, input, button');
        var d = a && a.matches('a[href^="#"]') ? this.q(a.hash) : null;
        this.unpop([a, n, d]);
        if (n.matches(this.qs.gal)) this.onClickGal(e);else if (d && d.matches(this.qs.tgl)) {
          var d = this.q(a.hash);

          if (d && d.matches(this.qs.tgl)) {
            e.preventDefault();
            d = this.toggle(d);
            if (this.vis(d) && this.opt.keepHash) this.addHistory(a.hash);else this.unhash();
          }
        } else if (as && as.matches(this.qs.alert + ',' + this.qs.dialog)) {
          //d = this.dialog(e, a, (n, v) => !console.log(v) && this.unpop()); //custom callback
          e.preventDefault();
          d = this.dialog(as);
        } else if (!d && !as) {
          this.unhash();
        }
        this.afterAction(d);
      }; //deep: -1=prepare, 0=click|hash, 1=deps|clo


      this.toggle = function (h, on, deep) {
        var d = h ? h.tagName ? h : this.q(h) : null;

        if (d) {
          if (d.matches(this.qs.tab) && on === undefined) on = true; //tabs: show instead of toggle
          //console.log('toggle '+d.id, on, deep);
          //d.classList.add('toggle');//anti:target
          //this.prevWidth = window.innerWidth;

          d.classList[on ? 'remove' : on === undefined ? 'toggle' : 'add'](this.qs.cHide);
          if (this.vis(d)) this.fixPosition(d);

          if (deep != -1) {
            if (!deep) this.toggleDependent(d);
            this.hiliteLinks(d);
            this.storeVisibility(d); //if(!deep) this.afterAction(d);
          }
        }

        return d;
      };

      this.tgl = function (d, on) {
        if (d) d.classList[on ? 'remove' : on === undefined ? 'toggle' : 'add'](this.qs.cHide);
      };

      this.toggleDependent = function (d) {
        var _this4 = this;

        if (this.vis(d)) {
          if (d.matches(this.qs.dlg)) this.e(this.qs.dlg, function (n) {
            return n == d ? null : _this4.toggle(n, false, 1);
          }); //hide other dialogs
          else if (d.matches(this.qs.tab)) this.e(d.parentNode.children, function (n) {
              return n == d ? null : _this4.toggle(n, false, 1);
            }); //hide sibling tabs
            else if (d.matches(this.qs.acco)) this.e(this.qq(this.qs.acco, this.closest(d, this.qs.acc)), function (n) {
                return n.contains(d) ? null : _this4.toggle(n, false, 1);
              }); //hide other ul
        }
      };

      this.unpop = function (keep) {
        var _this5 = this;

        if (keep && keep[0] && keep[0].hash == this.qs.hClose) keep = []; //to close all, even container

        this.e(this.qs.unpop, function (n) {
          return keep && keep.filter(function (m) {
            return m && m.tagName && n.contains(m);
          }).length ? null : _this5.toggle(n, false, 1);
        });
      };

      this.unhash = function () {
        //if(location.hash) location.hash = this.qs.hClose;
        this.addHistory(location.pathname + location.search);
      };

      this.addHistory = function (h) {
        history.pushState({}, '', h); //following required to re-render hash changes (test: open gallery, esc)

        history.pushState({}, '', h);
        history.go(-1);
      };

      this.storeVisibility = function (n) {
        if (n.classList.contains(this.qs.cMem)) {
          localStorage.setItem('vis#' + n.id, this.vis(n) ? 1 : -1);
        }
      };

      this.restoreVisibility = function (n) {
        if (n.classList.contains(this.qs.cMem)) {
          var v = localStorage.getItem('vis#' + n.id);
          if (v) this.toggle(n, v > 0, -1);
        }
      };

      this.hiliteLinks = function (d) {
        var op = this.vis(d) ? 'add' : 'remove';
        this.e('a[href="#' + d.id + '"]', function (a) {
          return a.classList[op]('act');
        });
      };

      this.fixPosition = function (n) {
        var nav = n.matches(this.qs.nav);
        var ss = nav ? window.getComputedStyle(n.parentNode.parentNode) : null;
        var vert = ss ? ss.display != 'flex' : false;

        if (n.matches(this.qs.pop) || nav) {
          var s = n.style;
          var p = n.parentNode;
          var i = p.nextElementSibling;
          var i = i && i.tagName == 'INPUT' ? i : null;
          var r = i || n.parentNode;

          if (r) {
            s.right = 'auto';
            s.left = vert ? '100%' : 0;
            s.top = vert ? 0 : '100%';
            var qn = n.getBoundingClientRect();
            var qr = r.getBoundingClientRect();
            var dx = qn.right > window.innerWidth; //var dx = (qn.right > (this.prevWidth || window.innerWidth));

            var dy = qn.bottom > window.innerHeight; //x

            if (vert) s.left = dx ? '3em' : '100%';else if (dx && qn.width > qr.width && qr.right > qn.width) {
              //if(overflows-right && wider-then-container && enough-place-on-the-left) pop-left
              s.left = qr.width - qn.width + 'px';
            } else s.left = 0; //y

            if (vert) s.top = dx ? '90%' : 0;else if (dy && qr.top > qn.height) {
              //if(overflows-bottom && enough-place-on-the-top) pop-top
              s.top = (i ? -qr.height : 0) - qn.height + 'px';
            } else s.top = '100%';
            if (i) p.style.verticalAlign = 'bottom';
          }
        }
      };

      this.onClickGal = function (e) {
        var n = e.target;

        if (e.clientX < n.clientWidth / 3) {
          if (this.prevImg(n)) e.preventDefault();
        }
      };

      this.prevImg = function (n) {
        var p = n.previousElementSibling || this.qq('a[id]', n.parentNode).pop();
        if (p.id) location.hash = '#' + p.id;
        return p.id;
      }; //dialog


      this.initDlg = function (n, h, t, f, def, rev) {
        var _this6 = this;

        if (!this.dlg) this.dlg = this.ins('div', '', {
          className: 'dlg toggle'
        }, document.body);
        var c,
            d = this.dlg;

        while (c = d.firstChild) {
          d.removeChild(c);
        }

        var hh = this.ins('div', '', {
          className: 'row bg'
        }, d);
        this.ins('h3', h || '', {
          className: 'let pad'
        }, hh);
        this.insClose(hh, 0, 'pad hover col-0');
        var b = this.ins('div', '', {
          className: 'pad'
        }, d);
        if (t) this.ins('div', t, {}, b);
        var inp = {
          value: true
        };
        if (def || def === '') inp = this.ins('input', '', {
          value: def
        }, b);
        var bb = this.ins('p', '', {
          className: 'r'
        }, b);
        var warn = this.qs.cBtn + ' ' + (t.substr(0, 1) == ' ' || n.className.match(/-[we]\b/) ? 'bg-e' : 'bg-y');
        var sec = this.qs.cBtn + ' bg-n';
        var yes = this.ins('a', this.attr(n, 'data-ok', this.qs.sOk), {
          href: this.qs.hClose,
          className: rev ? sec : warn
        }, bb);

        if (f) {
          var no = this.ins('a', this.attr(n, 'data-cancel', this.qs.sCancel), {
            href: this.qs.hClose,
            className: rev ? warn : sec
          }, yes, rev ? -1 : 1);
          this.ins('', ' ', {}, yes, rev ? -1 : 1);
          yes.href = this.qs.hOk;
          this.b([yes], 'click', function (e) {
            e.preventDefault();
            f.call(_this6, inp.value);
          });
          if (inp.tagName) this.b([inp], 'keyup', function (e) {
            return e.keyCode == 13 ? f.call(_this6, inp.value, e) : null;
          });
        }

        this.toggle(this.dlg, true);
      };

      this.dialog = function (n, f) {
        if (n.form && !n.form.checkValidity()) {
          n.form.reportValidity();
          return;
        }

        var p = this.attr(n, 'data-prompt');
        var t = this.attr(n, 'data-caption', n.title || p || '!');
        var rev = this.attr(n, 'data-reverse');
        var src = this.attr(n, 'data-src');
        src = src ? this.q(src) : null;
        if (!src && n.form) src = n.form.elements[p];
        var v = null;
        var al = n.matches(this.qs.alert);
        var def = p ? src ? src.value : this.get(n, p) : null;

        if (this.opt.dialog) {
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
                var i = n.form.elements[p] || this.ins('input', '', {
                  type: 'hidden',
                  name: p
                }, n.form);
                if (i) i.value = v;
              }

              if (n.form.reportValidity()) {
                this.ins('input', '', {
                  type: 'hidden',
                  name: n.name,
                  value: n.value
                }, n.form);
                n.form.elements[this.qs.aConfirm] || this.ins('input', '', {
                  type: 'hidden',
                  name: this.qs.aConfirm,
                  value: 1
                }, n.form);
                n.form.submit();
              } else this.unpop(); //n.click();

            } //goto link
            else if (n.href) {
                var ha = this.attr(n, 'href').substr(0, 1) == '#';
                var bl = n.target == '_blank';
                if (ha || bl) this.unpop();
                if (ha) u = n.hash;else {
                  var a = {};
                  a[this.qs.aConfirm] = 1;
                  if (v !== true) a[p] = v;
                  var u = this.makeUrl(n, a);
                }
                if (n.target == '_blank') window.open(u, n.target);else location.href = u;
              }
      };

      this.get = function (a, g) {
        if (!a || a.tagName != 'A') return null;
        var i,
            gets = {};
        var args = a.search ? a.search.replace(/^\?/, '').split('&') : [];

        for (i = 0; i < args.length; i++) {
          var v = args[i].split('=');
          gets[v[0]] = decodeURIComponent(v[1]).replace(/\+/, ' ');
        }

        return g ? gets[g] : gets; //protocol, host (hostname,port), pathname, search, hash
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
    }(); // end module
    // var isNode    = (typeof module !== 'undefined' && this.module !== module); // use module or global
    // var isBrowser = (typeof window !== 'undefined' && this.window === this);

    if (true) {
      //console.log("npm require d1", module);
      module.exports = main;
    } else {}
  }
})(window, document, Element);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var d1 = __webpack_require__(0);

__webpack_require__(2);

__webpack_require__(3);

d1.b([document], 'DOMContentLoaded', d1.init);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*! d1tablex */

/* Filter and sort HTML table */
//table.sort[data-filter][data-filter-report][data-case][data-filter-cols]
if (true) var d1 = __webpack_require__(0);

(function () {
  main = new function () {
    "use strict";

    this.name = 'tablex';
    this.lang = '';
    this.skipComma = 0;
    this.opt = {
      attrFilter: 'data-filter',
      cFilter: 'bg-w',
      // filter-on - non-empty filter field
      cScan: 'text-i',
      // col-scan - searchable columns' header (used if "data-filter-cols" is set)
      cShow: '',
      // row-show - matching row
      cHide: 'hide',
      // row-hide - non-matching row (if not set the "display:none" is used)
      cSort: '',
      // col-sort - sortable column's header
      cAsc: 'bg-y',
      // col-asc - !non-empty! - header of currently sorted column (ascending)
      cDesc: 'bg-w',
      // col-desc - header of currently sorted column (descending)
      qsSort: 'table.sort',
      wait: 200
    };

    this.init = function (opt) {
      var i;

      for (i in opt) {
        this.opt[i] = opt[i];
      }

      this.lang = document.documentElement.getAttribute('lang') || 'en';
      this.skipComma = this.lang == 'en';
      var t = document.querySelectorAll(this.opt.qsSort + ', table[' + this.opt.attrFilter + ']'); //t.forEach(this.prepare.bind(this));

      for (i = 0; i < t.length; i++) {
        this.prepare(t[i]);
      }
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
      } //var inp = d1.ins('input','',{type:'search',size:4},rh.cells[0]);


      n.vCase = n.getAttribute('data-case') !== null;
      var fq = n.getAttribute(this.opt.attrFilter);
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
          row[j] = this.val(c[j], n.vCase);
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

        if (this.opt.cHide) n.vData[i].n.classList[hide ? 'add' : 'remove'](this.opt.cHide);else n.vData[i].n.style.display = hide ? 'none' : '';
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
      s = this.skipComma ? s.replace(/(\$|\,|\s)/g, '') : s.replace(/(\$|\s)/g, '').replace(',', '.');
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

    d1.plug(this);
  }();
  if (true) module.exports = main;else {}
})();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*! d1gallery https://github.com/vvvkor/d1gallery */

/* Lighweight image gallery */
//.gallery a.pic
if (true) var d1 = __webpack_require__(0);

(function () {
  var main = new function () {
    "use strict";

    this.name = 'gallery';
    this.opt = {
      cGallery: 'gal',
      hashCancel: '#cancel',
      idPrefix: 'pic',
      num: true,
      qsGallery: '.gallery',
      qsLinks: 'a.pic'
    };
    this.seq = 0;

    this.init = function (opt) {
      var i;

      for (i in opt) {
        this.opt[i] = opt[i];
      }

      d1.e(this.opt.qsGallery, this.prepare.bind(this));
      d1.b([document], 'keydown', this.key.bind(this));
      d1.b([window], 'hashchange', this.loadTarget.bind(this));
      if (location.hash) this.loadTarget();
    };

    this.loadTarget = function () {
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
        className: this.opt.cGallery
      });
      var a = n.querySelectorAll(this.opt.qsLinks);
      var z = a.length;

      for (var i = 0; i < z; i++) {
        if (!a[i].vDone) {
          this.seq++;
          var p = d1.ins('a', '', {
            id: this.opt.idPrefix + this.seq,
            href: '#' + this.opt.idPrefix + (this.seq + 1 - (i == z - 1 ? z : 0))
          }, g); //p.style.setProperty('--img', 'url("' + a[i].getAttribute('href') + '")');
          //p.style.backgroundImage = 'url("' + a[i].getAttribute('href') + '")';//preload all

          p.vLink = a[i].getAttribute('href'); //real link

          p.vImg = a[i].getAttribute('href'); //preload prev & next

          p.setAttribute('data-caption', (this.opt.num ? i + 1 + '/' + z + (a[i].title ? ' - ' : '') : '') + (a[i].title || ''));
          a[i].href = '#' + p.id;
          a[i].vDone = 1;
        }
      }

      d1.insClose(g);
      d1.b(d1.qq('a[id]', g), 'click', d1.gotoPrev);
      document.querySelector('body').appendChild(g);
    };

    this.key = function (e) {
      if (location.hash) {
        var a = d1.q(location.hash);

        if (a && a.hash) {
          var k = e.keyCode;
          if (k == 37 || k == 38) d1.prevImg(a);else if (k == 39 || k == 40) location.hash = a.hash; //a.click();
          else if (k == 8 && a.vLink) location.href = a.vLink; //e.preventDefault();
        }
      }
    };

    d1.plug(this);
  }();
  if (true) module.exports = main;else {}
})();

/***/ })
/******/ ]);