'use strict';

(function () {
  var StartCoordinate = {
    X: 570,
    Y: 375
  };
  var Map = {
    MIN_X: 0,
    MAX_X: 1200,
    MIN_Y: 130,
    MAX_Y: 630
  };
  var Pin = {
    WIDTH: 65,
    HEIGTH: 65,
    TAIL_HEIGHT: 16
  };
  var Adjustment = {
    X: Pin.WIDTH / 2,
    Y: Pin.HEIGTH + Pin.TAIL_HEIGHT
  };
  var Price = {
    Type: {
      LOW: 'low',
      MIDDLE: 'middle',
      HIGH: 'high'
    },
    Value: {
      MIN: 10000,
      MAX: 50000
    }
  };
  var ACCOMMODATION_TYPES_MAP = {
    'any': 'Любой тип жилья',
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  var ROOMS_MAP = {
    'one': 'комната',
    'few': 'комнаты',
    'other': 'комнат'
  };
  var GUESTS_MAP = {
    'one': 'гостя',
    'few': 'гостей',
    'other': 'гостей'
  };
  var ACCOMMODATION_TYPE_TO_PRICE_MAP = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  window.data = {
    Map: {
      ACCOMMODATION_TYPES: ACCOMMODATION_TYPES_MAP,
      ROOMS: ROOMS_MAP,
      GUESTS: GUESTS_MAP,
      ACCOMMODATION_TYPE_TO_PRICE: ACCOMMODATION_TYPE_TO_PRICE_MAP
    },

    const: {
      StartCoordinate: StartCoordinate,
      Price: Price,
      PIN_HEIGTH: Pin.HEIGTH,
      ADJUSTMENT_MAIN_X: Adjustment.X,
      ADJUSTMENT_MAIN_Y: Adjustment.Y,
      MIN_X: Map.MIN_X,
      MAX_X: Map.MAX_X,
      MIN_Y: Map.MIN_Y,
      MAX_Y: Map.MAX_Y,
    }
  };

})();
