'use strict';
(function () {

  var mapFiltersForm = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  // var housingPrice = window.map.userDialog.querySelector('#housing-price');
  // var housingRoms = window.map.userDialog.querySelector('#housing-rooms');
  // var housingGuests = window.map.userDialog.querySelector('#housing-guests');
  // var housingFeatures = window.map.userDialog.querySelector('#housing-features');

  var getFilterParameterType = function (arr, filterFormElement) {
    if (filterFormElement.value === 'any') {
      return true;
    }
    return arr.offer.type === filterFormElement.value;
  };

  var onFiltersChange = function () {
    var filtersArr = window.pin.notices.filter(function (filtredData) {
      var arrType = getFilterParameterType(filtredData, housingType);

      return arrType;
    });

    window.pin.notices = filtersArr;
    window.pin.generateMapPins(filtersArr);
  };

  mapFiltersForm.addEventListener('change', onFiltersChange);
})();
