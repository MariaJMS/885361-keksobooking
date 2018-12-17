'use strict';

(function () {

  var main = document.querySelector('main');
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
      var elementIndex = currentElement.dataset.index;
      window.map.userDialog.insertBefore(window.card.createCards(window.dataArrayCopy[elementIndex]), mapFilters);
    });

    return mapPinElement;
  };

  var fragment = document.createDocumentFragment();
  var renderMapPins = function () {

    var allPins = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
    allPins.forEach(function (item) {
      item.remove();
    });
    for (var i = 0; i < window.dataArrayCopy.length; i++) {
      if (window.dataArrayCopy[i]) {
        fragment.appendChild(createMapPin(window.dataArrayCopy[i], i));
      }
    }
    mapPins.appendChild(fragment);
  };

  // окно с ошибкой отправки формы
  var showError = function (errMes) {
    var error = document.querySelector('#error').content.querySelector('.error');
    var errorElement = error.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    var errorButton = errorElement.querySelector('.error__button');
    errorMessage.textContent = errMes;

    main.insertAdjacentElement('afterbegin', errorElement);
    document.addEventListener('keydown', closeError);
    errorElement.addEventListener('click', closeError);
    errorButton.addEventListener('click', closeError);
  };

  var closeError = function () {
    var errorElement = document.querySelector('.error');
    main.removeChild(errorElement);
    document.removeEventListener('keydown', closeError);
    errorElement.removeEventListener('click', closeError);
    window.form.onSubmit();
  };

  window.pin = {
    renderMapPins: renderMapPins,
    showError: showError
  };

})();
