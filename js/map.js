'use strict';

(function () {

  var userDialog = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var setup = document.querySelector('.map__pins');
  var mapPinMain = setup.querySelector('.map__pin--main');

  var onLoad = function (dataArray) {
    window.pin.renderMapPins(dataArray);
    window.filters.initializeFilters(dataArray);
  };

  // Активация страницы
  var unlockCard = function () {
    userDialog.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.fieldset.forEach(function (elem) {
      elem.removeAttribute('disabled', 'true');
    });
    window.backend.loadData(onLoad, window.form.showError);
  };

  // перемещение главной метки
  var mapPinMainWidth = mapPinMain.offsetWidth;
  var mapPinMainHeight = mapPinMain.offsetHeight;
  var mainPinHeight = mapPinMainHeight + 22;
  var mapWidth = userDialog.offsetWidth;

  var mapPinsLimits = {
    MIN_Y: 130 - mainPinHeight,
    MAX_Y: 630,
    MIN_X: 0 - mapPinMainWidth / 2,
    MAX_X: mapWidth - mapPinMainWidth / 2
  };

  var getValueInLimit = function (value, min, max) {
    if (value < min) {
      value = min;
    }
    if (value > max) {
      value = max;
    }
    return value;
  };

  var getPinCoords = function (coords) {
    coords.x = getValueInLimit(coords.x, mapPinsLimits.MIN_X, mapPinsLimits.MAX_X);
    coords.y = getValueInLimit(coords.y, mapPinsLimits.MIN_Y, mapPinsLimits.MAX_Y);

    return coords;
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var resultCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      getPinCoords(resultCoords);

      mapPinMain.style.top = resultCoords.y + 'px';
      mapPinMain.style.left = resultCoords.x + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      var mainPinY = Math.ceil(mapPinMain.offsetTop + mainPinHeight);
      var mainPinX = Math.ceil(mapPinMain.offsetLeft + mapPinMainWidth / 2);
      window.form.address.setAttribute('value', mainPinX + ' , ' + mainPinY);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    mapPinMain.addEventListener('mouseup', unlockCard);
  });

  window.map = {
    userDialog: userDialog,
    mapPinMain: mapPinMain,
    mapWidth: mapWidth
  };

})();
