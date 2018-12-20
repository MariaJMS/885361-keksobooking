'use strict';

(function () {

  var mapPins = document.querySelector('.map__pins');

  // создаем DOM-элементы, соответствующие меткам на карте
  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var createMapPin = function (notice, index) {
    var mapPinElement = mapPin.cloneNode(true);
    mapPinElement.style.left = notice.location.x + 'px';
    mapPinElement.style.top = notice.location.y + 'px';
    mapPinElement.querySelector('img').src = notice.author.avatar;
    mapPinElement.querySelector('img').alt = notice.offer.title;
    mapPinElement.setAttribute('data-index', index);

    mapPinElement.addEventListener('click', function (evt) {
      var allPins = window.map.userDialog.querySelectorAll('.map__pin');
      allPins.forEach(function (current) {
        current.classList.remove('map__pin--active');
      });

      var mapFilters = document.querySelector('.map__filters-container');
      var currentElement = evt.currentTarget;
      currentElement.classList.add('map__pin--active');
      window.map.userDialog.insertBefore(window.card.createCards(notice), mapFilters);
    });

    return mapPinElement;
  };

  var fragment = document.createDocumentFragment();

  var renderMapPins = function (dataArray) {
    var allPins = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
    allPins.forEach(function (item) {
      item.remove();
    });

    for (var i = 0; i < dataArray.length; i++) {
      if (dataArray[i]) {
        fragment.appendChild(createMapPin(dataArray[i], i));
      }
    }
    mapPins.appendChild(fragment);
  };

  window.pin = {
    renderMapPins: renderMapPins
  };

})();
