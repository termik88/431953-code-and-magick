'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');
  var setupWizard = setup.querySelector('.setup-wizard');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireballWrap = setup.querySelector('.setup-fireball-wrap');

  /* Проверка на повтор цвета */
  var randomNonRepeatingColor = function (array, except) {
    var currentColor = except;
    var i = window.util.getRandomIndex(array);
    while (array[i] === currentColor) {
      i = window.util.getRandomIndex(array);
    }
    return array[i];
  };

  var componentFromStr = function (numStr, percent) {
    var num = Math.max(0, parseInt(numStr, 10));
    return percent ?
      Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
  };

  var rgbToHex = function (rgb) {
    var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
    var result;
    var r;
    var g;
    var b;
    var hex = '';
    if ((result = rgbRegex.exec(rgb))) {
      r = componentFromStr(result[1], result[2]);
      g = componentFromStr(result[3], result[4]);
      b = componentFromStr(result[5], result[6]);

      hex = '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    return hex;
  };

  /* Открытие/закрытие окна настроек чара */
  var onPopupEscPress = function (evt) {
    if (!evt.target.classList.contains('setup-user-name')) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    document.querySelector('.setup-similar').classList.remove('hidden');
    setup.removeAttribute('style'); /* Обнуление локации окна */
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setup.removeAttribute('style'); /* Обнуление локации окна */
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  /* Валидация окна настроек*/
  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-ч символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  userNameInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-ч символов');
    } else {
      target.setCustomValidity('');
    }
  });

  /* Редактирование персонажа */
  setupWizardCoat.addEventListener('click', function () {
    setupWizardCoat.style.fill = randomNonRepeatingColor(window.PARAMETERS_MAGES.COAT_COLORS, setupWizardCoat.style.fill);
  });

  setupWizardEyes.addEventListener('click', function () {
    setupWizardEyes.style.fill = randomNonRepeatingColor(window.PARAMETERS_MAGES.EYES_COLORS, setupWizardEyes.style.fill);
  });

  setupFireballWrap.addEventListener('click', function () {
    setupFireballWrap.style.background = randomNonRepeatingColor(window.PARAMETERS_MAGES.FIREBALL_COLORS, rgbToHex(setupFireballWrap.style.background));
  });

  /* Перетаскивание */
  var dialogHandle = setup.querySelector('.setup-user-pic');

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      if (moveEvt.clientY >= 0) {
        if (moveEvt.clientX >= 0) {
          var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          setup.style.top = (setup.offsetTop - shift.y) + 'px';
          setup.style.left = (setup.offsetLeft - shift.x) + 'px';
        }
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  /* Перетаскивание звездочки */
  var shopElement = setup.querySelector('.setup-artifacts-shop');
  var artifactsElement = setup.querySelector('.setup-artifacts');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setDate('text/plain', evt.target.alt);
    }
  });

  shopElement.addEventListener('drag', function (evt) {
    artifactsElement.style.outline = '2px dashed red';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    artifactsElement.style.outline = '';
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    artifactsElement.style.outline = '2px dashed red';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragend', function (evt) {
    artifactsElement.style.outline = '';
    evt.preventDefault();
  });

})();
