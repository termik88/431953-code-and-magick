'use strict';

var WIZARD_OPTION = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green']
};
var NUMBER_WIZARD = 4;

var showSetup = function () {
  var userDialog = document.querySelector('.setup');

  userDialog.classList.remove('hidden');
  document.querySelector('.setup-similar').classList.remove('hidden');
};

var randomIndex = function (array) {
  return Math.round(Math.random() * (array.length - 1));
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
  var fragment = document.createDocumentFragment(); /* Группировка Для одной перерисовки */
  var wizards = [];

  for (var i = 0; i < NUMBER_WIZARD; i++) {
    wizards[i] = {
      name: WIZARD_OPTION.NAMES[randomIndex(WIZARD_OPTION.NAMES)] + ' ' + WIZARD_OPTION.SURNAMES[randomIndex(WIZARD_OPTION.SURNAMES)],
      coatColor: WIZARD_OPTION.COAT_COLORS[randomIndex(WIZARD_OPTION.COAT_COLORS)],
      eyesColor: WIZARD_OPTION.EYES_COLORS[randomIndex(WIZARD_OPTION.EYES_COLORS)]
    };
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

cloneWizard();

var buttonShowSetup = document.querySelector('.setup-open');
buttonShowSetup.addEventListener('click', showSetup);

var buttonCloseSetup = document.querySelector('.setup_close');
/* buttonCloseSetup.removeEventListener('click', showSetup); */

