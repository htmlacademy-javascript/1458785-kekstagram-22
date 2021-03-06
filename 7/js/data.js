import {getRandomNumber, getRandomArrayElement} from './utils.js';

const names = [
  'Иван',
  'Марья',
  'Daniel',
  'Петр',
  'Eva',
  'Darkmate',
  'Люсьен',
  'Петра',
];

const descriptions = [
  'Нереально, но факт!',
  'Всякое бывает...',
  'Просто бомбически!',
  'Флексим',
  'Вот бы сейчас...',
  'Просто Я',
  'Я здесь был',
  'Праздник в разгаре!',
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// --------- Генерируем фотографии ---------

let photoId = 0;
let commentIds = [];

const getPhotos = () => {
  let photos = new Array(25);
  for (let i = 0; i < photos.length; i++) {
    photoId = i + 1;
    photos[i] = {
      id: photoId,
      url: 'photos/' + photoId + '.jpg',
      description: getRandomArrayElement(descriptions),
      likes: getRandomNumber(15, 200),
      comments: getComments(),
    }
  }
  return photos;
};

const getComments = () => {
  let comments = new Array(getRandomNumber(1, 5));
  for (let i = 0; i < comments.length; i++) {
    comments[i] = {
      id: getCommentId(),
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: getCommentMessage(),
      name: getRandomArrayElement(names),
    }
  }
  return comments;
};

const getCommentId = () => {
  let commentId = getRandomNumber(1, 500);
  while (commentIds.includes(commentId)) {
    commentId = getRandomNumber(1, 500);
  }
  commentIds.push(commentId);
  return commentId;
};

const getCommentMessage = () => {
  let statements = new Array(getRandomNumber(1, 2));
  for (let i = 0; i < statements.length; i++) {
    statements[i] = getRandomArrayElement(messages);
  }
  return statements.join(' ');
};

export {getPhotos};
