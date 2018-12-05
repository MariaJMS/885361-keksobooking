'use strict';

(function () {

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
      window.map.showMapCard(index);
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

  window.pin = {
    renderMapPins: renderMapPins
  };

})();
