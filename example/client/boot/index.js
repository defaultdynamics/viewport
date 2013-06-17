var Viewport = require('viewport')
  , page = require('page')
  , Buyer = require('buyer')
  , Home = require('home')
  , Map = require('map');

/**
 * viewport
 */

var viewport = new Viewport();

/**
 * Pages
 */

var buyerMain = new Buyer.main
  , buyerCategory = new Buyer.category
  , home = new Home()
  , map = new Map();


/**
 * Routes
 */

page('/', function (ctx) {
  viewport.goTo(home, ctx);
});

page('/buyer', function (ctx) {
  viewport.goTo(buyerMain, ctx);
});

page('/buyer/:category', function (ctx) {
  buyerCategory.category(ctx.params.category);

  viewport.goTo(buyerCategory, ctx);
});

page('/map', function (ctx) {
  viewport.goTo(map, ctx);
});

page();