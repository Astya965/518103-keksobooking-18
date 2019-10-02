'use strict';

(function () {

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
  var ADJUSTMENT_X = 50 / 2;
  var ADJUSTMENT_Y = 70;
  var ADJUSTMENT_MAIN_X = 65 / 2;
  var ADJUSTMENT_MAIN_IMG_Y = 65;
  var ADJUSTMENT_MAIN_TAIL_Y = 22 - 6;
  var ADJUSTMENT_MAIN_Y = ADJUSTMENT_MAIN_IMG_Y + ADJUSTMENT_MAIN_TAIL_Y;
  var OFFERS_LIST_LENGTH = 8;
  var DICTIONARY_ROOMS = {
    'one': 'комната',
    'few': 'комнаты',
    'other': 'комнат'};
  var DICTIONARY_GUESTS = {
    'one': 'гостя',
    'few': 'гостей',
    'other': 'гостей'};
  var ACCOMMODATION_TYPE_TO_PRICE_MAP = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
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
    var locationX = window.util.functions.getRandomNumber(MIN_X, MAX_X);
    var locationY = window.util.functions.getRandomNumber(MIN_Y, MAX_Y);

    return {
      'author': {
        'avatar': 'img/avatars/user0' + (index + 1) + '.png'
      },

      'offer': {
        'title': 'Предложение ' + window.util.functions.getRandomNumber(1, 99),
        'address': (locationX + Math.round(ADJUSTMENT_X)) + ', ' + (locationY + ADJUSTMENT_Y),
        'price': window.util.functions.getRandomNumber(1000, 100000),
        'type': window.util.functions.getRandomElement(ACCOMMODATION_TYPES),
        'rooms': window.util.functions.getRandomNumber(1, 8),
        'guests': window.util.functions.getRandomNumber(1, 8),
        'checkin': window.util.functions.getRandomElement(CHECKIN_CHECKOUT_TIME),
        'checkout': window.util.functions.getRandomElement(CHECKIN_CHECKOUT_TIME),
        'features': window.util.functions.mixArray(FEATURES_POOL).slice(0, window.util.functions.getRandomNumber(1, FEATURES_POOL.length)),
        'description': 'Описание предложения ' + window.util.functions.getRandomNumber(1, 99),
        'photos': window.util.functions.mixArray(getPhotosArray()).slice(0, window.util.functions.getRandomNumber(1, PHOTO_COUNT))
      },

      'location': {
        'x': locationX,
        'y': locationY
      },

      'data': {
        'dataId': 'offerDataId' + (index + 1)
      }
    };
  };

  /**
   * Генерация массива данных
   * @return {Array}
   */
  var generateOfferDataArray = function () {
    var someArray = [];
    for (var i = 0; i < OFFERS_LIST_LENGTH; i++) {
      var offerDataElemenet = generateOfferData(i);
      someArray.push(offerDataElemenet);
    }
    return someArray;
  };
  var offerDataArray = generateOfferDataArray();

  window.data = {
    maps: {
      ACCOMMODATION_TYPES_MAP: ACCOMMODATION_TYPES_MAP,
      DICTIONARY_ROOMS: DICTIONARY_ROOMS,
      DICTIONARY_GUESTS: DICTIONARY_GUESTS,
      ACCOMMODATION_TYPE_TO_PRICE_MAP: ACCOMMODATION_TYPE_TO_PRICE_MAP
    },

    const: {
      ADJUSTMENT_MAIN_X: ADJUSTMENT_MAIN_X,
      ADJUSTMENT_MAIN_IMG_Y: ADJUSTMENT_MAIN_IMG_Y,
      ADJUSTMENT_MAIN_Y: ADJUSTMENT_MAIN_Y,
      MIN_X: MIN_X,
      MAX_X: MAX_X,
      MIN_Y: MIN_Y,
      MAX_Y: MAX_Y
    },

    offerDataArray: offerDataArray
  };

})();
