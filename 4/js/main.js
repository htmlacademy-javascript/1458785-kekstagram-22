import {getRandomNumber, getRandomArrayElement} from './utils.js';
import {names, descriptions, messages} from './data.js';

let photoId = 0;
let commentIds = [];

const getPhotos = () => {
  let photos = new Array(25);
  for (let i = 0; i < photos.length; i++) {
    photoId = i + 1;
    photos[i] = {
      id: photoId,
      url: 'photo/' + photoId + '.jpg',
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
      avatar: 'image/avatar-' + getRandomNumber(1, 6) + '.svg',
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

getPhotos();


