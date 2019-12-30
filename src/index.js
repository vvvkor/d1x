let d1 = require('./d1.js');
//let plugins = [
  require('./plugins/toggle.js'),
  require('./plugins/dialog.js'),
  require('./plugins/tablex.js'),
  require('./plugins/gallery.js')
  require('./plugins/scroll.js')
//];
//plugins.forEach(p => d1.plug(p));
d1.b([document], 'DOMContentLoaded', e => d1.init());
//d1.b([document], 'DOMContentLoaded', d1.init.bind(d1, {hOk:'#yex', plug: {gallery: {idPrefix: 'imx-'}}}));

if (window) window.d1 = d1;