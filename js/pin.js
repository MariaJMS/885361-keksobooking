'use strict';

(function () {

  var main = document.querySelector('main');
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
      notices.push(dataArrItem);
    }
    return notices;
  };

  var fragment = document.createDocumentFragment();
  var generateMapPins = function (dataArr) {
    for (var i = 0; i < NUMBER_NOTICE; i++) {
      fragment.appendChild(createMapPin(dataArr[i], i));
    }
    mapPins.appendChild(fragment);
  };

  // окно с ошибкой отправки формы
  var showError = function (errMes) {
    var error = document.querySelector('#error').content.querySelector('.error');
    var errorElement = error.cloneNode(true);
    var errMsg = errorElement.querySelector('.error__message');
    var errBtn = errorElement.querySelector('.error__button');
    errMsg.textContent = errMes;

    main.insertAdjacentElement('afterbegin', errorElement);
    document.addEventListener('keydown', closeError);
    errorElement.addEventListener('click', closeError);
    errBtn.addEventListener('click', closeError);
  };

  var closeError = function () {
    var errorElement = document.querySelector('.error');
    main.removeChild(errorElement);
    document.removeEventListener('keydown', closeError);
    errorElement.removeEventListener('click', closeError);
    window.form.onSubmit();
  };

  window.backend.loadData(renderMapPins, showError);

  window.pin = {
    renderMapPins: renderMapPins,
    notices: notices,
    NUMBER_NOTICE: NUMBER_NOTICE,
    generateMapPins: generateMapPins,
    showError: showError
  };

})();
