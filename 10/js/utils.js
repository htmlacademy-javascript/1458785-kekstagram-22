/**
 * Implementation from https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */

const body = document.querySelector('body');
const ALERT_SHOW_TIME = 5000;

const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const isValidLength = function (text, maxLength) {
  return text.length <= maxLength;
}

const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
};

const getRandomUniqueArrayElements = (elements, maxCount) => {
  if (elements.length <= maxCount) {
    return elements.slice();
  }
  const result = new Set();
  while (result.size < maxCount) {
    result.add(getRandomArrayElement(elements));
  }
  return Array.from(result);
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

const asMessageBox = function (element, main) {
  const messageBox = { };
  messageBox.element = element;
  messageBox.main = main;
  messageBox.close = function(){
    element.remove();

    document.removeEventListener('keydown', messageBox.onKeyDown);

    if(messageBox.onClosed){
      messageBox.onClosed(messageBox);
    }
  };

  messageBox.onKeyDown = function (evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();

      messageBox.close();
    }
  };

  messageBox.show = function(){
    main.appendChild(messageBox.element);

    document.addEventListener('keydown', messageBox.onKeyDown);
  }

  return messageBox;
};

const showErrorMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {getRandomNumber, getRandomArrayElement, removeChildren, asModal, isValidLength, isEscEvent, showErrorMessage, asMessageBox, getRandomUniqueArrayElements};
