'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var OfferType = {
    FLAT: 'Квартира',
    PALACE: 'Дворец',
    HOUSE: 'Домик',
    BUNGALO: 'Бунгало'
  };

  var idCard = document.querySelector('#card');
  var photoInCard = idCard.content.querySelector('.popup__photo');
  var createPhoto = function (photo) {
    var photoElement = photoInCard.cloneNode(true);
    photoElement.src = photo;

    return photoElement;
  };

  var generatePhotoInCard = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(createPhoto(photos[i]));
    }
    return fragment;
  };

  var featureTemplate = document.createElement('li');
  featureTemplate.classList.add('popup__feature');

  var generateFeatureList = function (features) {
    var fragment = document.createDocumentFragment();
    features.forEach(function (feature) {
      var featuresElement = featureTemplate.cloneNode(true);
      featuresElement.classList.add('popup__feature--' + feature);
      fragment.appendChild(featuresElement);
    });
    return fragment;
  };

  var removeElement = function (element) {
    element.parentNode.removeChild(element);
  };

  var closeCard = function (evt) {
    var target = evt.target;
    var targetBlock = target.parentNode;
    removeElement(targetBlock);
  };

  // создаем DOM-элементы объявления
  var mapCard = idCard.content.querySelector('.map__card');
  var createCards = function (notice) {

    var currentCard = window.map.userDialog.querySelector('.map__card');
    if (currentCard !== null) {
      currentCard.remove();
    }

    var cardElement = mapCard.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = notice.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = notice.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = notice.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = OfferType[notice.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = notice.offer.rooms + ' комнаты для ' + notice.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + notice.offer.checkin + ', выезд до' + notice.offer.checkout;
    cardElement.querySelector('.popup__features').appendChild(generateFeatureList(notice.offer.features));
    cardElement.querySelector('.popup__description').textContent = notice.offer.description;
    cardElement.querySelector('.popup__photos').appendChild(generatePhotoInCard(notice.offer.photos));
    cardElement.querySelector('.popup__avatar').src = notice.author.avatar;

    var cardCloseButton = cardElement.querySelector('.popup__close');
    cardCloseButton.addEventListener('click', closeCard);

    return cardElement;
  };

  document.addEventListener('keydown', function (evt) {
    var currentCard = window.map.userDialog.querySelector('.map__card');
    if (evt.keyCode === ESC_KEYCODE && currentCard !== null) {
      currentCard.remove();
    }
  });

  var firstPhoto = idCard.content.querySelector('.popup__photo');
  firstPhoto.remove('img:first-child');

  var allFeatures = idCard.content.querySelectorAll('li');
  allFeatures.forEach(function (elem) {
    elem.remove('li');
  });

  window.card = {
    createCards: createCards
  };

})();
