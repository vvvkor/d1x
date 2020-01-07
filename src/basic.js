let d1 = require('./js/d1.js');

['toggle', 'dialog', 'gallery']
  .forEach(p => d1.plug(require('./js/'+p+'.js')));

//let opt = {hOk:'#yex', plug: {gallery: {idPrefix: 'imx-'}}};
d1.b([document], 'DOMContentLoaded', e => d1.init(/*opt*/));

if (window) window.d1 = d1;