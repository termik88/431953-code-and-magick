'use strict';

(function () {
  var NUMBER_WIZARD = 4;

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
