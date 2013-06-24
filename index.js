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

Viewport.prototype.goTo = function (view, ctx, direction) {
    var length = stateHistory.length
      , state = ctx.state;

    console.log(view);

    if (length === 0) {
        stateHistory.push(state.path);
        this.goToFrom(view);

        return;
    }
    if (state.path === stateHistory[length-2] || direction === 'left') {
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
      , viewEl = view.el || view.view.el
      , onTransitionEnd;

    if (!viewEl) throw new Error("View component needs to have a DOM element.");

    if (current && current.id === viewEl.id) return;

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