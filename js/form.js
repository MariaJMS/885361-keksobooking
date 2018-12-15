'use strict';

(function () {

  var OFFER_PRICE = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

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

  var addressSetting = function () {
    setAddress();
  };

  window.map.mapPinMain.addEventListener('mouseup', addressSetting);

  // установка соответствия количества гостей количеству комнат
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var onRoomsSelect = function () {

    if ((roomNumber.value === '1') && (capacity.value !== '1')) {
      capacity.setCustomValidity('В одной комнате - один гость');
    } else if ((roomNumber.value === '100') && (capacity.value === '0')) {
      capacity.setCustomValidity('');
    } else if ((roomNumber.value !== '100') && (capacity.value === '0')) {
      capacity.setCustomValidity('Не для гостей только 100 комнат');
    } else if ((roomNumber.value === '100') && (capacity.value !== '0')) {
      capacity.setCustomValidity('Столько комнат не для гостей');
    } else if (roomNumber.value >= capacity.value) {
      capacity.setCustomValidity('');
    } else {
      capacity.setCustomValidity('Максимум 2 гостя');
    }
  };

  onRoomsSelect();
  roomNumber.addEventListener('change', onRoomsSelect);
  capacity.addEventListener('change', onRoomsSelect);

  // ограничения на поле "Заголовок"
  var titleInput = adForm.querySelector('#title');
  titleInput.setAttribute('required', true);

  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок должен содержать не менее 30 символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Заголовок должен содержать не более 100 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  // ограничения на поле "Цена"
  var priceInput = adForm.querySelector('#price');
  priceInput.setAttribute('required', true);

  // ограничения на поля "Тип жилья" и "Цена за ночь"
  var typeOfHousing = adForm.querySelector('#type');
  var housingPrice = adForm.querySelector('#price');
  var onFormTypeChange = function () {
    var minValue = OFFER_PRICE[typeOfHousing.value];
    housingPrice.placeholder = minValue;
    housingPrice.min = minValue;
  };

  typeOfHousing.addEventListener('change', onFormTypeChange);

  // время заезда и время выезда
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  var onTimeInChange = function () {
    timeOut.value = timeIn.value;
  };

  var onTimeOutChange = function () {
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);

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
  var showSuccess = function () {
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
    showSuccess();
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.saveData(new FormData(adForm), saveForm, window.pin.showError);
    evt.preventDefault();
  });

  // сброс формы при нажатии кнопки "Очистить"
  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', onSubmit);

  window.form = {
    fieldset: fieldset,
    address: address,
    onSubmit: onSubmit
  };

})();
