var View = require('view')
  , template = require('./template')
  , domify = require('domify');


/**
 *
 */

Map = function () {
    this.view = new View(domify(template));
}

module.exports = Map;