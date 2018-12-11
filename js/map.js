'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var userDialog = document.querySelector('.map');

  // Активация страницы
  var formDisabled = document.querySelector('.ad-form');
  var setup = document.querySelector('.map__pins');
  var mapPinMain = setup.querySelector('.map__pin--main');

  var unlockCard = function () {
    userDialog.classList.remove('map--faded');
    formDisabled.classList.remove('ad-form--disabled');
    window.form.fieldset.forEach(function (elem) {
      elem.removeAttribute('disabled', 'true');
    });
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

  var pinCoords = function (coords) {
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

      pinCoords(resultCoords);

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
    mapPinMain.addEventListener('mouseup', onMapPinMainMouseUp);
  });

  // открытие, закрытие карточки объявления по клику на метке
  var activeMapCard;

  var hideActiveMapCard = function () {
    if (activeMapCard !== undefined) {
      activeMapCard.classList.add('visually-hidden');
    }
  };

  var onKeydownEsc = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      hideActiveMapCard();
    }
  };

  var showMapCard = function (index) {
    hideActiveMapCard();
    var popup = document.querySelector('.popup.visually-hidden[data-notice = "' + index + '"]');
    popup.classList.remove('visually-hidden');
    activeMapCard = popup;
    document.addEventListener('keydown', onKeydownEsc);
  };

  var onCloseMapCardClick = function () {
    var closePopup = document.querySelectorAll('.popup__close');
    for (var i = 0; i < closePopup.length; i++) {
      closePopup[i].addEventListener('click', hideActiveMapCard);
    }
  };

  var onMapPinMainMouseUp = function () {
    unlockCard();
    window.form.setAddress();
    window.pin.renderMapPins(window.pin.notices);
    window.card.renderCards(window.pin.notices);
    window.pin.generateMapPins(window.pin.notices);
    onCloseMapCardClick();
  };

  mapPinMain.addEventListener('mouseup', onMapPinMainMouseUp);

  window.map = {
    userDialog: userDialog,
    showMapCard: showMapCard,
    mapPinMain: mapPinMain,
    mapPinMainWidth: mapPinMainWidth,
    mapPinMainHeight: mapPinMainHeight,
    mapWidth: mapWidth
  };

})();
