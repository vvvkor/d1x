let app = require('./js/app.js');

['toggle', 'dialog', 'gallery']
  .forEach(p => app.plug(require('./js/'+p+'.js')));

//let opt = {hOk:'#yex', plug: {gallery: {idPrefix: 'imx-'}}};
app.b([document], 'DOMContentLoaded', e => app.init(/*opt*/));

if (window) window.d1 = app;