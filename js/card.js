'use strict';

(function () {
  var idCard = document.querySelector('#card');
  var userDialog = document.querySelector('.map');

  var photoInCard = idCard.content.querySelector('.popup__photo');
  var createPhoto = function (photo) {
    var photoElement = photoInCard.cloneNode(true);
    photoElement.src = photo;

    return photoElement;
  };

  var generatePhotoInCard = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.PHOTOS.length; i++) {
      fragment.appendChild(createPhoto(window.data.PHOTOS[i]));
    }
    return fragment;
  };

  var featureTemplate = document.createElement('li');
  featureTemplate.classList.add('popup__feature');

  var getPopupFeatureList = function (features) {
    var fragment = document.createDocumentFragment();
    features.forEach(function (feature) {
      var item = featureTemplate.cloneNode(true);
      item.classList.add('popup__feature--' + feature);
      fragment.appendChild(item);
    });
    return fragment;
  };

  // создаем DOM-элементы объявления
  var mapCard = idCard.content.querySelector('.map__card');
  var createCards = function (notice, index) {
    var cardElement = mapCard.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = notice.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = notice.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = notice.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.data.OFFER_TYPES[notice.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = notice.offer.rooms + ' комнаты для ' + notice.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + notice.offer.checkin + ', выезд до' + notice.offer.checkout;
    cardElement.querySelector('.popup__features').appendChild(getPopupFeatureList(notice.offer.features));
    cardElement.querySelector('.popup__description').textContent = notice.offer.description;
    cardElement.querySelector('.popup__photos').appendChild(generatePhotoInCard(notice.offer.photos));
    cardElement.querySelector('.popup__avatar').src = notice.author.avatar;

    cardElement.classList.add('visually-hidden');
    cardElement.dataset.notice = index;

    return cardElement;
  };

  var firstPhoto = idCard.content.querySelector('.popup__photo');
  firstPhoto.remove('img:first-child');

  var allFeatures = idCard.content.querySelectorAll('li');
  var deleteFeatures = function () {
    allFeatures.forEach(function (elem) {
      elem.remove('li');
    });
  };
  deleteFeatures();

  var nextSibling = document.querySelector('.map__filters-container');
  var renderCards = function (notice) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.pin.NUMBER_NOTICE; i++) {
      fragment.appendChild(createCards(notice[i], i));
    }
    userDialog.insertBefore(fragment, nextSibling);
  };

  renderCards(window.pin.notices);

})();
