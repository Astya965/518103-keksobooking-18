'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var ACCOMMODATION_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ACCOMMODATION_TYPES_MAP = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};
var ACCOMMODATION_TYPE_TO_PRICE_MAP = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};
var CHECKIN_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES_POOL = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTO_COUNT = 3;
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var ADJUSTMENT_X = 65 / 2;
var ADJUSTMENT_MAIN_Y = 65;
var ADJUSTMENT_TAIL_Y = 22;
var ADJUSTMENT_Y = ADJUSTMENT_MAIN_Y + ADJUSTMENT_TAIL_Y;
var OFFERS_LIST_LENGTH = 8;
var DICTIONARY_ROOMS = {
  'one': 'комната',
  'few': 'комнаты',
  'other': 'комнат'};
var DICTIONARY_GUESTS = {
  'one': 'гостя',
  'few': 'гостей',
  'other': 'гостей'};
var offerDataArray = [];
var mapElement = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters-container');
var mapPinsContainer = document.querySelector('.map__pins');
var offersTimplate = document.querySelector('#pin').content.querySelector('.map__pin');
var offersPopupTimplate = document.querySelector('#card').content;
var mapFiltersForm = document.querySelector('.map__filters');
var mapFiltersFormSelects = mapFiltersForm.querySelectorAll('select');
var mapFiltersFormFieldsets = mapFiltersForm.querySelectorAll('fieldset');
var adForm = document.querySelector('.ad-form');
var adFormSelects = adForm.querySelectorAll('select');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var adFormTitleInput = adForm.querySelector('#title');
var adFormAdressInput = adForm.querySelector('#address');
var adFormAccommodationInput = adForm.querySelector('#type');
var adFormPriceInput = adForm.querySelector('#price');
var adFormTimeinInput = adForm.querySelector('#timein');
var adFormTimeoutInput = adForm.querySelector('#timeout');
var adFormRoomsInput = adForm.querySelector('#room_number');
var adFormCapacityInput = adForm.querySelector('#capacity');
var adFormCapacityOptions = adFormCapacityInput.querySelectorAll('option');
var pinButton = mapElement.querySelector('.map__pin--main');

/**
 * @description Показывает карту
 */
var showDialog = function () {
  mapElement.classList.remove('map--faded');
};

/**
 * Выбор случайного числа в заданном промежутке
 * @param {Number} min - Минимальное допустимое значение (включительно)
 * @param {Number} max - Максимальное допустимое значение (включительно)
 * @return {Number} Случайное целое число
 */
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Выбор случайного элемента массива
 * @param {Array} array
 * @return {Any} Случайный элемент массива
 */
var getRandomElement = function (array) {
  var randomIndex = Math.floor(Math.random() * (array.length));
  return array[randomIndex];
};

/**
 * Перемешивание массива (на основе алгоритма Фишера-Йетса)
 * @param {Array} array - Массив, который нужно перемешать
 * @return {Array} Перемешенный массив
 */
var mixArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var swap = array[j];
    array[j] = array[i];
    array[i] = swap;
  }

  return array;
};

/**
 * Согласование существительных с числительными
 * @param {Number} number - числительное в виде числа
 * @param {Object} dictionary - словарь с возможными вариантами существительных
 * @return {String} Подходящее существительное
 */
var connectNounAndNumral = function (number, dictionary) {
  var tens = Math.abs(number) % 100;
  var units = number % 10;
  if (tens > 10 && tens < 20) {
    return dictionary.other;
  }
  if (units > 1 && units < 5) {
    return dictionary.few;
  }
  if (units === 1) {
    return dictionary.one;
  }
  return dictionary.other;
};

/**
 * Генерация массива фотографий
 * @return {Array} Массив фотографий
 */
var getPhotosArray = function () {
  var photosArray = [];
  for (var i = 1; i <= PHOTO_COUNT; i++) {
    photosArray.push('http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg');
  }
  return photosArray;
};

/**
 * Генерация данных объявления
 * @param {Number} index - Передается индекс из цикла при генерации объявлений на карте (находится в showOffersPins())
 * @return {Object} Данные объявления
 */
var generateOfferData = function (index) {
  var locationX = getRandomNumber(MIN_X, MAX_X);
  var locationY = getRandomNumber(MIN_Y, MAX_Y);

  return {
    'author': {
      'avatar': 'img/avatars/user0' + (index + 1) + '.png'
    },

    'offer': {
      'title': 'Предложение ' + getRandomNumber(1, 99),
      'address': (locationX + Math.round(ADJUSTMENT_X)) + ', ' + (locationY + ADJUSTMENT_Y),
      'price': getRandomNumber(1000, 100000),
      'type': getRandomElement(ACCOMMODATION_TYPES),
      'rooms': getRandomNumber(1, 8),
      'guests': getRandomNumber(1, 8),
      'checkin': getRandomElement(CHECKIN_CHECKOUT_TIME),
      'checkout': getRandomElement(CHECKIN_CHECKOUT_TIME),
      'features': mixArray(FEATURES_POOL).slice(0, getRandomNumber(1, FEATURES_POOL.length)),
      'description': 'Описание предложения ' + getRandomNumber(1, 99),
      'photos': mixArray(getPhotosArray()).slice(0, getRandomNumber(1, PHOTO_COUNT))
    },

    'location': {
      'x': locationX,
      'y': locationY
    },

    'data': {
      'dataId': index
    }
  };
};

/**
 * Генерация массива данных
 * @return {Array} Массив сгенерированнных данных
 */
var generateOfferDataArray = function () {
  for (var i = 0; i < OFFERS_LIST_LENGTH; i++) {
    var offerDataElemenet = generateOfferData(i);
    offerDataArray.push(offerDataElemenet);
  }

  return offerDataArray;
};

/**
 * Генерация пина похожeго объявления
 * @param {Object} itemData - Данные объявления, которые передаются в пин
 * @return {HTMLElemet} Шаблон для генерации пина похожeго объявления
 */
var renderOffer = function (itemData) {
  var pinElement = offersTimplate.cloneNode(true);
  var pinElementImg = pinElement.querySelector('img');

  pinElement.style.left = itemData.location.x + 'px';
  pinElement.style.top = itemData.location.y + 'px';
  pinElementImg.src = itemData.author.avatar;
  pinElementImg.alt = itemData.offer.description;
  pinElement.setAttribute('data-id', itemData.data.dataId);

  return pinElement;
};

/**
 * Генерация модального окна с информацией об объявлении
 * @param {Object} itemData - Данные объявления, которые передаются в объявление
 */
var showModalOffer = function (itemData) {
  var popupOfferElement = offersPopupTimplate.cloneNode(true);
  var popupOfferTitle = popupOfferElement.querySelector('.popup__title');
  var popupOfferAddress = popupOfferElement.querySelector('.popup__text--address');
  var popupOfferPrice = popupOfferElement.querySelector('.popup__text--price');
  var popupOfferType = popupOfferElement.querySelector('.popup__type');
  var popupOfferCapacity = popupOfferElement.querySelector('.popup__text--capacity');
  var popupOfferTime = popupOfferElement.querySelector('.popup__text--time');
  var popupOfferFeatures = popupOfferElement.querySelector('.popup__features');
  var popupOfferDescription = popupOfferElement.querySelector('.popup__description');
  var popupOfferPhotos = popupOfferElement.querySelector('.popup__photos');
  var popupOfferPhotosElement = popupOfferPhotos.querySelector('.popup__photo');
  var popupOfferAvatar = popupOfferElement.querySelector('.popup__avatar');

  /**
   * @description Отображение доступных удобств в объявлении для попапа
   */
  var renderFeaturesInPopup = function () {
    popupOfferFeatures.innerHTML = '';
    for (var i = 0; i < itemData.offer.features.length; i++) {
      var createElement = document.createElement('li');
      createElement.classList.add('popup__feature');
      createElement.classList.add('popup__feature--' + itemData.offer.features[i]);
      popupOfferFeatures.appendChild(createElement);
    }
  };

  /**
   * @description Отображение фотографий в объявлении для попапа
   */
  var renderPhotosInPopup = function () {
    for (var j = 0; j < itemData.offer.photos.length; j++) {
      if (j === 0) {
        popupOfferPhotosElement.src = itemData.offer.photos[j];
      } else {
        var clonedPhotosElement = popupOfferPhotosElement.cloneNode(true);
        clonedPhotosElement.src = itemData.offer.photos[j];
        popupOfferPhotos.appendChild(clonedPhotosElement);
      }
    }
  };

  popupOfferTitle.textContent = itemData.offer.title;
  popupOfferAddress.textContent = itemData.offer.address;
  popupOfferPrice.textContent = itemData.offer.price + '₽/ночь';
  popupOfferType.textContent = ACCOMMODATION_TYPES_MAP[itemData.offer.type];
  popupOfferCapacity.textContent = itemData.offer.rooms + ' ' + connectNounAndNumral(itemData.offer.rooms, DICTIONARY_ROOMS) +
   ' для ' + itemData.offer.guests + ' ' + connectNounAndNumral(itemData.offer.guests, DICTIONARY_GUESTS);
  popupOfferTime.textContent = 'Заезд после ' + itemData.offer.checkin + ', выезд до ' + itemData.offer.checkout;
  renderFeaturesInPopup(itemData);
  popupOfferDescription.textContent = itemData.offer.description;
  renderPhotosInPopup(itemData);
  popupOfferAvatar.src = itemData.author.avatar;

  mapElement.appendChild(popupOfferElement);
  mapElement.insertBefore(popupOfferElement, mapFilters);
};

/**
 * Передача координат острого конца метки в поле адреса (форма создания объявления)
 * @param {Boolean} isStartingPosition - Находится ли объект на стратовой позиции (true/false)
 */
var setPinCoordinates = function (isStartingPosition) {
  var pinX = pinButton.style.left.slice(0, -2);
  var pinY = pinButton.style.top.slice(0, -2);
  pinX = Math.round(+pinX + ADJUSTMENT_X);

  if (isStartingPosition) {
    pinY = Math.round(+pinY + (ADJUSTMENT_MAIN_Y / 2));
  } else {
    pinY = Math.round(+pinY + ADJUSTMENT_Y);
  }

  var pinCoordinates = pinX + ', ' + pinY;

  adFormAdressInput.value = pinCoordinates;
};

/**
 * @description Показывает пин объявления на карте
 */
var showOffersPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offerDataArray.length; i++) {
    var offerData = offerDataArray[i];
    fragment.appendChild(renderOffer(offerData));
  }

  mapPinsContainer.appendChild(fragment);
};

/**
 * Проверка соответствия количества мест количеству комнату
 */
var checkRoomsAndCapacityValidity = function () {
  if (adFormRoomsInput.value === '100' && adFormCapacityInput.value !== '0') {
    adFormRoomsInput.setCustomValidity('Только не для гостей');
  } else if (adFormCapacityInput.value === '0' && adFormRoomsInput.value !== '100') {
    adFormCapacityInput.setCustomValidity('Для выбора данной опции необходимо 100 комнат');
  } else if (adFormRoomsInput.value < adFormCapacityInput.value && adFormCapacityInput.value !== 0) {
    adFormRoomsInput.setCustomValidity('Количество людей больше, чем мест. Выберете большее количество комнат');
    adFormCapacityInput.setCustomValidity('Количество людей больше, чем мест. Выберете большее количество комнат');
  } else {
    adFormRoomsInput.setCustomValidity('');
    adFormCapacityInput.setCustomValidity('');
  }
};

/**
 * Проверка соответствия заголовка требованиям
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
 * Проверка соответствия заголовка требованиям
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
  adFormPriceInput.min = ACCOMMODATION_TYPE_TO_PRICE_MAP[adFormAccommodationInput.value];
  adFormPriceInput.placeholder = ACCOMMODATION_TYPE_TO_PRICE_MAP[adFormAccommodationInput.value];
};

/**
 * Добавляет или убирает атрибут disabled всем элементам коллекции
 * @param {Array} collection - Коллекция элементов
 * @param {Boolean} needDeactivate - Автивируется или деактивируется элемент
 * (True - для деактивации и False - для активации)
 */
var toggleEnableElements = function (collection, needDeactivate) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].disabled = needDeactivate;
  }
};

/**
 * @description Неактивное состояние страницы, формы заблокированы
 */
var deactivatePage = function () {
  toggleEnableElements(mapFiltersFormSelects, true);
  toggleEnableElements(mapFiltersFormFieldsets, true);
  toggleEnableElements(adFormFieldsets, true);
  toggleEnableElements(adFormSelects, true);
};

/**
 * @description Активное состояние страницы, формы разблокированы,
 * на карте отражаются похожие объявления
 */
var activatePage = function () {
  adForm.classList.remove('ad-form--disabled');
  toggleEnableElements(mapFiltersFormSelects, false);
  toggleEnableElements(mapFiltersFormFieldsets, false);
  toggleEnableElements(adFormFieldsets, false);
  toggleEnableElements(adFormSelects, false);
  adFormAdressInput.classList.add('ad-form--disabled');

  setPinCoordinates(false);
  setOptionsForRooms();
  showDialog();
  showOffersPins();
  document.removeEventListener('DOMContentLoaded', deactivatePage);
};

/**
 * @description При загрузке страница находится в неактивном состоянии
 */
document.addEventListener('DOMContentLoaded', function () {
  deactivatePage();
  setPinCoordinates(true);
});

/**
 * @description При клике на пин страница переводится в активное состояние
 */
pinButton.addEventListener('mousedown', function () {
  activatePage();
});

/**
 * @description При нажании Enter с фокусом на пине страница переводится в активное состояние
 */
pinButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
  }
});

/**
 * @description При выборе количества комнат в форме создания объявления включается
 * проверка соответствия количества мест количеству комнату и отключаются лишние опции при выборе количества мест
 */
adFormRoomsInput.addEventListener('input', function () {
  checkRoomsAndCapacityValidity();
  setOptionsForRooms();
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
adFormPriceInput.addEventListener('input', function () {
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
  adFormTimeoutInput.value = adFormTimeinInput.value;
});

/**
 * @description При выборе времени заезда оно синхронезируется со времени отъезда
 */
adFormTimeinInput.addEventListener('change', function () {
  adFormTimeinInput.value = adFormTimeoutInput.value;
});

/**
 * Переключение отражения попапа (открытие или закрытие)
 * @param {evt} evt
 */
var togglePinPopup = function (evt) {
  var pinPopup = document.querySelector('.map__card');
  if (mapElement.contains(pinPopup)) {
    mapElement.removeChild(pinPopup);
  } else if (evt.target.closest('.map__pin:not(.map__pin--main)')) {
    var currentData = evt.target.closest('.map__pin:not(.map__pin--main)').dataset.id;
    showModalOffer(offerDataArray[currentData]);
  }
};

/**
 * @description Открытие попапа с информацией об объявлении при клике на пин (при помощи делегирования)
 */
mapPinsContainer.addEventListener('click', togglePinPopup);

/**
 * @description Открытие попапа с информацией об объявлении при нажатии Enter с фокусом на пине (при помощи делегирования)
 */
mapPinsContainer.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    togglePinPopup();
  }
});

/**
 * @description Зыкрытие попапа с информацией об объявлении при нажатии ECS
 */
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    togglePinPopup();
  }
});

/**
 * @description Зыкрытие попапа с информацией об объявлении при клике на крестик (при помощи делегирования)
 */
document.addEventListener('click', function (evt) {
  if (evt.target.matches('.popup__close')) {
    togglePinPopup();
  }
});

generateOfferDataArray();
