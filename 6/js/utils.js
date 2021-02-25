/**
 * Implementation from https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomNumber(0,7);

const isValidLength = function (text, maxLength = 140) {
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

export {getRandomNumber, getRandomArrayElement, removeChildren};
