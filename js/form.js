'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');

  // Отключаем поля формы
  var fieldset = document.querySelectorAll('fieldset');
  var lockCard = function () {
    fieldset.forEach(function (elem) {
      elem.setAttribute('disabled', 'true');
    });
  };

  lockCard();

  // Заполнение поля адреса
  var address = adForm.querySelector('#address');
  var setAddress = function () {
    address.value = window.map.mapPinMain.offsetLeft + ', ' + window.map.mapPinMain.offsetTop;
    address.setAttribute('readonly', 'true');
  };

  // установка соответствия количества гостей количеству комнат
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var optionCapasity = capacity.querySelectorAll('option:nth-child(-n+3)');
  var lastCapasity = capacity.querySelector('option:last-child');

  var addDisabled = function () {
    optionCapasity.forEach(function (elem) {
      elem.setAttribute('disabled', true);
    });
  };

  var removeDisabled = function () {
    optionCapasity.forEach(function (elem) {
      elem.removeAttribute('disabled', true);
    });
  };

  var maxCapacity = {
    '1': 1,
    '2': 2,
    '3': 3,
    '100': 0
  };

  var validСapacity = function () {
    var roomsNumber = roomNumber.value;
    var guests = parseInt(capacity.value, 10);
    var possibleCapacity = maxCapacity[roomsNumber];
    if (roomsNumber === 100) {
      capacity.setCustomValidity('Комнаты не для гостей');
      addDisabled();
      lastCapasity.removeAttribute('disabled', true);
    } else {
      if (guests > possibleCapacity || guests === 0) {
        capacity.setCustomValidity('Недопустимое количество мест для выбранного числа комнат');
        removeDisabled();
        lastCapasity.setAttribute('disabled', true);
      } else {
        capacity.setCustomValidity('');
      }
    }
  };

  validСapacity();

  capacity.addEventListener('change', validСapacity);
  roomNumber.addEventListener('change', validСapacity);

  // ограничения на поле "Заголовок"
  var titleInput = adForm.querySelector('#title');
  titleInput.setAttribute('required', true);

  titleInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 30) {
      target.setCustomValidity('Заголовок должен содержать не менее 30 символов');
    } if (target.value.length > 100) {
      target.setCustomValidity('Заголовок должен содержать не более 100 символов');
    } else {
      target.setCustomValidity('');
    }
  });

  // ограничения на поле "Цена"
  var priceInput = adForm.querySelector('#price');
  priceInput.setAttribute('required', true);

  var card = window.map.userDialog.querySelector('.map__card');
  var mapWidth = window.map.mapWidth;
  var mapHeight = window.map.userDialog.offsetHeight;

  var mainPinWidth = window.map.mapPinMainWidth;
  var mainPinStartHeight = window.map.mapPinMainHeight;

  var mapCenterY = mapHeight / 2 - mainPinStartHeight / 2;
  var mapCenterX = mapWidth / 2 - mainPinWidth / 2;

  var onSubmit = function () {
    adForm.reset();
    window.map.mapPinMain.style = 'left:' + mapCenterX + 'px; top:' + mapCenterY + 'px;';

    window.map.userDialog.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    if (card) {
      window.map.userDialog.removeChild(card);
    }
    var mapPins = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
    var pinsContainer = document.querySelector('.map__pins');
    for (var i = 0; i < mapPins.length; i++) {
      pinsContainer.removeChild(mapPins[i]);
    }
  };

  // сообщение об успешной отправке формы
  var main = document.querySelector('main');
  var onMainShowSuccess = function () {
    var success = document.querySelector('#success').content.querySelector('.success');
    var successElement = success.cloneNode(true);
    successElement.addEventListener('mousedown', closeSuccess);
    main.appendChild(successElement);
    document.addEventListener('keydown', closeSuccess);
  };

  var closeSuccess = function () {
    var successElement = document.querySelector('.success');
    main.removeChild(successElement);
    document.removeEventListener('keydown', closeSuccess);
  };

  var saveForm = function () {
    onSubmit();
    onMainShowSuccess();
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.saveData(new FormData(adForm), saveForm, window.pin.showError);
    // showSuccess();
    evt.preventDefault();
  });

  // сброс формы при нажатии кнопки "Очистить"
  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', onSubmit);

  window.form = {
    fieldset: fieldset,
    address: address,
    setAddress: setAddress,
    onSubmit: onSubmit
  };

})();
