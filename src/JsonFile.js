const path = require('path');
const fs = require('fs');

module.exports = class JsonFile {

  constructor(file) {
    this._file = file;
    this._data = null;
  }

  getPath() {
    return path.resolve(this._file);
  }

  name() {
    return path.basename(this._file);
  }

  setData(data) {
    this._data = data;
    return this;
  }

  set(key, data) {
    return this;
  }

  get(key) {

  }

  load() {
    return this;
  }

  save() {
    return this;
  }

}
