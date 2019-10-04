'use strict';

(function () {
  var offersTimplate = document.querySelector('#pin').content.querySelector('.map__pin');

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

    /**
    * Событие открытия окна объявления при клике или нажатие Enter на пин
    */
    pinElement.addEventListener('click', function () {
      var pinPopup = document.querySelector('.map__card');
      if (window.util.elems.mapElement.contains(pinPopup)) {
        window.util.elems.mapElement.removeChild(pinPopup);
      }
      window.card.showModalOffer(itemData);
    });

    return pinElement;
  };

  /**
   * @description При нажатии и удержании появляется возможность перемещать пин, если страница уже активна
   */
  window.util.elems.pinButton.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var MAP_MIN_X = window.data.const.MIN_X - window.data.const.ADJUSTMENT_X;
      var MAP_MAX_X = window.data.const.MAX_X - window.data.const.ADJUSTMENT_X;
      var MAP_MIN_Y = window.data.const.MIN_Y - window.data.const.ADJUSTMENT_Y;
      var MAP_MAX_Y = window.data.const.MAX_Y - window.data.const.ADJUSTMENT_Y;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var offsetCoords = {
        x: window.util.elems.pinButton.offsetLeft - shift.x,
        y: window.util.elems.pinButton.offsetTop - shift.y
      };

      if (offsetCoords.x < MAP_MIN_X) {
        offsetCoords.x = MAP_MIN_X;
      } else if (offsetCoords.x > MAP_MAX_X) {
        offsetCoords.x = MAP_MAX_X;
      } else if (offsetCoords.y < MAP_MIN_Y) {
        offsetCoords.y = MAP_MIN_Y;
      } else if (offsetCoords.y > MAP_MAX_Y) {
        offsetCoords.y = MAP_MAX_Y;
      }

      window.util.elems.pinButton.style.top = offsetCoords.y + 'px';
      window.util.elems.pinButton.style.left = offsetCoords.x + 'px';

      window.form.functions.setPinCoordinates(false);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.pin = {
    renderOffer: renderOffer
  };

})();
