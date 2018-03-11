if (process.env.NODE_ENV === 'produciton') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}