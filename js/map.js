'use strict';

var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
  'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// генерируем случайный элемент массива
var getRandomItem = function (array) {
  return array [Math.floor(Math.random() * array.length)];
};

// генерация случайного числа
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};


var createNotice = function () {
  var locationX = getRandomNumber(100, 999);
  var locationY = getRandomNumber(100, 999);
  var notice = {
    author: {
      avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png'
    },
    offer: {
      title: getRandomItem(TITLE),
      address: locationX + ',' + locationY,
      price: getRandomNumber(1000, 1000000),
      type: getRandomItem(TYPE),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 10),
      checkin: getRandomItem(CHECKIN),
      checkout: getRandomItem(CHECKOUT),
      features: getRandomItem(FEATURES),
      description: '',
      photos: getRandomItem(PHOTOS)
    }
    /* location: {
      x: getRandomNumber(, ), // ? не совсем понятно какой должен быть диапазон для x
      y: getRandomNumber(130, 630)
    } */
  };
  return notice;
};

var notices = [];
for (var i = 0; i <= 8; i++) {
  notices.push(createNotice());
}

// У блока .map уберем класс .map--faded
var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');

// создаем DOM-элементы, соответствующие меткам на карте
var mapPinTemplate = document.querySelector('.map__card');
var renderMapPin = function () {
  var mapElement = mapPinTemplate.cloneNode(true);
  mapElement.querySelector('.map__pin').style.left = location.x;
  mapElement.querySelector('.map__pin').style.top = location.y;
  // src="{{author.avatar}}" ? здесь тоже затруднение с добавлением src и alt...
  // alt="{{заголовок объявления}}"

  return mapElement;
};

var similarListElement = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
for (i = 0; i < notices.length; i++) {
  fragment.appendChild(renderMapPin(notices[i]));
}
similarListElement.appendChild(fragment);

// создаем DOM-элементы объявления
var cardTemplate = document.querySelector('.map__card');
var createDomElemNotice = function (notice) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = notice.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = notice.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = notice.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = notice.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = notice.offer.rooms + 'комнаты для' + notice.offer.guests + 'гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + notice.offer.checkin + ', выезд до' + notice.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = notice.offer.features;
  cardElement.querySelector('.popup__description').textContent = notice.offer.description;
  cardElement.querySelector('.popup__photos').src = notice.offer.photos;
  cardElement.querySelector('.popup__avatar').src = notice.author.avatar;

  return cardElement;
};

var parentElem = document.querySelector('.map');
var nextSibling = document.querySelector('.map__filters-container');
var fragmentMap = document.createDocumentFragment();
for (i = 0; i < notices.length; i++) {
  var noticeDom = createDomElemNotice(notices[i]);
  fragmentMap.appendChild(noticeDom);
}
parentElem.insertBefore(fragmentMap, nextSibling);
