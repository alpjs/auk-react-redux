var production = process.env.NODE_ENV === 'production';
module.exports = require('./dist/browser-node8' + (production ? '' : '-dev') + '.cjs');
