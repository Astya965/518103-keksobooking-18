'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var DATA_URL = URL + '/data';
  var STATUS_SUCCESS = 200;

  /**
   * Обращение к серверу и обработка возможных ошибок
   * @param {Function} onLoad - Вызов функции при успешном обращении к серверу
   * @return {Object} - XMLHttpRequest-объект
   */
  var initXHR = function (onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
        onLoad(xhr.response);
      } else {
        window.util.functions.onError();
      }
    });

    return xhr;
  };

  /**
   * Загрузка данных с сервера
   * @param {Function} onLoad - Вызов функции при успешном обращении к серверу
   */
  var load = function (onLoad) {
    var xhr = initXHR(onLoad);
    xhr.open('GET', DATA_URL);
    xhr.send();
  };

  /**
   * Передача данных серверу
   * @param {Object} data - Данные, которые передаются серверу
   * @param {Function} onLoad - Вызов функции при успешном обращении к серверу
   * @param {Function} onError - Вызов функции при ошибке
   */
  var save = function (data, onLoad) {
    var xhr = initXHR(onLoad);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
