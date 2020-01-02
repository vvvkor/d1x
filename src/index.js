let d1 = require('./d1.js');

['toggle', 'dialog', 'gallery', 'table', 'scroll', 'tools', 'theme']
  .forEach(p => d1.plug(require('./plugins/'+p+'.js')));

//let opt = {hOk:'#yex', plug: {gallery: {idPrefix: 'imx-'}}};
d1.b([document], 'DOMContentLoaded', e => d1.init(/*opt*/));

if (window) window.d1 = d1;