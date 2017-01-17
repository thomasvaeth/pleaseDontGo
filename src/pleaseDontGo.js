(function (root, factory) {
  if ( typeof define === 'function' && define.amd ) {
    define([], factory(root));
  } else if ( typeof exports === 'object' ) {
    module.exports = factory(root);
  } else {
    root.myPlugin = factory(root);
  }
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

  'use strict';

  //
  // Variables
  //

  var pleaseDontGo = {};
  var supports = !!document.querySelector && !!root.addEventListener;
  var settings, checked, favicon, originalTitle, originalFavicon;

  // Default settings
  var defaults = {
    newTitle: 'Please Don\'t Go',
    newFavicon: '/assets/images/favicon-dontgo.ico',
    timeout: 2000
  };

  //
  // Methods
  //

  /**
   * A simple forEach() implementation for Arrays, Objects and NodeLists
   * @private
   * @param {Array|Object|NodeList} collection Collection of items to iterate
   * @param {Function} callback Callback function for each iteration
   * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
   */
  var forEach = function(collection, callback, scope) {
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

  /**
   * Merge defaults with user options
   * @private
   * @param {Object} defaults Default settings
   * @param {Object} options User options
   * @returns {Object} Merged values of defaults and options
   */
  var extend = function(defaults, options) {
    var extended = {};
    forEach(defaults, function(value, prop) {
      extended[prop] = defaults[prop];
    });
    forEach(options, function(value, prop) {
      extended[prop] = options[prop];
    });
    return extended;
  };

  /**
   * Check typeof of settings
   * @private
   * @param {Object} options Merged values of defaults and options
   * @returns {Boolean} Return false if incorrect
   */
  var checkSettings = function(options) {
    if (typeof options.newTitle !== 'string') {
      console.log('newTitle must be a string.');
      return false;
    }
    if (typeof options.newFavicon !== 'string') {
      console.log('newFavicon must be a string.');
      return false;
    }
    if (typeof options.timeout !== 'number') {
      console.log('timeout must be a number.');
      return false;
    }

    return true;
  };

  /**
   * Change Favicon and Title on new tab with settings
   * @private
   * @param {Object} options Merged values of defaults and options
   */
   var visibility = function(options) {
    favicon = document.querySelectorAll('[rel="icon"]')[0];
    originalTitle = document.title;
    originalFavicon = favicon.href;

    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'hidden') {
        setTimeout(function() {
          document.title = options.newTitle;
          favicon.setAttribute('href', options.newFavicon);
        }, options.timeout);
      } else {
        document.title = originalTitle;
        favicon.setAttribute('href', originalFavicon);
      }
    });
   };

  /**
   * Destroy the current initialization.
   * @public
   */
  pleaseDontGo.destroy = function () {
    // If plugin isn't already initialized, stop
    if (!settings) {
      return;
    }

    // Reset variables
    settings = null;
    favicon = null;
    originalTitle = null;
    originalFavicon = null;
  };

  /**
   * Initialize Please Don't Go
   * @public
   * @param {Object} options User settings
   */
  pleaseDontGo.init = function ( options ) {
    // Feature test
    if (!supports) {
      return;
    }

    // Destroy any existing initializations
    pleaseDontGo.destroy();

    // Merge user options with defaults
    settings = extend(defaults, options || {});

    // Do something...
    checked = checkSettings(settings);

    if (checked) {
      visibility(settings);
    }
  };

  //
  // Public APIs
  //

  window.pleaseDontGo = pleaseDontGo;

});
