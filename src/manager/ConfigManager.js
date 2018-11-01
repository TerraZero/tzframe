const path = require('path');
const fs = require('fs');

module.exports = class ConfigManager {

  constructor(core) {
    this._core = core;
  }

  boot() {
    this._path = path.resolve(this._core.root(), '_tzframe/configs');
    return new Promise(this.doBoot.bind(this));
  }

  doBoot(resolve) {
    new Promise(this.checkPath.bind(this))
      .then(this.loadFiles.bind(this))
      .then(resolve);
  }

  checkPath(resolve) {
    fs.exists(this._path, resolve);
  }

  loadFiles(exist) {
    if (exist) {
      console.log('jo');
    } else {
      console.log('no');
    }
  }

}
