/*! code - source code sample */

let app = require('./app.js');

module.exports = new(function () {

  "use strict";

  this.name = 'code';

  this.langs = {
    html: {
      nm: 'HTML',
      e: /[a-z0-9_\-]+(?==")/g, // attr name
      w: /".*?"/g, // attr value
      i: /&lt;[^!A-Z].*?&gt;/g, // tag |&amp;[\w#]+;
      n: /&lt;\!.*?&gt;/g // comment
    },
    js: {
      nm: 'Javascript',
      e: /(\b|\b\d+\.|\.)\d+\b/g, // number
      w: /".*?"/g, // string // |'.*?'
      y: /[{}()\[\]]/g, // bracket
      i: /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|finally|for|function|if|import|in|instanceof|new|return|super|switch|this|throw|try|typeof|var|void|while|with|yield|let|await|null|undefined|true|false|arguments|get|set)\b/g, // keyword
      n: /\/\*[\s\S]*?\*\/|(\/\/|#\!)[^\n]*/g // comment
    },
    css: {
      nm: 'CSS',
      e: /#[\w\-]+/g, // id, color
      w: /((@\w+|\!important)|\b(none|inherit|initial|unset|attr|url|calc|var|rgba?|hsla?))\b/g, // keyword
      y: /[{}()]/g, // brackets
      i: /\.[\w\-]+/g, // class
      n: /\/\*.*?\*\//g // comment
    }
  };

  this.opt = {
    aLang: 'data-lang',
    defLang: 'html',
    qCode: '.code'
  };

  this.init = function () {
    app.e(this.opt.qCode, n => this.showCode(n));
    app.e('code[class*="language-"]', n => n.innerHTML = this.hilite(this.spaces(n.textContent), app.a(n.classList).filter(c => c.match(/language-/))[0].substr(9)));
    app.listen('updated', e => this.update(e.q));
  }

  this.showCode = function(src){
    let lang = app.attr(src, this.opt.aLang, this.opt.defLang);
    let t = this.spaces(src.innerHTML);
    if(!src.vCode){
      let cont = app.ins('div', '', {classList: 'bord'}, src, 1);
      cont.appendChild(src);
      src.classList.add('pad');
      let id = 'code-' + app.seq();
      app.ins('div', app.ins('a', (this.langs[lang] ? this.langs[lang].nm : lang) || lang, {className: 'pad', href: '#'+id}), {className: '-r bg small'}, cont);
      let pre = app.ins('pre', '', {className: app.opt.cToggle + ' ' + app.opt.cOff + ' fit pad', id: id}, cont);
      let cod = app.ins('code', '', {className: 'language-' + lang}, pre);
      src.vCode = cod;
    }
    //src.vCode.textContent = t;
    src.vCode.innerHTML = this.hilite(t, lang);
  }
  
  this.spaces = function(s){
    return s
      .replace(/^\s*\r?\n|\s+$/g, '')
      .replace(/\t/g, '  ');
      //.replace(/=""/g, '');
  }
  
  this.update = function(q){
    let p = app.closest(app.q(q), this.opt.qCode);
    if(p) this.showCode(p);
  }
  
  this.hilite = function(t, lang, pre){
    let l = this.langs[lang];
    let d = app.ins('div');
    d.textContent = t;
    t = d.innerHTML;
    if(l) ['e', 'w', 'y', 'i', 'n'].forEach(c => t = l[c] ? t.replace(l[c], m => this.token(c, m)) : t)
    return t;
  }
  
  this.token = function(c, m){
    return "<Span Class='text-" + c + "'>" + m + "</Span>";
  }

})();