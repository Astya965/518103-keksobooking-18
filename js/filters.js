'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  var PINS_COUNT = 5;

  /**
  * @description Проверка для каждого элемента массива на основе значения фильтра типа
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
  * @description На основе изначального массива данных создает новый
  * подходящий под условия фильтров и имеющий нужную длину
  * @return {Array} - Новый массив
  */
  var filterAll = function () {
    return window.defaultData
    .filter(function (item) {
      return getHousingType(item);
    })
    .slice(0, PINS_COUNT);
  };

  /**
  * @description Обработчик, закрывает объявления, убирает пины и создает новые на основе требований фильтра
  */
  var onHousingFilter = function () {
    window.card.closeCard();
    window.pin.removeOffer();
    window.map.showOffersPins(filterAll(window.defaultData));
  };

  /**
  * @description Событие изменения значения фильтра типа жилья
  */
  housingType.addEventListener('change', onHousingFilter);

  window.filters = {
    filterAll: filterAll
  };

})();
