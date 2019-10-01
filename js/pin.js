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
    pinElement.setAttribute('data-id', itemData.data.dataId);

    return pinElement;
  };

  window.pin = {
    renderOffer: renderOffer
  };

})();
