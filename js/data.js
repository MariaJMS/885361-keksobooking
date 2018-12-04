'use strict';

(function () {
  var TITLES = ['Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_TYPES = {
    flat: 'Квартира',
    palace: 'Дворец',
    house: 'Домик',
    bungalo: 'Бунгало'
  };
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var NUMBER_NOTICE = 8;
  var PIN_WIDTH = 50;
  var MIN_X = 0 + PIN_WIDTH;
  var MAX_X = 1200 - PIN_WIDTH;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 10;

  // генерируем случайный элемент массива
  var getRandomItem = function (array) {
    return array [Math.floor(Math.random() * array.length)];
  };

  var generateFeatureList = function () {
    return FEATURES.slice(getRandomNumber(0, FEATURES.length));
  };

  // генерация случайного числа
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
  };

  var createNotice = function (index) {
    var locationX = getRandomNumber(MIN_X, MAX_X);
    var locationY = getRandomNumber(MIN_Y, MAX_Y);
    var notice = {
      author: {
        avatar: 'img/avatars/user0' + (index + 1) + '.png'
      },
      offer: {
        title: TITLES[index],
        address: locationX + ', ' + locationY,
        price: getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: getRandomItem(TYPES),
        rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
        checkin: getRandomItem(CHECKIN),
        checkout: getRandomItem(CHECKOUT),
        features: generateFeatureList(),
        description: '',
        photos: shuffleArray(PHOTOS)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    return notice;
  };

  var generateNotices = function () {
    var notices = [];
    for (var i = 0; i < NUMBER_NOTICE; i++) {
      notices.push(createNotice(i));
    }
    return notices;
  };

  var notices = generateNotices();

  window.data = {
    notices: notices,
    OFFER_TYPES: OFFER_TYPES,
    PHOTOS: PHOTOS
  };

})();
