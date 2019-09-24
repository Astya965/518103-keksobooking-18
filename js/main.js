'use strict';

var ACCOMMODATION_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES_POOL = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTO_POOL = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var ADJUSTMENT_X = 25;
var ADJUSTMENT_Y = 70;
var OFFERS_LIST_LENGTH = 8;
var mapElement = document.querySelector('.map');
var offersTimplate = document.querySelector('#pin').content.querySelector('.map__pin');

/**
 * @description Показывает карту
 */
var showDialog = function () {
  mapElement.classList.remove('map--faded');
};

/**
 * Выбор случайного числа в заданном промежутке
 * @param {number} min - Минимальное допустимое значение (включительно)
 * @param {number} max - Максимальное допустимое значение (включительно)
 * @return {number} Случайное целое число
 */
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Выбор случайного элемента массива
 * @param {array} array
 * @return {string|number|Object} Случайный элемент массива
 */
var getRandomElement = function (array) {
  var randonIndex = Math.floor(Math.random() * (array.length));
  return array[randonIndex];
};

/**
 * Перемешивание массива (на основе алгоритма Фишера-Йетса)
 * @param {array} array - Массив, который нужно перемешать
 * @return {array} Перемешенный массив
 *///
var mixArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var k = Math.floor(Math.random() * (i + 1));
    var swap = array[k];
    array[k] = array[i];
    array[i] = swap;
  }

  return array;
};

/**
 * Генерация данных объявления
 * @param {number} index - Передается индекс из цикла при генерации объявлений на карте (находится в showOffersPins())
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
      'photos': mixArray(PHOTO_POOL).slice(0, getRandomNumber(1, PHOTO_POOL.length))
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
 * @return {string} Шаблон для генерации пина объявления
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
 * @description Показывает пин объявления на карте
 */
var showOffersPins = function () {
  var mapPinsContainer = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < OFFERS_LIST_LENGTH; i++) {
    var offerData = generateOfferData(i);
    fragment.appendChild(renderOffer(offerData));
  }

  mapPinsContainer.appendChild(fragment);
};

showDialog();
showOffersPins();
