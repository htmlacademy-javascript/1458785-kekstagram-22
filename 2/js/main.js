/**
 * Implementation from https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomNumber(0,7);


const hasValidLength = function (text, maxLength = 140) {
  return text.length <= maxLength;
}

hasValidLength('Hello world');
