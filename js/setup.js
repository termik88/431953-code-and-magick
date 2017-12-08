'use strict';

var WIZARD_OPTION = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};
/* var NUMBER_WIZARD = 4; */
var KEY_CODE = {
  ESC: 27,
  ENTER: 13
};

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var userNameInput = setup.querySelector('.setup-user-name');

var setupWizard = setup.querySelector('.setup-wizard');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireballWrap = setup.querySelector('.setup-fireball-wrap');

/*
var showSetup = function () {
  var userDialog = document.querySelector('.setup');

  userDialog.classList.remove('hidden');
  document.querySelector('.setup-similar').classList.remove('hidden');
};*/

var randomIndex = function (array) {
  return Math.round(Math.random() * (array.length - 0.5));
};

/* Проверка на повтор цвета */
var randomNonRepeatingColor = function (array, except) {
  var currentColor = except;
  var i = randomIndex(array);
  while (array[i] === currentColor) {
    i = randomIndex(array);
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
/*
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
      name: WIZARD_OPTION.NAMES[randomIndex(WIZARD_OPTION.NAMES)] + ' ' + WIZARD_OPTION.SURNAMES[randomIndex(WIZARD_OPTION.SURNAMES)],
      coatColor: WIZARD_OPTION.COAT_COLORS[randomIndex(WIZARD_OPTION.COAT_COLORS)],
      eyesColor: WIZARD_OPTION.EYES_COLORS[randomIndex(WIZARD_OPTION.EYES_COLORS)]
    };
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

cloneWizard();
*/

/* Открытие/закрытие окна настроек чара */
var onPopupEscPress = function (evt) {
  if (evt.keyCode === KEY_CODE.ESC && !evt.target.classList.contains('setup-user-name')) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE.ENTER) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE.ENTER) {
    closePopup();
  }
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
  setupWizardCoat.style.fill = randomNonRepeatingColor(WIZARD_OPTION.COAT_COLORS, setupWizardCoat.style.fill);
});

setupWizardEyes.addEventListener('click', function () {
  setupWizardEyes.style.fill = randomNonRepeatingColor(WIZARD_OPTION.EYES_COLORS, setupWizardEyes.style.fill);
});

setupFireballWrap.addEventListener('click', function () {
  setupFireballWrap.style.background = randomNonRepeatingColor(WIZARD_OPTION.FIREBALL_COLORS, rgbToHex(setupFireballWrap.style.background));
});
