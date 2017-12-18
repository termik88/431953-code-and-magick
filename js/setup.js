'use strict';

(function () {
  var NUMBER_WIZARD = 4;

  /* Выбор случайного цвета */
  window.colorizeElement = function (element, colors, currColor, nameFunction) {
    var randomNonRepeatingColor = function (array, except) {
      var currentColor = except;
      var i = window.util.getRandomIndex(array);
      while (array[i] === currentColor) {
        i = window.util.getRandomIndex(array);
      }
      return array[i];
    };

    nameFunction(element, randomNonRepeatingColor(colors, currColor));
  };

  /* Конвертация в RGB в HEX */
  var componentFromStr = function (numStr, percent) {
    var num = Math.max(0, parseInt(numStr, 10));
    return percent ?
      Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
  };

  window.rgbToHex = function (rgb) {
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

  var renderWizard = function (wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var cloneWizard = function () {
    var similarListElement = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();
    var wizards = [];

    for (var i = 0; i < NUMBER_WIZARD; i++) {
      wizards[i] = {
        name: window.PARAMETERS_MAGES.NAMES[window.util.getRandomIndex(window.PARAMETERS_MAGES.NAMES)] + ' ' + window.PARAMETERS_MAGES.SURNAMES[window.util.getRandomIndex(window.PARAMETERS_MAGES.SURNAMES)],
        coatColor: window.PARAMETERS_MAGES.COAT_COLORS[window.util.getRandomIndex(window.PARAMETERS_MAGES.COAT_COLORS)],
        eyesColor: window.PARAMETERS_MAGES.EYES_COLORS[window.util.getRandomIndex(window.PARAMETERS_MAGES.EYES_COLORS)]
      };
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  cloneWizard();
})();
