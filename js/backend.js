'use strict';

(function () {

  var loadData = function (onLoad, onError) {

    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;
    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      try {
        var err;
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          case 400:
            err = 'Неверный запрос';
            break;
          case 404:
            err = 'Ничего не найдено';
            break;
          default:
            err = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
            break;
        }
        if (err) {
          onError(err);
        }
      } catch (error) {
        onError(error.message);
      }
    });

    xhr.send();
  };

  var saveData = function (data, onLoad, onError) {

    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 1000;
    xhr.open('POST', URL);

    var err;
    xhr.addEventListener('load', function () {
      try {
        switch (xhr.status) {
          case 200:
            onLoad();
            break;
          case 400:
            err = 'Неверный запрос';
            break;
          default:
            err = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
            break;
        }
        if (err) {
          onError(err);
        }
      } catch (error) {
        onError(error.message);
      }
    });

    xhr.send(data);
  };

  window.backend = {
    loadData: loadData,
    saveData: saveData
  };

})();
