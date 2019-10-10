'use strict';

(function () {
  var accommodationFilter = document.querySelector('#housing-type');

  var filterAccommodation = function (filteredData) {
    window.pin.removeOffer();
    if (accommodationFilter.value !== 'any') {
      filteredData = window.defaultData.slice().filter(function (item) {
        return item.offer.type === accommodationFilter.value;
      });
    } else {
      filteredData = window.defaultData;
    }
    console.log(filteredData);
    window.map.showOffersPins(filteredData);
  };

  accommodationFilter.addEventListener('change', filterAccommodation);

  window.filters = {
    filterAccommodation: filterAccommodation
  };

})();
