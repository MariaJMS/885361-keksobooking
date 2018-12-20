'use strict';

(function () {
  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_URL = 'https://js.dump.academy/keksobooking';
  var SUCCESSFUL_REQUEST = 200;
  var TIMEOUT = 1000;

  var sendRequest = function (requestType, url, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESSFUL_REQUEST) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open(requestType, url);
    xhr.send(data);
  };

  var loadData = function (onLoad, onError) {
    sendRequest('GET', GET_URL, null, onLoad, onError);
  };

  var saveData = function (data, onLoad, onError) {
    sendRequest('POST', POST_URL, data, onLoad, onError);
  };

  window.backend = {
    loadData: loadData,
    saveData: saveData
  };
})();
