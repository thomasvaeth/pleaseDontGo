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


  var pleaseDontGo = {};
  var supports = !!document.querySelector && !!root.addEventListener;
  var settings, checked, favicon, originalTitle, originalFavicon;

  var defaults = {
    newTitle: 'Please Don\'t Go',
    newFavicon: '/assets/images/favicon-dontgo.ico',
    timeout: 2000
  };


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

  pleaseDontGo.destroy = function () {
    if (!settings) {
      return;
    }

    settings = null;
    favicon = null;
    originalTitle = null;
    originalFavicon = null;
  };

  pleaseDontGo.init = function ( options ) {
    if (!supports) {
      return;
    }

    pleaseDontGo.destroy();

    settings = extend(defaults, options || {});

    checked = checkSettings(settings);

    if (checked) {
      visibility(settings);
    }
  };


  window.pleaseDontGo = pleaseDontGo;

});
