import {asModal, isValidLength, isEscEvent} from './utils.js';
import '../nouislider/nouislider.js';

const noUiSlider = window.noUiSlider;

const uploadPictureModal = document.querySelector('.img-upload__overlay');
const uploadPicture = document.querySelector('#upload-file');
const uploadCancel = uploadPictureModal.querySelector('#upload-cancel');

// Переменные для масштабирования
const scaleDefaultValue = 100;
const scaleSmaller = uploadPictureModal.querySelector('.scale__control--smaller');
const scaleBigger = uploadPictureModal.querySelector('.scale__control--bigger');
const scaleValue = uploadPictureModal.querySelector('.scale__control--value');
const scalePhotoContainer = document.querySelector('.img-upload__preview');
const scalePhoto = scalePhotoContainer.querySelector('img');
const scaleMinValue = 25;
const scaleMaxValue = 100;
const scaleStepValue = 25;
const effectDefault = 'effects__preview--none';

// Переменные для наложения эффектов
const effects = {
  chrome: {
    getSliderOptions: function() {
      return {
        min: 0,
        max: 1,
        initial: 1,
        step: 0.1,
      };
    },
    set: function(element, value){
      element.style.filter = 'grayscale(' + value + ')';
    },
  },
  sepia: {
    getSliderOptions: function() {
      return {
        min: 0,
        max: 1,
        initial: 1,
        step: 0.1,
      };
    },
    set: function(element, value){
      element.style.filter = 'sepia(' + value + ')';
    },
  },
  marvin: {
    getSliderOptions: function() {
      return {
        min: 0,
        max: 100,
        initial: 100,
        step: 1,
      };
    },
    set: function(element, value){
      element.style.filter = 'invert(' + value + '%)';
    },
  },
  phobos: {
    getSliderOptions: function() {
      return {
        min: 0,
        max: 3,
        initial: 3,
        step: 0.1,
      };
    },
    set: function(element, value){
      element.style.filter = 'blur(' + value + 'px)';
    },
  },
  heat: {
    getSliderOptions: function() {
      return {
        min: 1,
        max: 3,
        initial: 3,
        step: 0.1,
      };
    },
    set: function(element, value){
      element.style.filter = 'brightness(' + value + ')';
    },
  },
  getByClass: function(effectClass){
    switch (effectClass) {
      case 'effects__preview--chrome':
        return this.chrome;
      case 'effects__preview--sepia':
        return this.sepia;
      case 'effects__preview--marvin':
        return this.marvin;
      case 'effects__preview--phobos':
        return this.phobos;
      case 'effects__preview--heat':
        return this.heat;
      default:
        return undefined;
    }
  },
};
const effectsList = document.querySelector('.img-upload__effects');
const effectRadioButtons = document.querySelectorAll('.effects__radio');
const effectsClasses = document.querySelectorAll('.effects__preview');
const effectsSliderContainer = document.querySelector('.img-upload__effect-level');
const effectsSlider = effectsSliderContainer.querySelector('.effect-level__slider');
const effectsSliderValue = effectsSliderContainer.querySelector('.effect-level__value');

//Переменные валидации формы
const uploadFormText = document.querySelector('.img-upload__text');
const hashtagInput = uploadFormText.querySelector('.text__hashtags');
const descriptionInput = uploadFormText.querySelector('.text__description');
const MAX_DESCRIPTION_LENGTH = 140;
const MIN_HASHTAG_LENGTH = 1;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;
const letters = /^[0-9a-zA-Zа-яА-Я]+$/;

const setScale = function(scale){
  scaleValue.value = scale + '%';
  scalePhoto.style.transform = 'scale(' + (scale / 100) + ')';
}

uploadPicture.addEventListener('change', function() {
  setScale(scaleDefaultValue);
  const modal = asModal(uploadPictureModal);
  const onUploadCancelClicked = function(){
    modal.close();
  };

  modal.onClosed = function(){
    uploadPicture.value = '';
    uploadCancel.removeEventListener('click', onUploadCancelClicked);
  };

  uploadCancel.addEventListener('click', onUploadCancelClicked);
  setEffect(effectDefault);
  modal.open();
});

// ------------------Масштабирование----------------------------

scaleSmaller.addEventListener('click', function() {
  let scale = parseInt(scaleValue.value);
  scale = scale - scaleStepValue;

  if (scale < scaleMinValue) {
    scale = scaleMinValue;
  }

  setScale(scale);
});

scaleBigger.addEventListener('click', function() {
  let scale = parseInt(scaleValue.value);
  scale = scale + scaleStepValue;

  if(scale > scaleMaxValue) {
    scale = scaleMaxValue;
  }

  setScale(scale);
});

// ------------------Наложение эффектов----------------------------

const setEffect = function(effectClass) {
  scalePhoto.className = '';
  scalePhoto.style.filter = '';
  scalePhoto.classList.add(effectClass);

  const effect = effects.getByClass(effectClass);
  if (effect) {
    const sliderOptions = effect.getSliderOptions();
    effect.set(scalePhoto, sliderOptions.initial);

    effectsSlider.noUiSlider.updateOptions({
      range:{
        min: sliderOptions.min,
        max: sliderOptions.max,
      },
      start: sliderOptions.initial,
      step: sliderOptions.step,
    });

    effectsSliderContainer.classList.remove('hidden');
  }
  else {
    effectsSliderContainer.classList.add('hidden');
  }
};

const setSlider = function() {
  noUiSlider.create(effectsSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });

  effectsSlider.noUiSlider.on('update', (values, handle) => {
    const value = values[handle];
    effectsSliderValue.value = value;
    const effect = effects.getByClass(scalePhoto.className);
    if (effect) {
      effect.set(scalePhoto, value);
    }
  });
};

effectsList.addEventListener('change', function() {
  for (let i = 0; i < effectRadioButtons.length; i++) {
    if (effectRadioButtons[i].checked) {
      const effect = effectsClasses[i].classList[1];
      setEffect(effect);
    }
  }
});

setSlider();

// ------------------Валидация формы----------------------------

hashtagInput.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});

const validateHashtag = function (hashtag) {
  if (hashtag[0] !== '#') {
    return 'Хэш-тег должен начинаться с #';
  }

  if (hashtag.length === MIN_HASHTAG_LENGTH) {
    return 'Хэш-тег не может состоять только из одной #';
  }

  if (hashtag.length > MAX_HASHTAG_LENGTH) {
    return 'Максимальная длина одного хэш-тега 20 символов, включая #';
  }

  if (!hashtag.substring(1).match(letters)) {
    return 'Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.';
  }

  return null;
};

const validateHashtags = function (hashtags) {

  if (hashtags.length !== [...new Set(hashtags)].length) {
    return 'Oдин и тот же хэш-тег не может быть использован дважды';
  }

  if (hashtags.length > MAX_HASHTAG_COUNT) {
    return 'Нельзя указать больше пяти хэш-тегов';
  }

  for (let hashtag of hashtags) {
    const errorMessage = validateHashtag(hashtag);
    if (errorMessage !== null) {
      return errorMessage;
    }
  }

  return null;
};

hashtagInput.addEventListener('input', () => {
  const hashtagText = hashtagInput.value;
  const hashtags = hashtagText.split(' ').map(p => p.toLowerCase());

  const errorMessage = validateHashtags(hashtags);

  if (errorMessage !== null) {
    hashtagInput.setCustomValidity(errorMessage);
  } else {
    hashtagInput.setCustomValidity('');
  }

  hashtagInput.reportValidity();

});

descriptionInput.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});

descriptionInput.addEventListener('input', () => {
  const descriptionLength = descriptionInput.value.length;

  if (isValidLength(descriptionLength, MAX_DESCRIPTION_LENGTH)) {
    descriptionInput.setCustomValidity('Использовано ' + descriptionLength +' симв. из ' + MAX_DESCRIPTION_LENGTH);
  } else if (descriptionLength  > MAX_DESCRIPTION_LENGTH) {
    descriptionInput.setCustomValidity('Удалите лишние ' + (descriptionLength - MAX_DESCRIPTION_LENGTH) +' симв.');
  } else {
    descriptionInput.setCustomValidity('');
  }
  descriptionInput.reportValidity();
});







