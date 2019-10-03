'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var mapElement = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPinsContainer = document.querySelector('.map__pins');
  var pinButton = mapElement.querySelector('.map__pin--main');

  var errorTemplate = document.querySelector('#error').content;
  var successTemplate = document.querySelector('#success').content;

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
   * Функция создания уведомления
   * @param {String} template - Текст уведомления
   */
  var onNotice = function (template) {
    var noticeTimplate = template.cloneNode(true);
    document.body.appendChild(noticeTimplate);
  };

  /**
   * Создание уведомления об ошибке
   */
  var onError = function () {
    onNotice(errorTemplate);
  };

  /**
   * Создание уведомления об успешном выполнении функции
   */
  var onSuccess = function () {
    onNotice(successTemplate);
  };

  window.util = {
    keycode: {
      ESC_KEYCODE: ESC_KEYCODE
    },

    functions: {
      getRandomNumber: getRandomNumber,
      getRandomElement: getRandomElement,
      mixArray: mixArray,
      toggleEnableElements: toggleEnableElements,
      connectNounAndNumral: connectNounAndNumral,
      onError: onError,
      onSuccess: onSuccess
    },

    elems: {
      mapElement: mapElement,
      adForm: adForm,
      mapPinsContainer: mapPinsContainer,
      pinButton: pinButton
    }
  };

})();
