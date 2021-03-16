import {asMessageBox} from './utils.js';

const main = document.querySelector('main');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const show = function(element, button){
  const messageBox = asMessageBox(element, main);
  const close = function() {
    messageBox.close();
  };

  element.addEventListener('click', close);
  button.addEventListener('click', close);

  messageBox.show();
}

const showSuccess = function () {
  const success = successTemplate.cloneNode(true);
  const successButton = success.querySelector('.success__button');

  show(success, successButton);
};

const showError = function () {
  const error = errorTemplate.cloneNode(true);
  const errorButton = error.querySelector('.error__button');

  show(error, errorButton);
};

export {showSuccess, showError};
