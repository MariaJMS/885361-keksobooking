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

var ESC_KEYCODE = 27;

var idCard = document.querySelector('#card');

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
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
var createMapPin = function (notice, index) {
  var mapPinElement = mapPin.cloneNode(true);
  mapPinElement.style.left = notice.location.x + 'px';
  mapPinElement.style.top = notice.location.y + 'px';
  mapPinElement.querySelector('img').src = notice.author.avatar;
  mapPinElement.querySelector('img').alt = notice.offer.title;

  mapPinElement.dataset.ad = index;
  // показ карточки с подробной информацией
  mapPinElement.addEventListener('click', function () {
    showMapCard(index);
  });

  return mapPinElement;
};

var mapPins = document.querySelector('.map__pins');
var renderMapPins = function (notice) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < notice.length; i++) {
    fragment.appendChild(createMapPin(notice[i], i));
  }
  mapPins.appendChild(fragment);
};

var photoInCard = idCard.content.querySelector('.popup__photo');
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
var mapCard = idCard.content.querySelector('.map__card');
var createCards = function (notice, index) {
  var cardElement = mapCard.cloneNode(true);
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

  cardElement.classList.add('visually-hidden');
  cardElement.dataset.notice = index;

  return cardElement;
};

var firstPhoto = idCard.content.querySelector('.popup__photo');
firstPhoto.remove('img:first-child');

var userDialog = document.querySelector('.map');
var nextSibling = document.querySelector('.map__filters-container');
var renderCards = function (notice) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < notice.length; i++) {
    fragment.appendChild(createCards(notice[i], i));
  }
  userDialog.insertBefore(fragment, nextSibling);
};

// Отключаем поля формы
var fieldset = document.querySelectorAll('fieldset');
var lockCard = function () {
  fieldset.forEach(function (elem) {
    elem.setAttribute('disabled', 'true');
  });
};

lockCard();

// Активация страницы
var formDisabled = document.querySelector('.ad-form');
var mapPinMain = document.querySelector('.map__pin--main');

var unlockCard = function () {
  userDialog.classList.remove('map--faded');
  formDisabled.classList.remove('ad-form--disabled');
  fieldset.forEach(function (elem) {
    elem.removeAttribute('disabled', 'true');
  });
};

// Заполнение поля адреса
var address = document.querySelector('#address');
var setAddress = function () {
  address.value = mapPinMain.offsetLeft + ', ' + mapPinMain.offsetTop;
  address.setAttribute('readonly', 'true');
};

var onKeydownEsc = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    hideActiveMapCard();
  }
};

// открытие, закрытие карточки объявления по клику на метке
var activeMapCard;

var hideActiveMapCard = function () {
  if (activeMapCard !== undefined) {
    activeMapCard.classList.add('visually-hidden');
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
  setAddress();
  renderMapPins(generateNotices());
  renderCards(generateNotices());
  onCloseMapCardClick();
};

mapPinMain.addEventListener('mouseup', onMapPinMainMouseUp);

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
