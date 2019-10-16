'use strict';

(function () {

  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };

  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapFilter = document.querySelector('.map__filters');
  var mapPinsContainer = document.querySelector('.map__pins');
  var pinButton = map.querySelector('.map__pin--main');

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  /**
   * Добавляет или убирает атрибут disabled всем элементам коллекции
   * @param {Array} collection - Коллекция элементов
   * @param {Boolean} needDeactivate - Автивируется или деактивируется элемент
   * (True - для деактивации и False - для активации)
   */
  var toggleEnableElements = function (collection, needDeactivate) {
    collection.forEach(function (item) {
      item.disabled = needDeactivate;
    });
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
   * @param {HTMLElement} template - Template, на сонове гторого генерируется ошибка
   * @param {String} noticeMessage - Сообщение уведомления (необязательное значение)
   */
  var onNotice = function (template, noticeMessage) {
    var noticeElement = template.cloneNode(true);
    var noticeMessageArea = noticeElement.querySelector('p');

    var onEscPress = function (evt) {
      if ((evt.keyCode === KeyCode.ESC) && (main.contains(noticeElement))) {
        window.form.deactivateForm();
        main.removeChild(noticeElement);
      }
      document.removeEventListener('keydown', onEscPress);
    };
    document.addEventListener('keydown', onEscPress);

    noticeElement.addEventListener('click', function (evt) {
      if ((evt.target !== noticeMessageArea) && (main.contains(noticeElement))) {
        window.form.deactivateForm();
        main.removeChild(noticeElement);
        document.removeEventListener('keydown', onEscPress);
      }
    });

    if (template === errorTemplate) {
      var errorMessage = noticeElement.querySelector('.error__message');
      var errorButton = noticeElement.querySelector('.error__button');

      errorMessage.textContent = noticeMessage;

      errorButton.addEventListener('click', function () {
        window.form.deactivateForm();
        main.removeChild(noticeElement);
        document.removeEventListener('keydown', onEscPress);
      });
    }

    if (!main.contains(noticeElement)) {
      main.appendChild(noticeElement);
    }
  };

  /**
   * Создание уведомления об ошибке
   * @param {String} errorMessage - Сообщение ошибки
   */
  var onError = function (errorMessage) {
    onNotice(errorTemplate, errorMessage);
  };

  /**
   * Создание уведомления об успешном выполнении функции
   */
  var onSuccess = function () {
    onNotice(successTemplate);
  };

  window.util = {
    Keycode: {
      ESC: KeyCode.ESC,
      ENTER: KeyCode.ENTER
    },

    Element: {
      map: map,
      adForm: adForm,
      mapFilter: mapFilter,
      mapPinsContainer: mapPinsContainer,
      pinButton: pinButton
    },

    toggleEnableElements: toggleEnableElements,
    connectNounAndNumral: connectNounAndNumral,
    onError: onError,
    onSuccess: onSuccess
  };

})();
