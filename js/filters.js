'use strict';

(function () {
  var PINS_COUNT = 5;
  var housingType = window.util.Element.mapFilter.querySelector('#housing-type');
  var housingPrice = window.util.Element.mapFilter.querySelector('#housing-price');
  var housingRooms = window.util.Element.mapFilter.querySelector('#housing-rooms');
  var housingGuests = window.util.Element.mapFilter.querySelector('#housing-guests');
  var housingFeatures = window.util.Element.mapFilter.querySelector('#housing-features');

  /**
  * @description Проверка для каждого элемента массива на основе значения фильтра типа жилья
  * @param {Object} item - Элемент массива (объект) для которого выполняется проверка
  * @return {Boolean} - Подходит ли типа жилья под фильтр
  */
  var getHousingType = function (item) {
    if (housingType.value === 'any') {
      return true;
    }
    return item.offer.type === housingType.value;
  };

  /**
  * @description Проверка для каждого элемента массива на основе значения фильтра цены
  * @param {Object} item - Элемент массива (объект) для которого выполняется проверка
  * @return {Boolean} - Подходит ли цена под фильтр
  */
  var getHousingPrice = function (item) {
    if (housingPrice.value === 'any') {
      return true;
    }
    return (
      ((housingPrice.value === 'low') && (item.offer.price < 10000)) ||
      ((housingPrice.value === 'high') && (item.offer.price > 50000)) ||
      ((housingPrice.value === 'middle') && (item.offer.price >= 10000) && (item.offer.price <= 50000))
    );
  };

  /**
  * @description Проверка для каждого элемента массива на основе значения фильтра количества комнат
  * @param {Object} item - Элемент массива (объект) для которого выполняется проверка
  * @return {Boolean} - Подходит ли количество комнат под фильтр
  */
  var getHousingRooms = function (item) {
    if (housingRooms.value === 'any') {
      return true;
    }
    return item.offer.rooms === parseInt(housingRooms.value, 10);
  };

  /**
  * @description Проверка для каждого элемента массива на основе значения фильтра количества гостей
  * @param {Object} item - Элемент массива (объект) для которого выполняется проверка
  * @return {Boolean} - Подходит ли количество гостей под фильтр
  */
  var getHousingGuests = function (item) {
    if (housingGuests.value === 'any') {
      return true;
    }
    return (
      ((parseInt(housingGuests.value, 10) !== 0) && (item.offer.guests >= parseInt(housingGuests.value, 10))) ||
      ((parseInt(housingGuests.value, 10) === 0) && (item.offer.guests === 0))
    );
  };

  /**
  * @description Проверка для каждого элемента массива на основе значения одного из фильров удобств
  * @param {Object} item - Элемент массива (объект) для которого выполняется проверка
  * @param {HTMLElement} feature - Фильтр для, которого выполняется проверка
  * @return {Boolean} - Подходит ли удобства под фильтр
  */
  var getHousingFeatures = function (item) {
    return Array.from(housingFeatures.children)
      .filter(function (feature) {
        return feature.checked === true;
      })
      .map(function (feature) {
        return feature.value;
      })
      .every(function (feature) {
        return item.offer.features.indexOf(feature) !== -1;
      });
  };

  /**
  * @description На основе изначального массива данных создает новый
  * подходящий под условия фильтров и имеющий нужную длину
  * @return {Array} - Новый массив
  */
  var filterAll = function () {
    return window.defaultData
    .filter(function (item) {
      return (
        getHousingType(item) &&
        getHousingRooms(item) &&
        getHousingGuests(item) &&
        getHousingPrice(item) &&
        getHousingFeatures(item)
      );
    })
    .slice(0, PINS_COUNT);
  };

  /**
  * @description Обработчик, закрывает объявления, убирает пины и создает новые на основе требований фильтра
  */
  var onHousingFilter = window.debounce(function () {
    window.card.close();
    window.pin.remove();
    window.map.showOffersPins(filterAll());
  });

  var resetFilters = function () {
    window.util.Element.mapFilter.reset();
  };

  /**
  * @description Событие изменения значения фильтра типа жилья
  */
  window.util.Element.mapFilter.addEventListener('change', onHousingFilter);

  window.filters = {
    filterAll: filterAll,
    reset: resetFilters
  };

})();
