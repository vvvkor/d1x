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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

/*! d1css v1.0.2 */
//require('../plugins/toggle.js'); 
(function (window, document, Element) {
  "use strict"; //check single instance

  if (window && window.d1) {
    console.log("d1 already included");
  } else {
    // begin module
    var main = new function () {
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
          obj.opt[i] = opt[i];
        }
      };

      this.plug = function (p) {
        this.plugins[p.name] = p;
      };

      this.initPlugins = function (opt) {
        var _this2 = this;

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
          className: this.opt.cClose + ' ' + (cls || '')
        }, d, pos);
      };

      this.vis = function (n) {
        return !n.classList.contains(this.opt.cHide);
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

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

var d1 = __webpack_require__(0);

d1.b([document], 'DOMContentLoaded', function (e) {
  return d1.init();
});

/***/ })

/******/ });