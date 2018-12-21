'use strict';
(function () {
  var notices = [];
  var housingPriceDictionary = {
    'any': {
      minPrice: 0,
      maxPrice: Infinity
    },
    'low': {
      minPrice: 0,
      maxPrice: 10000
    },
    'middle': {
      minPrice: 10000,
      maxPrice: 50000
    },
    'high': {
      minPrice: 50000,
      maxPrice: Infinity
    }
  };

  var mapFiltersForm = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = window.map.userDialog.querySelector('#housing-price');
  var housingRoms = window.map.userDialog.querySelector('#housing-rooms');
  var housingGuests = window.map.userDialog.querySelector('#housing-guests');
  var housingFeatures = window.map.userDialog.querySelectorAll('.map__checkbox');

  var getFilterParameterType = function (pin, filterFormElement) {
    if (filterFormElement.value === 'any') {
      return true;
    }
    return pin.offer.type === filterFormElement.value;
  };

  var getFilterParameterPrice = function (pin, filterFormElement) {
    var priceView = housingPriceDictionary[filterFormElement.value];

    var minPrice = priceView.minPrice;
    var maxPrice = priceView.maxPrice;
    if (filterFormElement.value === 'any') {
      return true;
    }
    return pin.offer.price >= minPrice && pin.offer.price <= maxPrice;
  };

  var getFilterParameterRooms = function (pin, filterFormElement) {
    if (filterFormElement.value === 'any') {
      return true;
    }
    return pin.offer.rooms === Number(filterFormElement.value);
  };

  var getFilterParameterGuests = function (pin, filterFormElement) {
    if (filterFormElement.value === 'any') {
      return true;
    }
    return pin.offer.guests === Number(filterFormElement.value);
  };

  var selectedFeatures = [];
  var updateFeatures = function () {
    selectedFeatures = [];
    housingFeatures.forEach(function (current) {
      if (current.checked) {
        selectedFeatures.push(current.value);
      }
    });
  };

  var getFilterParameterFeatures = function (pin) {
    var features = pin.offer.features;
    var pickedFeatures = selectedFeatures;
    for (var i = 0; i < pickedFeatures.length; i++) {
      if (features.indexOf(pickedFeatures[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  var onFiltersChange = function (evt) {
    evt.preventDefault();
    updateFeatures();
    var filtersPin = notices.filter(function (filtredData) {
      return getFilterParameterType(filtredData, housingType) &&
      getFilterParameterPrice(filtredData, housingPrice) &&
      getFilterParameterRooms(filtredData, housingRoms) &&
      getFilterParameterGuests(filtredData, housingGuests) &&
      getFilterParameterFeatures(filtredData);
    });

    window.utils.debounce(window.pin.renderMapPins, filtersPin);
  };

  var initializeFilters = function (dataArray) {
    notices = dataArray;
    mapFiltersForm.addEventListener('change', onFiltersChange);
  };

  window.filters = {
    initializeFilters: initializeFilters
  };
})();
