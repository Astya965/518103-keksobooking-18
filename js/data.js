'use strict';

(function () {

  var ACCOMMODATION_TYPES_MAP = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  var MIN_X = 0;
  var MAX_X = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var ADJUSTMENT_MAIN_X = 65 / 2;
  var ADJUSTMENT_MAIN_IMG_Y = 65;
  var ADJUSTMENT_MAIN_TAIL_Y = 16;
  var ADJUSTMENT_MAIN_Y = ADJUSTMENT_MAIN_IMG_Y + ADJUSTMENT_MAIN_TAIL_Y;
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
    }
  };

})();
