module.exports = class ModuleManager {

  constructor(core) {
    this._register = {};
  }

  register(definition) {
    this._register[definition.name] = definition;
  }

  getModule(name) {
    if (this._register[name] === undefined) {
      throw new Error('The module "' + name + '" is unknown!');
    }
    return this._register[name];
  }

  getPath(name) {
    return this.getModule(name).path;
  }

}
