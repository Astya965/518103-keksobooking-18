'use strict';

var ACCOMMODATION_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ACCOMMODATION_TYPES_MAP = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};
var CHECKIN_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES_POOL = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTO_COUNT = 3;
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var ADJUSTMENT_X = 25;
var ADJUSTMENT_Y = 70;
var OFFERS_LIST_LENGTH = 8;
var DICTIONARY_ROOMS = ['комната', 'комнаты', 'комнат'];
var DICTIONARY_GUESTS = ['гостя', 'гостей', 'гостей'];
var mapElement = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters-container');
var offersTimplate = document.querySelector('#pin').content.querySelector('.map__pin');
var offersPopupTimplate = document.querySelector('#card').content;

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
 * @param {Array} dictionaryArray - массив с возможными вариантами существительных
 * @return {string} Подходящее существительное (элемент массива)
 */
var connectNounAndNumral = function (number, dictionaryArray) {
  number = Math.abs(number) % 100;
  var number1 = number % 10;
  if (number > 10 && number < 20) {
    return dictionaryArray[2];
  }
  if (number1 > 1 && number1 < 5) {
    return dictionaryArray[1];
  }
  if (number1 === 1) {
    return dictionaryArray[0];
  }
  return dictionaryArray[2];
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
      'address': locationX + ', ' + locationY,
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
    }
  };
};

/**
 * Генерация пина объявления
 * @param {Object} itemData - Данные объявления, которые передаются в пин
 * @return {HTMLElemet} Шаблон для генерации пина объявления
 */
var renderOffer = function (itemData) {
  var pinElement = offersTimplate.cloneNode(true);
  var pinElementImg = pinElement.querySelector('img');

  pinElement.style.left = itemData.location.x - ADJUSTMENT_X + 'px';
  pinElement.style.top = itemData.location.y - ADJUSTMENT_Y + 'px';
  pinElementImg.src = itemData.author.avatar;
  pinElementImg.alt = itemData.offer.description;

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

  popupOfferTitle.textContent = itemData.offer.title;
  popupOfferAddress.textContent = itemData.offer.address;
  popupOfferPrice.textContent = itemData.offer.price + '₽/ночь';
  popupOfferType.textContent = ACCOMMODATION_TYPES_MAP[itemData.offer.type];
  popupOfferCapacity.textContent = itemData.offer.rooms + ' ' + connectNounAndNumral(itemData.offer.rooms, DICTIONARY_ROOMS) +
   ' для ' + itemData.offer.guests + ' ' + connectNounAndNumral(itemData.offer.guests, DICTIONARY_GUESTS);
  popupOfferTime.textContent = 'Заезд после ' + itemData.offer.checkin + ', выезд до ' + itemData.offer.checkout;
  popupOfferFeatures.innerHTML = '';
  for (var i = 0; i < itemData.offer.features.length; i++) {
    var createElement = document.createElement('li');
    createElement.classList.add('popup__feature');
    createElement.classList.add('popup__feature--' + itemData.offer.features[i]);
    popupOfferFeatures.appendChild(createElement);
  }
  popupOfferDescription.textContent = itemData.offer.description;
  for (var j = 0; j < itemData.offer.photos.length; j++) {
    if (j === 0) {
      popupOfferPhotosElement.src = itemData.offer.photos[j];
    } else {
      var clonedPhotosElement = popupOfferPhotosElement.cloneNode(true);
      clonedPhotosElement.src = itemData.offer.photos[j];
      popupOfferPhotos.appendChild(clonedPhotosElement);
    }
  }
  popupOfferAvatar.src = itemData.author.avatar;

  mapElement.insertBefore(popupOfferElement, mapFilters);
};

/**
 * @description Показывает пин объявления на карте
 */
var showOffersPins = function () {
  var mapPinsContainer = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < OFFERS_LIST_LENGTH; i++) {
    var offerData = generateOfferData(i);
    fragment.appendChild(renderOffer(offerData));

    if (i === 0) {
      showModalOffer(generateOfferData(i));
    }
  }

  mapPinsContainer.appendChild(fragment);
};

showDialog();
showOffersPins();
