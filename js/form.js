'use strict';

(function () {
// Отключаем поля формы
  var fieldset = document.querySelectorAll('fieldset');
  var lockCard = function () {
    fieldset.forEach(function (elem) {
      elem.setAttribute('disabled', 'true');
    });
  };

  lockCard();

  // Заполнение поля адреса
  var address = document.querySelector('#address');
  var setAddress = function () {
    address.value = window.map.mapPinMain.offsetLeft + ', ' + window.map.mapPinMain.offsetTop;
    address.setAttribute('readonly', 'true');
  };

  // установка соответствия количества гостей количеству комнат
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

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
    if (guests > possibleCapacity) {
      capacity.setAttribute('disable', true);
      capacity.setCustomValidity('Недопустимое количество мест для выбранного числа комнат');
    } else if (guests === 0 && possibleCapacity > 0) {
      capacity.setAttribute('disable', true);
      capacity.setCustomValidity('Комнаты не для гостей');
    } else {
      capacity.setAttribute('disable', false);
      capacity.setCustomValidity('');
    }
  };

  validСapacity();

  var onCapacityChange = function () {
    validСapacity();
  };

  capacity.addEventListener('change', onCapacityChange);
  roomNumber.addEventListener('change', onCapacityChange);

  window.form = {
    fieldset: fieldset,
    address: address,
    setAddress: setAddress
  };

})();
