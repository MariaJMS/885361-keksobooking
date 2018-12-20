'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');

  // Отключаем поля формы
  var fieldset = document.querySelectorAll('fieldset');
  var lockCard = function () {
    fieldset.forEach(function (field) {
      field.setAttribute('disabled', 'true');
    });
  };
  lockCard();

  // Заполнение поля адреса
  var address = adForm.querySelector('#address');
  var setAddress = function () {
    address.value = window.map.mapPinMain.offsetLeft + ', ' + window.map.mapPinMain.offsetTop;
    address.setAttribute('readonly', 'true');
  };

  window.map.mapPinMain.addEventListener('mouseup', setAddress);

  // установка соответствия количества гостей количеству комнат
  var roomNumber = document.querySelector('#room_number');
  var capacityForm = document.querySelector('#capacity');
  var option = capacityForm.querySelectorAll('option');

  var possiblyCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var roomsSelect = function () {
    var capacity = possiblyCapacity[roomNumber.value];
    for (var i = 0; i < option.length; i++) {
      if (capacity.indexOf(option[i].value) === -1) {
        option[i].setAttribute('disabled', true);
      } else {
        option[i].removeAttribute('disabled');
      }
    }
  };

  roomsSelect();
  roomNumber.addEventListener('change', roomsSelect);

  // ограничения на поле "Заголовок"
  var titleInput = adForm.querySelector('#title');
  titleInput.setAttribute('required', true);

  titleInput.addEventListener('invalid', function () {
    var message;
    if (titleInput.validity.tooShort) {
      message = 'Заголовок должен содержать не менее 30 символов';
    } else if (titleInput.validity.tooLong) {
      message = 'Заголовок должен содержать не более 100 символов';
    } else if (titleInput.validity.valueMissing) {
      message = 'Обязательное поле';
    } else {
      message = '';
    }
    titleInput.setCustomValidity(message);
  });

  // ограничения на поля "Тип жилья" и "Цена за ночь"
  var typeOfHousing = adForm.querySelector('#type');
  var housingPrice = adForm.querySelector('#price');
  var onFormTypeChange = function () {
    if (typeOfHousing.value === 'bungalo') {
      housingPrice.placeholder = '0';
      housingPrice.min = '0';
    } else if (typeOfHousing.value === 'flat') {
      housingPrice.placeholder = '1000';
      housingPrice.min = '1000';
    } else if (typeOfHousing.value === 'house') {
      housingPrice.placeholder = '5000';
      housingPrice.min = '5000';
    } else {
      housingPrice.placeholder = '10000';
      housingPrice.min = '10000';
    }
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

  var mainPinWidth = window.map.mapPinMain.offsetWidth;
  var mainPinStartHeight = window.map.mapPinMain.offsetHeight;

  var mapCenterY = mapHeight / 2 - mainPinStartHeight / 2;
  var mapCenterX = mapWidth / 2 - mainPinWidth / 2;

  var resetForm = function () {
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
    resetForm();
    showSuccess();
  };

  // окно с ошибкой отправки формы
  var showError = function (errMes) {
    var error = document.querySelector('#error').content.querySelector('.error');
    var errorElement = error.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    var errorButton = errorElement.querySelector('.error__button');
    errorMessage.textContent = errMes;

    main.insertAdjacentElement('afterbegin', errorElement);
    document.addEventListener('keydown', closeError);
    errorElement.addEventListener('click', closeError);
    errorButton.addEventListener('click', closeError);
  };

  var closeError = function () {
    var errorElement = document.querySelector('.error');
    main.removeChild(errorElement);
    document.removeEventListener('keydown', closeError);
    errorElement.removeEventListener('click', closeError);
    window.form.resetForm();
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.saveData(new FormData(adForm), saveForm, showError);
    evt.preventDefault();
  });

  // сброс формы при нажатии кнопки "Очистить"
  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', resetForm);

  window.form = {
    fieldset: fieldset,
    address: address,
    resetForm: resetForm,
    showError: showError
  };

})();
