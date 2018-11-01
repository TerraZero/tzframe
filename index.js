module.exports = new (require('./src/Core'))();

module.exports.Cache = require('./src/data/Cache');

class TZFrame {

  static get name() { return 'tzframe' };
  static get path() { return __dirname; };

}

module.exports.register(TZFrame);

const JsonFile = module.exports.use('tzframe/data/JsonFile');
