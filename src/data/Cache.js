module.exports = class Cache {

  static create(name, key_func, create_func) {
    this._caches = this._caches || {};
    if (this._caches[name] !== undefined) {
      throw new Error('The cache "' + name + '" already exists!');
    }
    this._caches[name] = new Cache(key_func, create_func);
    return this._caches[name];
  }

  static clear(name = null, key = null) {
    if (name === null) {
      for (const cache in this._caches) {
        this._caches[cache].clear();
      }
    } else {
      this._caches[cache].clear(key);
    }
  }

  constructor(key_func, create_func) {
    this._key_func = key_func;
    this._create_func = create_func;

    this._data = {};
  }

  get(...values) {
    const key = this._key_func.apply(null, values);

    if (this._data[key] === undefined) {
      this._data[key] = this._create_func.apply(null, values);
    }
    return this._data[key];
  }

  clear(key = null) {
    if (key === null) {
      this._data = {};
    } else {
      delete this._data[key];
    }
    return this;
  }

}
