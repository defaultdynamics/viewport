## Viewport
Main viewport

## Usage
    var Viewport = require('viewport')
      , page = require('page');

    /**
     * viewport
     */

    var viewport = new Viewport();

    /**
     * Routes
     */

    page('/', function (ctx) {
      viewport.goTo(home, ctx);
    });
