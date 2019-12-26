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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
        customDialog: 1,
        keepHash: 0,
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
        qAlert: 'a.alert',
        qDialog: 'a.dialog, input.dialog',
        qGal: '.gal>a[id]',
        qSubMem: '.tabs.mem+div>[id], ul.mem:not(.nav) ul',
        aCaption: 'data-caption',
        aConfirm: '_confirm',
        aPrompt: 'data-prompt',
        cBtn: 'btn pad',
        cClose: 'close',
        cGal: 'gal',
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

      this.init = function (opt) {
        var _this = this;

        //options
        var i;

        if (!opt) {
          opt = this.attr(document.body, 'data-d1');
          if (opt) opt = JSON.parse(opt);
        }

        if (opt) for (i in opt) {
          this.opt[i] = opt[i];
        } //plugins

        this.initPlugins(opt); //toggle

        var q = this.opt;
        this.opt.qToggle = [q.qTgl, q.qPop, q.qNav, q.qDlg, q.qTab, q.qTre, q.qDrw
        /*, q.qGal*/
        ].join(', ');
        this.opt.qAutohide = [q.qPop, q.qNav, q.qDlg, q.qTab, q.qAcc, q.qDrw
        /*, q.qGal*/
        ].join(', ');
        this.opt.qUnpop = [q.qPop, q.qNav, q.qDlg, q.qDrw
        /*, q.qGal*/
        ].join(', ');
        this.e(this.opt.qToggle, function (n) {
          return n.classList.add(_this.opt.cToggle);
        }); //initialize togglers

        this.e(this.opt.qAutohide, function (n) {
          return _this.tgl(n, 0);
        }); //autohide

        this.e(this.opt.qNav + ', ' + this.opt.qTre, this.attachSubNav); //nav, tree: attach to links

        this.e(this.opt.qGal + ':last-child', function (n) {
          return _this.insClose(n, 1);
        }); //gal: auto add close link

        this.e(this.opt.qSubMem, function (n) {
          return n.classList.add(_this.opt.cMem);
        }); //initialize sub mem

        this.e('[id]', this.restoreVisibility); //restore visibility

        this.onHash(); //activate hash

        this.e(this.opt.qTab + ':not(.hide) ~ [id]:not(.hide)', function (n) {
          return _this.tgl(n, 0);
        }); //undup tabs

        this.e(this.opt.qTab + ':first-child', function (n) {
          return _this.a(n.parentNode.children).filter(function (m) {
            return _this.vis(m);
          }).length ? null : _this.tgl(_this.q(_this.q('a[href^="#"]', n.parentNode.previousElementSibling).hash), 1);
        }); //inactive tabs: show first

        this.e('.' + this.opt.cToggle + '[id]', this.hiliteLinks); //init links state
        //bind events

        this.b([window], 'hashchange', this.onHash);
        this.b([document], 'keydown', this.onKey);
        this.b([document], 'click', this.onClick); //prepare body

        document.body.classList.add(this.opt.cJs); //anti:hover, anti:target

        this.afterAction();
      };

      this.plug = function (p) {
        this.plugins[p.name] = p;
      };

      this.initPlugins = function (opt) {
        var _this2 = this;

        Object.keys(this.plugins).forEach(function (k) {
          return _this2.plugins[k].init(opt && opt.plug && opt.plug[k] ? opt.plug[k] : null);
        });
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
        return this.ins('a', this.opt.iClose, {
          href: this.opt.hClose,
          className: this.opt.cClose + ' ' + (cls || '')
        }, d, pos);
      }; //toggle


      this.vis = function (n) {
        return !n.classList.contains(this.opt.cHide);
      };

      this.attachSubNav = function (n) {
        //var a = n.previousElementSibling;
        var aa = this.a(n.parentNode.children).filter(function (v) {
          return v.tagName == 'A';
        });
        var a = aa.filter(function (v) {
          return !v.href;
        })[0] || aa[0] || this.ins('', ' ', {}, n.parentNode, false) && this.ins('a', this.opt.iToggle, {}, n.parentNode, false);

        if (a) {
          if (!n.id) n.id = 'ul-' + this.seq();
          a.href = '#' + n.id;
        }
      };

      this.curDialog = function () {
        return this.q(this.opt.qDlg + ':not(.' + this.opt.cHide + ')');
      };

      this.curGallery = function () {
        //return this.q(this.opt.qGal+':target');
        return this.q(this.opt.qGal + '[id="' + location.hash.substr(1) + '"]');
      };

      this.afterAction = function (n) {
        var d = this.curDialog();
        var g = d ? null : this.curGallery();
        document.body.style.overflow = d || g ? 'hidden' : '';

        if (d) {
          var f = this.q('input, a:not(.' + this.opt.cClose + ')', d);
          if (f) f.focus();
        }
      };

      this.onHash = function (e) {
        if (location.hash) {
          var d = this.q(location.hash);

          if (d) {
            var t = d.matches(this.opt.qTgl);
            var g = d.matches(this.opt.qGal);

            if (t || g) {
              this.unpop();

              if (t) {
                this.toggle(d, true);
                if (!this.opt.keepHash) this.unhash();
              }

              this.afterAction();
            }
          } else if (location.hash == this.opt.hClose) {
            this.unpop();
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
        if (n.matches(this.opt.qGal)) this.onClickGal(e);else if (d && d.matches(this.opt.qTgl)) {
          e.preventDefault();
          d = this.toggle(d);
          if (this.vis(d) && this.opt.keepHash) this.addHistory(a.hash);else this.unhash();
        } else if (as && as.matches(this.opt.qAlert + ',' + this.opt.qDialog)) {
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
          if (d.matches(this.opt.qTab) && on === undefined) on = true; //tabs: show instead of toggle
          //console.log('toggle '+d.id, on, deep);
          //d.classList.add('toggle');//anti:target
          //this.prevWidth = window.innerWidth;

          d.classList[on ? 'remove' : on === undefined ? 'toggle' : 'add'](this.opt.cHide);
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
        if (d) d.classList[on ? 'remove' : on === undefined ? 'toggle' : 'add'](this.opt.cHide);
      };

      this.toggleDependent = function (d) {
        var _this4 = this;

        if (this.vis(d)) {
          if (d.matches(this.opt.qDlg)) this.e(this.opt.qDlg, function (n) {
            return n == d ? null : _this4.toggle(n, false, 1);
          }); //hide other dialogs
          else if (d.matches(this.opt.qTab)) this.e(d.parentNode.children, function (n) {
              return n == d ? null : _this4.toggle(n, false, 1);
            }); //hide sibling tabs
            else if (d.matches(this.opt.qAcc)) this.e(this.qq(this.opt.qAcc, this.closest(d, this.opt.qAccRoot)), function (n) {
                return n.contains(d) ? null : _this4.toggle(n, false, 1);
              }); //hide other ul
        }
      };

      this.unpop = function (keep) {
        var _this5 = this;

        if (keep && keep[0] && keep[0].hash == this.opt.hClose) keep = []; //to close all, even container

        this.e(this.opt.qUnpop, function (n) {
          return keep && keep.filter(function (m) {
            return m && m.tagName && n.contains(m);
          }).length ? null : _this5.toggle(n, false, 1);
        });
      };

      this.unhash = function () {
        //if(location.hash) location.hash = this.opt.hClose;
        this.addHistory(location.pathname + location.search);
      };

      this.addHistory = function (h) {
        history.pushState({}, '', h); //following required to re-render hash changes (test: open gallery, esc)

        history.pushState({}, '', h);
        history.go(-1);
      };

      this.storeVisibility = function (n) {
        if (n.classList.contains(this.opt.cMem)) {
          localStorage.setItem('vis#' + n.id, this.vis(n) ? 1 : -1);
        }
      };

      this.restoreVisibility = function (n) {
        if (n.classList.contains(this.opt.cMem)) {
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
        var nav = n.matches(this.opt.qNav);
        var ss = nav ? window.getComputedStyle(n.parentNode.parentNode) : null;
        var vert = ss ? ss.display != 'flex' : false;

        if (n.matches(this.opt.qPop) || nav) {
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

        if (e.clientX > 0
        /* not Enter key */
        && e.clientX < n.clientWidth / 3) {
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
        var warn = this.opt.cBtn + ' ' + (t.substr(0, 1) == ' ' || n.className.match(/-[we]\b/) ? 'bg-e' : 'bg-y');
        var sec = this.opt.cBtn + ' bg-n';
        var yes = this.ins('a', this.attr(n, 'data-ok', this.opt.sOk), {
          href: this.opt.hClose,
          className: rev ? sec : warn
        }, bb);

        if (f) {
          var no = this.ins('a', this.attr(n, 'data-cancel', this.opt.sCancel), {
            href: this.opt.hClose,
            className: rev ? warn : sec
          }, yes, rev ? -1 : 1);
          this.ins('', ' ', {}, yes, rev ? -1 : 1);
          yes.href = this.opt.hOk;
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
        var al = n.matches(this.opt.qAlert);
        var def = p ? src ? src.value : this.get(n, p) : null;

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
                n.form.elements[this.opt.aConfirm] || this.ins('input', '', {
                  type: 'hidden',
                  name: this.opt.aConfirm,
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
                  a[this.opt.aConfirm] = 1;
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
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var d1 = __webpack_require__(0);

d1.b([document], 'DOMContentLoaded', d1.init);

/***/ })
/******/ ]);