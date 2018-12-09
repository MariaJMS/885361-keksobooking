'use strict';

(function () {

  var NUMBER_NOTICE = 8;

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
  var notices = [];
  var renderMapPins = function (dataArr) {
    for (var i = 0; i < NUMBER_NOTICE; i++) {
      var dataArrItem = window.data.getRandomItem(dataArr);
      notices[i] = {
        author: {
          avatar: dataArrItem.author.avatar
        },
        offer: {
          title: dataArrItem.offer.title,
          address: dataArrItem.offer.address,
          price: dataArrItem.offer.price,
          type: dataArrItem.offer.type,
          rooms: dataArrItem.offer.rooms,
          guests: dataArrItem.offer.guests,
          checkin: dataArrItem.offer.checkin,
          checkout: dataArrItem.offer.checkout,
          features: dataArrItem.offer.features,
          description: dataArrItem.offer.description,
          photos: dataArrItem.offer.photos
        },
        location: {
          x: dataArrItem.location.x,
          y: dataArrItem.location.y,
        }
      };
    }
    var fragment = document.createDocumentFragment();
    for (i = 0; i < NUMBER_NOTICE; i++) {
      fragment.appendChild(createMapPin(notices[i], i));
    }
    mapPins.appendChild(fragment);
  };

  var showError = function (errMes) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errMes;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(renderMapPins, showError);

  window.pin = {
    renderMapPins: renderMapPins,
    notices: notices,
    NUMBER_NOTICE: NUMBER_NOTICE
  };

})();
