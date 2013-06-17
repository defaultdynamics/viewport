var View = require('view')
  , template = require('./template')
  , domify = require('domify');


/**
 *
 */

Home = function () {
    this.view = new View(domify(template));
}

module.exports = Home;