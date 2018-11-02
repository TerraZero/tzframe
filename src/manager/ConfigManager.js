const path = require('path');
const fs = require('fs');

const JsonFile = require('../data/JsonFile');

module.exports = class ConfigManager {

  constructor(core) {
    this._core = core;

    this._configs = {};
  }

  boot() {
    this._path = path.resolve(this._core.root(), '_tzframe/configs');
    return new Promise(this.doBoot.bind(this));
  }

  doBoot(resolve) {
    new Promise(this.checkPath.bind(this))
      .then(this.listFiles.bind(this))
      .then(this.loadFiles.bind(this))
      .then(resolve);
  }

  checkPath(resolve) {
    fs.exists(this._path, resolve);
  }

  listFiles(exist) {
    if (exist) {
      return new Promise((resolve, reject) => {
        fs.readdir(this._path, (err, files) => {
          if (err) return reject(err);
          resolve(files);
        });
      });
    } else {
      return [];
    }
  }

  loadFiles(files) {
    for (const file in files) {
      const key = path.basename(files[file]);
      this._configs[] = new JsonFile(path.resolve(this._path, files[file]));
      console.log(this._configs);
    }
  }

}
