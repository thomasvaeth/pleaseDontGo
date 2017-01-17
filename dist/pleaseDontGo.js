(function (root, factory) {
  if ( typeof define === 'function' && define.amd ) {
    define([], factory(root));
  } else if ( typeof exports === 'object' ) {
    module.exports = factory(root);
  } else {
    root.myPlugin = factory(root);
  }
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {

  'use strict';


  var myPlugin = {}; 
  var supports = !!document.querySelector && !!root.addEventListener; 
  var settings, eventTimeout;

  var defaults = {
    someVar: 123,
    initClass: 'js-myplugin',
    callbackBefore: function () {},
    callbackAfter: function () {}
  };



  var forEach = function (collection, callback, scope) {
    if (Object.prototype.toString.call(collection) === '[object Object]') {
      for (var prop in collection) {
        if (Object.prototype.hasOwnProperty.call(collection, prop)) {
          callback.call(scope, collection[prop], prop, collection);
        }
      }
    } else {
      for (var i = 0, len = collection.length; i < len; i++) {
        callback.call(scope, collection[i], i, collection);
      }
    }
  };

  var extend = function ( defaults, options ) {
    var extended = {};
    forEach(defaults, function (value, prop) {
      extended[prop] = defaults[prop];
    });
    forEach(options, function (value, prop) {
      extended[prop] = options[prop];
    });
    return extended;
  };

  var getDataOptions = function ( options ) {
    return !options || !(typeof JSON === 'object' && typeof JSON.parse === 'function') ? {} : JSON.parse( options );
  };

  var getClosest = function (elem, selector) {
    var firstChar = selector.charAt(0);
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
      if ( firstChar === '.' ) {
        if ( elem.classList.contains( selector.substr(1) ) ) {
          return elem;
        }
      } else if ( firstChar === '#' ) {
        if ( elem.id === selector.substr(1) ) {
          return elem;
        }
      } else if ( firstChar === '[' ) {
        if ( elem.hasAttribute( selector.substr(1, selector.length - 2) ) ) {
          return elem;
        }
      }
    }
    return false;
  };


  var eventHandler = function (event) {
    var toggle = event.target;
    var closest = getClosest(toggle, '[data-some-selector]');
    if ( closest ) {
    }
  };

  myPlugin.destroy = function () {

    if ( !settings ) return;

    document.documentElement.classList.remove( settings.initClass );


    document.removeEventListener('click', eventHandler, false);

    settings = null;
    eventTimeout = null;

  };

  var eventThrottler = function () {
    if ( !eventTimeout ) {
      eventTimeout = setTimeout(function() {
        eventTimeout = null;
        actualMethod( settings );
      }, 66);
    }
  };

  myPlugin.init = function ( options ) {

    if ( !supports ) return;

    myPlugin.destroy();

    settings = extend( defaults, options || {} );

    document.documentElement.classList.add( settings.initClass );


    document.addEventListener('click', eventHandler, false);

  };



  return myPlugin;

});
