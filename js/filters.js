'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var housingWiFi = housingFeatures.querySelector('#filter-wifi');
  var housingDishwasher = housingFeatures.querySelector('#filter-dishwasher');
  var housingParking = housingFeatures.querySelector('#filter-parking');
  var housingWasher = housingFeatures.querySelector('#filter-washer');
  var housingElevator = housingFeatures.querySelector('#filter-elevator');
  var housingConditioner = housingFeatures.querySelector('#filter-conditioner');
  var PINS_COUNT = 5;

  /**
  * @description Проверка для каждого элемента массива на основе значения фильтра типа жилья
  * @param {Object} item - Элемент массива (объект) для которого выполняется проверка
  * @return {Boolean} - Автоматическое прохождение проверки
  * @return {Function} - Прохождение проверки на соответствие типа жилья значению фильтра
  */
  var getHousingType = function (item) {
    if (housingType.value === 'any') {
      return true;
    } else {
      return item.offer.type === housingType.value;
    }
  };

  /**
  * @description Проверка для каждого элемента массива на основе значения фильтра цены
  * @param {Object} item - Элемент массива (объект) для которого выполняется проверка
  * @return {Boolean} - Автоматическое прохождение проверки
  * @return {Function} - Прохождение проверки на соответствие типа жилья значению фильтра
  */
  var getHousingPrice = function (item) {
    if (housingPrice.value === 'any') {
      return true;
    } else {
      return (
        ((housingPrice.value === 'low') && (item.offer.price < 10000)) ||
        ((housingPrice.value === 'high') && (item.offer.price > 50000)) ||
        ((housingPrice.value === 'middle') && (item.offer.price >= 10000) && (item.offer.price <= 50000))
      );
    }
  };

  /**
  * @description Проверка для каждого элемента массива на основе значения фильтра количества комнат
  * @param {Object} item - Элемент массива (объект) для которого выполняется проверка
  * @return {Boolean} - Автоматическое прохождение проверки
  * @return {Function} - Прохождение проверки на соответствие типа жилья значению фильтра
  */
  var getHousingRooms = function (item) {
    if (housingRooms.value === 'any') {
      return true;
    } else {
      return item.offer.rooms === parseInt(housingRooms.value, 10);
    }
  };

  /**
  * @description Проверка для каждого элемента массива на основе значения фильтра количества гостей
  * @param {Object} item - Элемент массива (объект) для которого выполняется проверка
  * @return {Boolean} - Автоматическое прохождение проверки
  * @return {Function} - Прохождение проверки на соответствие типа жилья значению фильтра
  */
  var getHousingGuests = function (item) {
    if (housingGuests.value === 'any') {
      return true;
    } else {
      return (
        ((item.offer.guests !== 0) && (item.offer.guests >= parseInt(housingGuests.value, 10))) ||
        ((item.offer.guests === 0) && (parseInt(housingGuests.value, 10) === 0))
      );
    }
  };

  /**
  * @description На основе изначального массива данных создает новый
  * подходящий под условия фильтров и имеющий нужную длину
  * @return {Array} - Новый массив
  */
  var filterAll = function () {
    console.log(window.defaultData);
    return window.defaultData
    .filter(function (item) {
      return (
        getHousingType(item) &&
        getHousingRooms(item) &&
        getHousingGuests(item) &&
        getHousingPrice(item)
      );
    })
    .slice(0, PINS_COUNT);
  };

  /**
  * @description Обработчик, закрывает объявления, убирает пины и создает новые на основе требований фильтра
  */
  var onHousingFilter = function () {
    window.card.closeCard();
    window.pin.removeOffer();
    window.map.showOffersPins(filterAll());
  };

  /**
  * @description Событие изменения значения фильтра типа жилья
  */
  housingType.addEventListener('change', onHousingFilter);

  /**
  * @description Событие изменения значения фильтра цены
  */
  housingPrice.addEventListener('change', onHousingFilter);

  /**
  * @description Событие изменения значения фильтра количества комнат
  */
  housingRooms.addEventListener('change', onHousingFilter);

  /**
  * @description Событие изменения значения фильтра количества гостей
  */
  housingGuests.addEventListener('change', onHousingFilter);

  window.filters = {
    filterAll: filterAll
  };

})();
