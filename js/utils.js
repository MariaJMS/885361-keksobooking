'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;
  var debounce = function (cb, data) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb(data);
    }, DEBOUNCE_INTERVAL);
  };

  window.utils = {
    debounce: debounce
  };
})();
