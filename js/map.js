'use strict';

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

// var ESC_KEYCODE = 27;

// генерируем случайный элемент массива
var getRandomItem = function (array) {
  return array [Math.floor(Math.random() * array.length)];
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
      features: getRandomItem(FEATURES),
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

// создаем DOM-элементы, соответствующие меткам на карте
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var createMapPin = function (notice) {
  var mapElement = mapPinTemplate.cloneNode(true);
  mapElement.style.left = notice.location.x + 'px';
  mapElement.style.top = notice.location.y + 'px';
  mapElement.querySelector('img').src = notice.author.avatar;
  mapElement.querySelector('img').alt = notice.offer.title;

  return mapElement;
};

var mapPins = document.querySelector('.map__pins');
var renderMapPins = function (notice) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < notice.length; i++) {
    fragment.appendChild(createMapPin(notice[i]));
  }
  mapPins.appendChild(fragment);
};

var photoInCard = document.querySelector('#card').content.querySelector('.popup__photo');
var createPhoto = function (photo) {
  var photoElement = photoInCard.cloneNode(true);
  photoElement.src = photo;

  return photoElement;
};

var generatePhotoInCard = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < PHOTOS.length; i++) {
    fragment.appendChild(createPhoto(PHOTOS[i]));
  }
  return fragment;
};

// создаем DOM-элементы объявления
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var createCards = function (notice) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = notice.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = notice.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = notice.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = OFFER_TYPES[notice.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = notice.offer.rooms + ' комнаты для ' + notice.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + notice.offer.checkin + ', выезд до' + notice.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = notice.offer.features;
  cardElement.querySelector('.popup__description').textContent = notice.offer.description;
  cardElement.querySelector('.popup__photos').appendChild(generatePhotoInCard(notice.offer.photos));
  cardElement.querySelector('.popup__avatar').src = notice.author.avatar;

  return cardElement;
};

var firstPhoto = document.querySelector('#card').content.querySelector('.popup__photo');
firstPhoto.remove('img:first-child');

var parentElem = document.querySelector('.map');
var nextSibling = document.querySelector('.map__filters-container');
var renderCards = function (notice) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < notice.length; i++) {
    fragment.appendChild(createCards(notice[i]));
  }
  parentElem.insertBefore(fragment, nextSibling);
};

// Отключаем поля формы
var mapFeaturesElem = document.querySelector('.map__features');
var formHeader = document.querySelectorAll('.ad-form-header');
var formElement = document.querySelectorAll('.ad-form__element');
var mapFilters = document.querySelectorAll('.map__filter');

mapFeaturesElem.setAttribute('disabled', 'true');
mapFilters.forEach(function (elem) {
  elem.setAttribute('disabled', 'true');
});
formHeader.forEach(function (elem) {
  elem.setAttribute('disabled', 'true');
});
formElement.forEach(function (elem) {
  elem.setAttribute('disabled', 'true');
});

// Активация страницы
var userDialog = document.querySelector('.map');
var formDisabled = document.querySelector('.ad-form');
var mapPinMain = document.querySelector('.map__pin--main');

var unlockCard = function () {
  userDialog.classList.remove('map--faded');
  formDisabled.classList.remove('ad-form--disabled');
  mapFeaturesElem.removeAttribute('disabled', 'true');
  mapFilters.forEach(function (elem) {
    elem.removeAttribute('disabled', 'true');
  });
  formHeader.forEach(function (elem) {
    elem.removeAttribute('disabled', 'true');
  });
  formElement.forEach(function (elem) {
    elem.removeAttribute('disabled', 'true');
  });
};

// Заполнение поля адреса
var address = document.querySelector('#address');
var setAddress = function () {
  address.value = mapPinMain.offsetLeft + ', ' + mapPinMain.offsetTop;
  address.setAttribute('readonly', 'true');
};

var onMapPinMainMouseUp = function () {
  unlockCard();
  setAddress();
  renderCards(generateNotices());
  renderMapPins(generateNotices());
};

mapPinMain.addEventListener('mouseup', onMapPinMainMouseUp);
