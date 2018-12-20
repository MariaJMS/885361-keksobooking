'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // загрузка аватара
  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');

  var onAvatarChange = function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  // загрузка фото жилья
  var imageChooser = document.querySelector('.ad-form__upload input[type=file]');
  var previewImage = document.querySelector('.ad-form__photo');
  var photoContainer = document.querySelector('.ad-form__photo-container');

  imageChooser.setAttribute('multiple', true);

  var makeImg = function (src) {
    var picture = previewImage.cloneNode(true);
    var image = document.createElement('img');
    picture.appendChild(image);
    image.src = src;
    image.width = 70;
    image.height = 70;

    return picture;
  };

  var onImagesUpload = function () {
    var files = Array.from(imageChooser.files);

    files.forEach(function (item) {
      var filesName = item.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return filesName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var images = makeImg(reader.result);
          photoContainer.appendChild(images);
          previewImage.remove('div:first-child');
        });

        reader.readAsDataURL(item);
      }
    });
  };

  avatarChooser.addEventListener('change', onAvatarChange);
  imageChooser.addEventListener('change', onImagesUpload);

})();
