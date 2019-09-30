'use strict';

(function () {
  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFiltersFormSelects = mapFiltersForm.querySelectorAll('select');
  var mapFiltersFormFieldsets = mapFiltersForm.querySelectorAll('fieldset');
  var adFormSelects = window.util.elems.adForm.querySelectorAll('select');
  var adFormFieldsets = window.util.elems.adForm.querySelectorAll('fieldset');

  var mapPinsContainer = document.querySelector('.map__pins');
  var secondaryPin = window.util.elems.mapElement.querySelector('.map__pin:not(.map__pin--main)');

  /**
   * @description Показывает карту
   */
  var showDialog = function () {
    window.util.elems.mapElement.classList.remove('map--faded');
  };

  /**
   * @description Показывает пин объявления на карте
   */
  var showOffersPins = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.offerDataArray.length; i++) {
      var offerData = window.data.offerDataArray[i];
      fragment.appendChild(window.pin.renderOffer(offerData));
    }

    mapPinsContainer.appendChild(fragment);
  };

  /**
   * @description Неактивное состояние страницы, формы заблокированы
   */
  var deactivatePage = function () {
    window.util.functions.toggleEnableElements(mapFiltersFormSelects, true);
    window.util.functions.toggleEnableElements(mapFiltersFormFieldsets, true);
    window.util.functions.toggleEnableElements(adFormFieldsets, true);
    window.util.functions.toggleEnableElements(adFormSelects, true);
  };

  /**
   * @description Активное состояние страницы, формы разблокированы,
   * на карте отражаются похожие объявления
   */
  var activatePage = function () {
    window.util.elems.adForm.classList.remove('ad-form--disabled');
    window.util.functions.toggleEnableElements(mapFiltersFormSelects, false);
    window.util.functions.toggleEnableElements(mapFiltersFormFieldsets, false);
    window.util.functions.toggleEnableElements(adFormFieldsets, false);
    window.util.functions.toggleEnableElements(adFormSelects, false);
    window.form.elems.adFormAdressInput.classList.add('ad-form--disabled');

    window.form.functions.setPinCoordinates(false);
    window.form.functions.setOptionsForRooms();
    window.form.functions.setPriceMinValue();
    showDialog();
    showOffersPins();
    document.removeEventListener('DOMContentLoaded', deactivatePage);
  };

  /**
   * @description При загрузке страница находится в неактивном состоянии
   */
  document.addEventListener('DOMContentLoaded', function () {
    deactivatePage();
    window.form.functions.setPinCoordinates(true);
  });

  /**
   * @description При клике на пин страница переводится в активное состояние
   */
  window.util.elems.pinButton.addEventListener('mousedown', function () {
    if (window.util.elems.pinButton.closest('.map--faded') !== null) {
      activatePage();
    }
  });

  /**
   * @description При нажании Enter с фокусом на пине страница переводится в активное состояние
   */
  window.util.elems.pinButton.addEventListener('keydown', function (evt) {
    if ((evt.keyCode === window.util.keycode.ENTER_KEYCODE) && (window.util.elems.pinButton.closest('.map--faded') !== null)) {
      activatePage();
    }
  });

  /**
   * Закртыие карточки
   */
  var closeCard = function () {
    var pinPopup = document.querySelector('.map__card');
    if (window.util.elems.mapElement.contains(pinPopup)) {
      window.util.elems.mapElement.removeChild(pinPopup);
    }
  };

  /**
   * @description Открытие попапа с информацией об объявлении при клике на пин (при помощи делегирования)
   */
  mapPinsContainer.addEventListener('click', function (evt) {
    closeCard();
    if (evt.target.closest('.map__pin:not(.map__pin--main)')) {
      var currentData = evt.target.closest('.map__pin:not(.map__pin--main)').dataset.id;
      window.card.showModalOffer(window.data.offerDataArray[currentData]);
    }
  });

  /**
   * @description Открытие попапа с информацией об объявлении при нажатии Enter с фокусом на пине (при помощи делегирования)
   */
  mapPinsContainer.addEventListener('keydown', function (evt) {
    if ((evt.keyCode === window.util.keycode.ENTER_KEYCODE) && (document.activeElement === secondaryPin)) {
      var currentData = evt.target.closest('.map__pin:not(.map__pin--main)').dataset.id;
      window.card.showModalOffer(window.data.offerDataArray[currentData]);
    }
  });

  /**
   * @description Зыкрытие попапа с информацией об объявлении при нажатии ECS
   */
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.keycode.ESC_KEYCODE) {
      closeCard();
    }
  });

  /**
   * @description Зыкрытие попапа с информацией об объявлении при клике на крестик (при помощи делегирования)
   */
  document.addEventListener('click', function (evt) {
    if (evt.target.matches('.popup__close')) {
      closeCard();
    }
  });

})();
