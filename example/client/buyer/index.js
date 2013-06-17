/**
 * Module dependencies.
 */

var View = require('view')
  , template = require('./template')
  , domify = require('domify')
  , Category = require('./category');


module.exports = {
    main: Buyer,
    category: Category
};

/**
 * Buyer.
 */

function Buyer () {
    this.view = new View(domify(template));
}