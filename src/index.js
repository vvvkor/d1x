var d1 = require('./d1.js');
require('./plugins/tablex.js');
require('./plugins/gallery.js');
d1.b([document], 'DOMContentLoaded', e => d1.init());
//d1.b([document], 'DOMContentLoaded', d1.init.bind(d1, {dialog:0, plug: {gallery: {idPrefix: 'img--'}}}));