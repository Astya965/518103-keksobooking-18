'use strict';

(function () {

  var offersPopupTimplate = document.querySelector('#card').content;
  var mapFilters = document.querySelector('.map__filters-container');

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

    /**
     * @description Отображение доступных удобств в объявлении для попапа
     */
    var renderFeaturesInPopup = function () {
      popupOfferFeatures.innerHTML = '';
      itemData.offer.features.forEach(function (featureName) {
        var createElement = document.createElement('li');
        createElement.classList.add('popup__feature');
        createElement.classList.add('popup__feature--' + featureName);
        popupOfferFeatures.appendChild(createElement);
      });
    };

    /**
     * @description Отображение фотографий в объявлении для попапа
     */
    var renderPhotosInPopup = function () {
      itemData.offer.photos.forEach(function (photo) {
        var clonedPhotosElement = popupOfferPhotosElement.cloneNode(true);
        clonedPhotosElement.src = photo;
        popupOfferPhotos.appendChild(clonedPhotosElement);
      });
    };

    popupOfferTitle.textContent = itemData.offer.title;
    popupOfferAddress.textContent = itemData.offer.address;
    popupOfferPrice.textContent = itemData.offer.price + '₽/ночь';
    popupOfferType.textContent = window.data.Map.ACCOMMODATION_TYPES[itemData.offer.type];
    popupOfferCapacity.textContent = itemData.offer.rooms + ' ' + window.util.connectNounAndNumral(itemData.offer.rooms, window.data.Map.ROOMS) +
    ' для ' + itemData.offer.guests + ' ' + window.util.connectNounAndNumral(itemData.offer.guests, window.data.Map.GUESTS);
    popupOfferTime.textContent = 'Заезд после ' + itemData.offer.checkin + ', выезд до ' + itemData.offer.checkout;
    renderFeaturesInPopup(itemData);
    popupOfferDescription.textContent = itemData.offer.description;
    popupOfferPhotos.innerHTML = '';
    renderPhotosInPopup(itemData);
    popupOfferAvatar.src = itemData.author.avatar;

    window.util.Element.map.appendChild(popupOfferElement);
    window.util.Element.map.insertBefore(popupOfferElement, mapFilters);
  };

  /**
  * Открытие карточки
  * @param {Event} evt
  */
  var openCard = function (evt) {
    var currentPin = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (currentPin) {
      var params = currentPin.getAttribute('data-params');
      showModalOffer(JSON.parse(params));
    }
  };

  /**
  * @description Закртыие карточки
  */
  var closeCard = function () {
    var pinPopup = document.querySelector('.map__card');
    if (pinPopup) {
      window.util.Element.map.removeChild(pinPopup);
    }
  };

  /**
   * @description Открытие попапа с информацией об объявлении при клике на пин (при помощи делегирования)
   */
  window.util.Element.mapPinsContainer.addEventListener('click', function (evt) {
    closeCard();
    openCard(evt);
  });

  /**
   * @description Открытие попапа с информацией об объявлении при нажатии Enter с фокусом на пине (при помощи делегирования)
   */
  window.util.Element.mapPinsContainer.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.Keycode.ENTER) {
      openCard(evt);
    }
  });

  /**
   * @description Зыкрытие попапа с информацией об объявлении при нажатии ECS
   */
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.keycode.ESC) {
      closeCard();
    }
  });

  /**
   * @description Зыкрытие попапа с информацией об объявлении при клике на крестик (при помощи делегирования)
   */
  document.addEventListener('click', function (evt) {
    if (evt.target.matches('.popup__close')) {
      closeCard();
    }
  });

  window.card = {
    close: closeCard
  };

})();
