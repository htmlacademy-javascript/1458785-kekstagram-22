import {removeChildren, asModal} from './utils.js';

const bigPictureView = document.querySelector('.big-picture');
const bigPictureClose = bigPictureView.querySelector('.big-picture__cancel');

const bigPictureImage = bigPictureView.querySelector('.big-picture__img').children[0];
const bigPictureLikes = bigPictureView.querySelector('.likes-count');
const bigPictureCommentsCount = bigPictureView.querySelector('.comments-count');
const bigPictureComments = bigPictureView.querySelector('.social__comments');
const bigPictureDescription = bigPictureView.querySelector('.social__caption');

const createComment = function (comment) {
  const li = document.createElement('li');
  li.classList.add('social__comment');
  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = 35;
  img.height = 35;
  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = comment.message;
  li.appendChild(img);
  li.appendChild(p);
  return li;
};

const showPhotoModal = function (photo) {
  bigPictureImage.src = photo.url;
  bigPictureLikes.textContent = photo.likes;
  bigPictureCommentsCount.textContent = photo.comments.length;
  bigPictureDescription.textContent = photo.description;

  removeChildren(bigPictureComments);

  photo.comments.forEach(comment => {
    bigPictureComments.appendChild(createComment(comment));
  });

  const modal = asModal(bigPictureView);
  const onBigPictureCloseClicked = function(){
    modal.close();
  }

  modal.onClosed = function(){
    bigPictureClose.removeEventListener('click', onBigPictureCloseClicked);
  };

  bigPictureClose.addEventListener('click', onBigPictureCloseClicked);
  modal.open();

  bigPictureView.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureView.querySelector('.comments-loader').classList.add('hidden');
};

export {showPhotoModal};
