'use strict';

(function () {
  var PREVIEW_IMG = 'img/muffin-grey.svg';
  var adFormTitleInput = window.util.Element.adForm.querySelector('#title');
  var adFormAdressInput = window.util.Element.adForm.querySelector('#address');
  var adFormAccommodationInput = window.util.Element.adForm.querySelector('#type');
  var adFormPriceInput = window.util.Element.adForm.querySelector('#price');
  var adFormTimeinInput = window.util.Element.adForm.querySelector('#timein');
  var adFormTimeoutInput = window.util.Element.adForm.querySelector('#timeout');
  var adFormRoomsInput = window.util.Element.adForm.querySelector('#room_number');
  var adFormCapacityInput = window.util.Element.adForm.querySelector('#capacity');
  var adFormCapacityOptions = adFormCapacityInput.querySelectorAll('option');
  var adFormAvatarInput = window.util.Element.adForm.querySelector('#avatar');
  var adFormAvatarPreview = window.util.Element.adForm.querySelector('.ad-form-header__preview').querySelector('img');
  var adFormImgInput = window.util.Element.adForm.querySelector('#images');
  var adFormImgPreview = window.util.Element.adForm.querySelector('.ad-form__photo-container');
  var adFormAccommodationSelected = adFormAccommodationInput.querySelector('option[selected]');
  var adFormReset = window.util.Element.adForm.querySelector('.ad-form__reset');

  /**
   * Передача координат острого конца метки в поле адреса (форма создания объявления)
   * @param {Boolean} isStartingPosition - Находится ли объект на стратовой позиции (true/false)
   */
  var setPinCoordinates = function (isStartingPosition) {
    var pinX = window.util.Element.pinButton.style.left.slice(0, -2);
    var pinY = window.util.Element.pinButton.style.top.slice(0, -2);

    pinX = Math.round(+pinX + window.data.const.ADJUSTMENT_MAIN_X);
    pinY = isStartingPosition ? Math.round(+pinY + (window.data.const.PIN_HEIGTH / 2)) : Math.round(+pinY + window.data.const.ADJUSTMENT_MAIN_Y);

    adFormAdressInput.value = pinX + ', ' + pinY;
  };

  /**
   * @description Проверка соответствия количества мест количеству комнату
   */
  var checkRoomsAndCapacityValidity = function () {
    if (adFormRoomsInput.value === '100' && adFormCapacityInput.value !== '0') {
      adFormRoomsInput.setCustomValidity('Только не для гостей');
    } else if (adFormCapacityInput.value === '0' && adFormRoomsInput.value !== '100') {
      adFormCapacityInput.setCustomValidity('Для выбора данной опции необходимо 100 комнат');
    } else if (adFormRoomsInput.value < adFormCapacityInput.value && adFormCapacityInput.value !== '0') {
      adFormRoomsInput.setCustomValidity('Количество людей больше, чем мест. Выберете большее количество комнат');
      adFormCapacityInput.setCustomValidity('Количество людей больше, чем мест. Выберете большее количество комнат');
    } else {
      adFormRoomsInput.setCustomValidity('');
      adFormCapacityInput.setCustomValidity('');
    }
  };

  /**
   * @description Проверка соответствия заголовка требованиям
   */
  var checkTitleValidity = function () {
    if (adFormTitleInput.validity.tooShort) {
      adFormTitleInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
    } else if (adFormTitleInput.validity.tooLong) {
      adFormTitleInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (adFormTitleInput.validity.valueMissing) {
      adFormTitleInput.setCustomValidity('Пожалуйста, введите заголовок');
    } else {
      adFormTitleInput.setCustomValidity('');
    }
  };

  /**
   * @description Проверка соответствия заголовка требованиям
   */
  var checkPriceValidity = function () {
    if (adFormPriceInput.validity.rangeUnderflow) {
      adFormPriceInput.setCustomValidity('Цена за ночь аренды не должна быть меньше ' + adFormPriceInput.min + '. Увеличьте значение');
    } else if (adFormPriceInput.validity.rangeOverflow) {
      adFormPriceInput.setCustomValidity('Цена за ночь аренды не должна превышать 1 000 000. Уменьшите значение');
    } else if (adFormPriceInput.validity.valueMissing) {
      adFormPriceInput.setCustomValidity('Пожалуйста, введите цену за ночь аренды');
    } else if (adFormPriceInput.validity.typeMismatch) {
      adFormPriceInput.setCustomValidity('Цена может состоять только из цифр. Введите число');
    } else {
      adFormPriceInput.setCustomValidity('');
    }
  };

  /**
   * @description Отключение неподходящих вариантов для данного количества комнат
   * (при выборе количества комнат в форме создания объявления)
   */
  var setOptionsForRooms = function () {
    [].forEach.call(adFormCapacityOptions, function (option) {
      option.disabled = option.value > adFormRoomsInput.value || adFormRoomsInput.value !== '100' && option.value === '0'
      || adFormRoomsInput.value === '100' && option.value !== '0';
    });
  };

  /**
   * @description Изменение минимального значение поля «Цена за ночь»
   * в зависимости от значения «Тип жилья»
   */
  var setPriceMinValue = function () {
    adFormPriceInput.min = window.data.Map.ACCOMMODATION_TYPE_TO_PRICE[adFormAccommodationInput.value];
    adFormPriceInput.placeholder = window.data.Map.ACCOMMODATION_TYPE_TO_PRICE[adFormAccommodationInput.value];
  };

  var resetPictures = function () {
    adFormAvatarPreview.src = PREVIEW_IMG;
    window.fileInput.removePicture(adFormImgPreview);
  };

  /**
   * @description Событие добавления аватарки пользователя в форму объявления
   */
  adFormAvatarInput.addEventListener('change', function () {
    window.fileInput.addPicture(adFormAvatarInput, true, adFormAvatarPreview);
  });

  /**
   * @description Событие добавления изображения жилья в форму объявления
   */
  adFormImgInput.addEventListener('change', function () {
    window.fileInput.addPicture(adFormImgInput, false, adFormImgPreview);
  });

  /**
   * @description Очистить поля ввода у формы и установить изначальные значения min и placehplder поля цены
   */
  var resetForm = function () {
    window.util.Element.adForm.reset();
    window.filters.reset();
    setPriceMinValue();
    resetPictures();
  };

  /**
   * @description Неактивное состояние при отправке или сбросе формы
   */
  var deactivateForm = function () {
    window.map.deactivatePage();
    resetForm();
    setOptionsForRooms();
    window.pin.remove();
    window.card.close();
    window.pin.setStartPosition();
    setPinCoordinates(true);
    window.util.Element.map.classList.add('map--faded');
  };

  /**
   * @description При выборе количества комнат в форме создания объявления включается
   * проверка соответствия количества мест количеству комнату и отключаются лишние опции при выборе количества мест
   */
  adFormRoomsInput.addEventListener('change', function () {
    checkRoomsAndCapacityValidity();
    setOptionsForRooms();
  });

  /**
   * @description При выборе количества мест в форме создания объявления включается
   * проверка соответствия количества мест количеству комнату и отключаются лишние опции при выборе количества мест
   */
  adFormCapacityInput.addEventListener('change', function () {
    checkRoomsAndCapacityValidity();
  });

  /**
   * @description При выборе заголовка в форме создания объявления включается
   * проверка соответствия на заполнение формы и длину названия
   */
  adFormTitleInput.addEventListener('input', function () {
    checkTitleValidity();
  });

  /**
   * @description При выборе количества мест в форме создания объявления включается
   * проверка соответствия количества мест количеству комнату
   */
  adFormPriceInput.addEventListener('change', function () {
    checkPriceValidity();
    setPriceMinValue();
  });

  /**
   * @description При выборе количества мест в форме создания объявления включается
   * проверка соответствия количества мест количеству комнату
   */
  adFormAccommodationInput.addEventListener('change', function () {
    setPriceMinValue();
  });

  /**
   * @description При выборе времени отъезда оно синхронезируется со времени заезда
   */
  adFormTimeoutInput.addEventListener('change', function () {
    adFormTimeinInput.value = adFormTimeoutInput.value;
  });

  /**
   * @description При выборе времени заезда оно синхронезируется со времени отъезда
   */
  adFormTimeinInput.addEventListener('change', function () {
    adFormTimeoutInput.value = adFormTimeinInput.value;
  });

  /**
   * @description Обработчик события при сбросе значений формы
   */
  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    deactivateForm();
    adFormPriceInput.min = window.data.Map.ACCOMMODATION_TYPE_TO_PRICE[adFormAccommodationSelected.value];
    adFormPriceInput.placeholder = window.data.Map.ACCOMMODATION_TYPE_TO_PRICE[adFormAccommodationSelected.value];
  });

  /**
   * @description Обработчик события отправки данных формы формы
   */
  window.util.Element.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.util.Element.adForm), function () {
      deactivateForm();
      window.util.onSuccess();
    }, window.util.onError);
  });

  window.form = {
    setPinCoordinates: setPinCoordinates,
    setOptionsForRooms: setOptionsForRooms,
    setPriceMinValue: setPriceMinValue,
    deactivateForm: deactivateForm
  };

})();
