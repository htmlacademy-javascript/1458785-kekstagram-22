/**
 * Implementation from https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */

const body = document.querySelector('body');

const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomNumber(0,7);

const isValidLength = function (text, maxLength) {
  return text.length <= maxLength;
}

isValidLength('Hello world');

const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
};

const removeChildren = function (parent) {
  for (let i = parent.children.length - 1; i >= 0; i--) {
    const child = parent.children[i];
    child.parentElement.removeChild(child);
  }
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const asModal = function (element) {
  const modal = { };
  modal.element = element;
  modal.close = function(){
    modal.element.classList.add('hidden');
    body.classList.remove('modal-open');

    document.removeEventListener('keydown', modal.onKeyDown);

    if(modal.onClosed){
      modal.onClosed(modal);
    }
  };

  modal.onKeyDown = function (evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();

      modal.close();
    }
  };

  modal.open = function(){
    modal.element.classList.remove('hidden');
    body.classList.add('modal-open');

    document.addEventListener('keydown', modal.onKeyDown);
  }

  return modal;
};

export {getRandomNumber, getRandomArrayElement, removeChildren, asModal, isValidLength, isEscEvent};
