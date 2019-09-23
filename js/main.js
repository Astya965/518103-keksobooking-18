'use strict';

// Генерация случайного числа от min до max включительно
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Перемешивание массива (на основе алгоритма Фишера-Йетса)
var mixArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var k = Math.floor(Math.random() * (i + 1));
    var swap = array[k];
    array[k] = array[i];
    array[i] = swap;
  }

  return array;
};

// Генерация случайных данных
var generateOffersList = function () {
  var offersList = [];

  var titles = [
    'Предложение 1',
    'Предложение 2',
    'Предложение 3',
    'Предложение 4',
    'Предложение 5',
    'Предложение 6',
    'Предложение 7',
    'Предложение 8'
  ];

  var types = ['palace', 'flat', 'house', 'bungalo'];
  var checkinsTime = ['12:00', '13:00', '14:00'];
  var checkoutsTime = ['12:00', '13:00', '14:00'];
  var featuresPool = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var descriptions = [
    'Описание предложения 1',
    'Описание предложения 2',
    'Описание предложения 3',
    'Описание предложения 4',
    'Описание предложения 5',
    'Описание предложения 6',
    'Описание предложения 7',
    'Описание предложения 8'
  ];

  var photosPool = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var offersListLength = 8;

  for (var j = 0; j < offersListLength; j++) {
    var imageCount = j + 1;
    var avatar = 'img/avatars/user0' + imageCount + '.png';
    var title = titles[getRandomNumber(0, titles.length)];
    var price = getRandomNumber(1000, 100000);
    var type = types[getRandomNumber(0, types.length)];
    var rooms = getRandomNumber(1, 8);
    var guests = getRandomNumber(1, 8);
    var checkin = checkinsTime[getRandomNumber(0, checkinsTime.length)];
    var checkout = checkoutsTime[getRandomNumber(0, checkoutsTime.length)];
    var features = mixArray(featuresPool).slice(0, getRandomNumber(1, featuresPool.length));
    var description = descriptions[getRandomNumber(0, descriptions.length)];
    var photos = mixArray(photosPool).slice(0, getRandomNumber(1, photosPool.length));
    var positionX = getRandomNumber(0, 1200);
    var positionY = getRandomNumber(130, 630);
    var address = positionX + ', ' + positionY;

    var offersItem = {
      'author': {
        'avatar': avatar
      },

      'offer': {
        'title': title,
        'address': address,
        'price': price,
        'type': type,
        'rooms': rooms,
        'guests': guests,
        'checkin': checkin,
        'checkout': checkout,
        'features': features,
        'description': description,
        'photos': photos
      },

      'location': {
        'x': positionX,
        'y': positionY
      }
    };

    offersList.push(offersItem);
  }

  return offersList;
};

// Показываем окно карты
var mapElement = document.querySelector('.map');
mapElement.classList.remove('map--faded');

// Генерация бъявления на основе шаблона
var renderOffer = function (item) {
  var offersTimplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = offersTimplate.cloneNode(true);

  pinElement.style.left = item.location.x - 25 + 'px';
  pinElement.style.top = item.location.y - 70 + 'px';

  var pinElementImg = pinElement.querySelector('img');
  pinElementImg.src = item.author.avatar;
  pinElementImg.alt = item.offer.description;

  return pinElement;
};

// Генерация массива объявлений
var renderOffersList = function (itemsArray) {
  var mapPinsContainer = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var l = 0; l < itemsArray.length; l++) {
    fragment.appendChild(renderOffer(itemsArray[l]));
  }

  mapPinsContainer.appendChild(fragment);
};

renderOffersList(generateOffersList());
