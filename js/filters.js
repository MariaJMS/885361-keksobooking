'use strict';
(function () {

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

  var getFilterParameterType = function (arr, filterFormElement) {
    if (filterFormElement.value === 'any') {
      return true;
    }
    return arr.offer.type === filterFormElement.value;
  };

  var getFilterParameterPrice = function (arr, filterFormElement) {
    var minPrice = housingPriceDictionary[filterFormElement.value].minPrice;
    var maxPrice = housingPriceDictionary[filterFormElement.value].maxPrice;
    if (filterFormElement.value === 'any') {
      return true;
    }
    return arr.offer.price >= minPrice && arr.offer.price <= maxPrice;
  };

  var getFilterParameterRooms = function (arr, filterFormElement) {
    if (filterFormElement.value === 'any') {
      return true;
    }
    return arr.offer.rooms === Number(filterFormElement.value);
  };

  var getFilterParameterGuests = function (arr, filterFormElement) {
    if (filterFormElement.value === 'any') {
      return true;
    }
    return arr.offer.guests === Number(filterFormElement.value);
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

  var getFilterParameterFeatures = function (arr) {
    var features = arr.offer.features;
    var pickedFeatures = selectedFeatures;
    for (var i = 0; i < pickedFeatures.length; i++) {
      if (features.indexOf(pickedFeatures[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  var onFiltersChange = function () {
    updateFeatures();
    var filtersArr = window.dataArray.filter(function (filtredData) {
      var arrType = getFilterParameterType(filtredData, housingType);
      var arrPrice = getFilterParameterPrice(filtredData, housingPrice);
      var arrRooms = getFilterParameterRooms(filtredData, housingRoms);
      var arrGuests = getFilterParameterGuests(filtredData, housingGuests);
      var arrFeatures = getFilterParameterFeatures(filtredData);

      return arrType && arrPrice && arrRooms && arrGuests && arrFeatures;
    });

    window.dataArrayCopy = filtersArr;
    window.utils.debounce(window.pin.renderMapPins);

  };

  mapFiltersForm.addEventListener('change', onFiltersChange);
})();
