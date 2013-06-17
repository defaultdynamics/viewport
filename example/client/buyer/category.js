var View = require('view')
  , template = require('./category.tpl')
  , domify = require('domify');


module.exports = BuyerCategory;

/**
 *
 */

function BuyerCategory (category) {
    this.el = domify(template);

    this.view = new View(this.el);
}

/**
 *
 */
 
BuyerCategory.prototype.category = function (category) {
    if (!arguments.length) return this._category;

    this.el.querySelector('.category-name').innerHTML = category;

    this._category = category;
};