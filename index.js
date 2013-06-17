/**
 *
 */

var template = require('./template')
  , domify = require('domify')
  , event = require('event')
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
    this.container = domify(template);

    body.appendChild(this.container);
}

/**
 *
 */

Viewport.prototype.goTo = function (page, ctx) {
    var length = stateHistory.length
      , state = ctx.state;

    console.log('context: ', ctx);

    if (length === 0) {
        stateHistory.push(state.path);
        this.goToFrom(page);

        return;
    }
    if (state.path === stateHistory[length-2]) {
        stateHistory.pop();
        this.goToFrom(page, 'page-left');
    } else {
        stateHistory.push(state.path);
        this.goToFrom(page, 'page-right');
    }

    return this;
};

/**
 *
 */

Viewport.prototype.goToFrom = function (page, from) {
    var current = document.querySelector('.page-center')
      , currentEl
      , container = this.container
      , pageEl = page.view.el
      , onTransitionEnd;

    // append to container
    container.appendChild(pageEl);

    if (!current || !from) {
        pageEl.setAttribute("class", "page page-center");
        //this.current(page);

        return;
    }

    currentEl = current;

    // Position the page at the starting position of the animation
    pageEl.setAttribute("class", "page " + from);

    onTransitionEnd = function (e) {
        e.preventDefault();
        
        console.log("on transition end: ", e.target);

        event.unbind(currentEl, 'webkitTransitionEnd', onTransitionEnd);

        currentEl.remove();
    };

    event.bind(currentEl, 'webkitTransitionEnd', onTransitionEnd);

    // Force reflow. More information here: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
    container.offsetWidth;

    pageEl.setAttribute("class", "page transition page-center");
    currentEl.setAttribute("class", "page transition " + (from === "page-left" ? "page-right" : "page-left"));
};