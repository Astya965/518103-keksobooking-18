'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  /**
   * Добавление картинки через input[type=file]
   * @param {HTMLElemet} fileChooser - Поле добавления картинки
   * @param {Boolean} isPreview - Создан ли уже элемент превью
   * @param {HTMLElemet} preview - Отображение картинки
   */
  var addPicture = function (fileChooser, isPreview, preview) {
    var file = fileChooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();

      /**
      * @description Поиск совпадения расширения файла со списком расширений
      */
      var matches = FILE_TYPES.some(function (extension) {
        return fileName.endsWith(extension);
      });

      if (matches) {
        var reader = new FileReader();

        /**
        * @description При окончании загрузки указать результат загрузки в путь файла
        */
        reader.addEventListener('load', function () {
          if (isPreview) {
            preview.src = reader.result;
          } else {
            var newPreview = document.createElement('img');
            newPreview.src = reader.result;
            newPreview.width = 70;
            newPreview.height = 70;
            newPreview.style = 'object-fit: cover; margin-bottom: 8px; margin-right: 10px;';
            newPreview.alt = 'Превью';
            preview.insertBefore(newPreview, preview.children[preview.children.length - 1]);
          }
        });

        reader.readAsDataURL(file);
      }
    }
  };

  var removePicture = function (imgContainer) {
    var pictures = imgContainer.querySelectorAll('img');
    pictures.forEach(function (picture) {
      imgContainer.removeChild(picture);
    });
  };

  window.fileInput = {
    addPicture: addPicture,
    removePicture: removePicture
  };

})();
