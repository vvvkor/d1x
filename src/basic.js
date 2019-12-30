let d1 = require('./d1.js');
require('./plugins/toggle.js'),
require('./plugins/dialog.js'),
require('./plugins/gallery.js')
d1.b([document], 'DOMContentLoaded', e => d1.init());
if (window) window.d1 = d1;