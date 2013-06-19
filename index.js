/**
 *
 */

var template = require('./template')
  , domify = require('domify')
  , event = require('event')
  , viewportToolbar = require('viewport-toolbar')
  , body
  , stateHistory;

body = document.querySelector('body');

// History cache
stateHistory = [];

/**
 * Expose.
 */

module.exports = Viewport;

/**
 * Viewport
 */

function Viewport () {
    this.el = domify(template);
    this.container = this.el.querySelector('#viewport');

    body.appendChild(this.el);
}

/**
 *
 */

Viewport.prototype.goTo = function (view, ctx) {
    var length = stateHistory.length
      , state = ctx.state;

    console.log('context: ', ctx);

    if (length === 0) {
        stateHistory.push(state.path);
        this.goToFrom(view);

        return;
    }
    if (state.path === stateHistory[length-2]) {
        stateHistory.pop();
        this.goToFrom(view, 'view-left');
    } else {
        stateHistory.push(state.path);
        this.goToFrom(view, 'view-right');
    }

    return this;
};

/**
 *
 */

Viewport.prototype.goToFrom = function (view, from) {
    var current = document.querySelector('.view-center')
      , currentEl
      , container = this.container
      , viewEl = view.view.el
      , onTransitionEnd;

    // append to container
    container.appendChild(viewEl);

    if (!current || !from) {
        viewEl.setAttribute("class", "view view-center");

        return;
    }

    currentEl = current;

    // Position the view at the starting position of the animation
    viewEl.setAttribute("class", "view " + from);

    onTransitionEnd = function (e) {
        e.preventDefault();
        
        console.log("on transition end: ", e.target);

        event.unbind(currentEl, 'webkitTransitionEnd', onTransitionEnd);

        currentEl.remove();
    };

    event.bind(currentEl, 'webkitTransitionEnd', onTransitionEnd);

    // Force reflow. More information here: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
    container.offsetWidth;

    viewEl.setAttribute("class", "view transition view-center");
    currentEl.setAttribute("class", "view transition " + (from === "view-left" ? "view-right" : "view-left"));
};

/**
 * Enables main toolbar.
 */

Viewport.prototype.enableToolbar = function (options) {
    var toolbar = viewportToolbar(options);

    this.el.appendChild(toolbar.el);
};