const Struckt = require('./data/Struckt');
const Cache = require('./data/Cache');

const ModuleManager = require('./manager/ModuleManager');
const ConfigManager = require('./manager/ConfigManager');

module.exports = class Core {

  constructor() {
    this._struckt = Cache.create(__filename + ':struckt', this.cacheKeyStruckt.bind(this), this.cacheCreateStruck.bind(this));
    this._modules = new ModuleManager(this);
    this._configs = new ConfigManager(this);
    this._root = null;
  }

  modules() {
    return this._modules;
  }

  configs() {
    return this._configs;
  }

  root() {
    return this._root;
  }

  register(definition) {
    this.modules().register(definition);
  }

  get(path) {
    return this._struckt.get(path);
  }

  use(path) {
    return this.get(path).resolve();
  }

  cacheKeyStruckt(path) {
    return path;
  }

  cacheCreateStruck(path) {
    return new Struckt(this.modules(), path);
  }

  boot(root) {
    this._root = root;
    return new Promise(this.doBoot.bind(this));
  }

  doBoot(resolve) {
    Promise.all([
      this._configs.boot(),
    ]).then(resolve);
  }

}
