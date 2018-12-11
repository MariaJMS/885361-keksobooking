'use strict';

(function () {
  /* var TITLES = ['Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo']; */
  var OfferTypes = {
    flat: 'Квартира',
    palace: 'Дворец',
    house: 'Домик',
    bungalo: 'Бунгало'
  };
  /* var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg']; */

  /*  var PIN_WIDTH = 50;
  var MIN_X = 0 + PIN_WIDTH;
  var MAX_X = 1200 - PIN_WIDTH;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 10; */

  // генерируем случайный элемент массива
  var getRandomItem = function (array) {
    return array [Math.floor(Math.random() * array.length)];
  };

  /* var generateFeatureList = function () {
    return FEATURES.slice(getRandomNumber(0, FEATURES.length));
  }; */

  /* генерация случайного числа
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };
  // перемешиваем массив
  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };*/

  window.data = {
    OfferTypes: OfferTypes,
    getRandomItem: getRandomItem
  };

})();
