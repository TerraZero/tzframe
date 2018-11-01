const path = require('path');

module.exports = class Struckt {

  constructor(modules, path) {
    this._modules = modules;
    this._path = path;

    this._parse = null;
    this._resolve = null;
  }

  path() {
    return this._path;
  }

  creator() {
    return this._creator;
  }

  parse() {
    if (this._parse !== null) return this._parse;

    const over = this._path.split('::');
    const parts = over[0].split('/');

    this._parse = {
      key: this._path,
      package: parts[0],
      name: parts.pop(),
      namespace: parts.join('/'),
      call: over[1] || null,
    };

    this._parse.file = path.resolve(this._modules.getPath(parts.shift()), 'src', parts.join('/'), this._parse.name);
    return this._parse;
  }

  resolve() {
    if (this._resolve === null) {
      this._resolve = require(this.parse().file);
    }
    if (this.parse().call !== null) {
      this._resolve = this._resolve[this.parse().call].bind(this._resolve);
    }
    return this._resolve;
  }

}
