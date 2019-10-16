'use strict';

(function () {
  var mapFiltersFormSelects = window.util.Element.mapFilter.querySelectorAll('select');
  var mapFiltersFormFieldsets = window.util.Element.mapFilter.querySelectorAll('fieldset');
  var adFormSelects = window.util.Element.adForm.querySelectorAll('select');
  var adFormFieldsets = window.util.Element.adForm.querySelectorAll('fieldset');

  /**
   * @description Показывает карту
   */
  var activateMap = function () {
    window.util.Element.map.classList.remove('map--faded');
  };

  /**
   * @description Показывает пин объявления на карте
   * @param {Array} data - Данные объявлений
   */
  var showOffersPins = function (data) {
    var fragment = document.createDocumentFragment();

    data.forEach(function (pin) {
      var offer = window.pin.render(pin);
      fragment.appendChild(offer);
    });

    window.util.Element.mapPinsContainer.appendChild(fragment);
  };

  /**
   * @description Отображение пинов объявлений на карте с использование данных с сервера
   */
  var loadOffersPins = function () {
    window.backend.load(function (data) {
      window.defaultData = data;
      showOffersPins(window.filters.filterAll());
    }, window.util.onError);
  };

  /**
   * @description Неактивное состояние страницы, формы заблокированы
   */
  var deactivatePage = function () {
    window.util.toggleEnableElements(mapFiltersFormSelects, true);
    window.util.toggleEnableElements(mapFiltersFormFieldsets, true);
    window.util.toggleEnableElements(adFormFieldsets, true);
    window.util.toggleEnableElements(adFormSelects, true);
    window.form.setPinCoordinates(true);
    if (!window.util.Element.adForm.classList.contains('ad-form--disabled')) {
      window.util.Element.adForm.classList.add('ad-form--disabled');
    }
  };

  /**
   * @description Активное состояние страницы, формы разблокированы,
   * на карте отражаются похожие объявления
   */
  var activatePage = function () {
    if (!window.util.Element.map.classList.contains('map--faded')) {
      return;
    }
    window.util.Element.adForm.classList.remove('ad-form--disabled');
    window.util.toggleEnableElements(mapFiltersFormSelects, false);
    window.util.toggleEnableElements(mapFiltersFormFieldsets, false);
    window.util.toggleEnableElements(adFormFieldsets, false);
    window.util.toggleEnableElements(adFormSelects, false);

    window.form.setPinCoordinates(false);
    window.form.setOptionsForRooms();
    window.form.setPriceMinValue();
    activateMap();
    loadOffersPins();
    document.removeEventListener('DOMContentLoaded', deactivatePage);
  };

  /**
   * @description При загрузке страница находится в неактивном состоянии
   */
  document.addEventListener('DOMContentLoaded', deactivatePage);

  /**
   * @description При клике на пин страница переводится в активное состояние
   */
  window.util.Element.pinButton.addEventListener('mousedown', activatePage);

  /**
   * @description При нажании Enter с фокусом на пине страница переводится в активное состояние
   */
  window.util.Element.pinButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.Keycode.ENTER) {
      activatePage();
    }
  });

  window.map = {
    activatePage: activatePage,
    deactivatePage: deactivatePage,
    showOffersPins: showOffersPins
  };

})();
