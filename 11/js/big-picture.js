import {removeChildren, asModal} from './utils.js';

const bigPictureView = document.querySelector('.big-picture');
const bigPictureClose = bigPictureView.querySelector('.big-picture__cancel');

const bigPictureImage = bigPictureView.querySelector('.big-picture__img').children[0];
const bigPictureLikes = bigPictureView.querySelector('.likes-count');
const bigPictureCommentsCount = bigPictureView.querySelector('.comments-count');
const bigPictureComments = bigPictureView.querySelector('.social__comments');
const bigPictureDescription = bigPictureView.querySelector('.social__caption');
const bigPictureCommentsLoader = bigPictureView.querySelector('.comments-loader');
const bigPictureSocialCommentCount = bigPictureView.querySelector('.social__comment-count');

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

  const modal = asModal(bigPictureView);
  modal.context.photo = photo;
  modal.context.showedComments = [];
  modal.context.showNextComments = function(){
    const batchCount = Math.floor((modal.context.showedComments.length/5));
    const nextBatchCount = batchCount+1;

    const commentsToAppend = modal.context.photo.comments.slice(
      batchCount*5,
      Math.max(0, Math.min(modal.context.photo.comments.length, nextBatchCount*5)));

    commentsToAppend.forEach(comment => {
      bigPictureComments.appendChild(createComment(comment));
    });

    modal.context.showedComments.push(...commentsToAppend);
    removeChildren(bigPictureSocialCommentCount);
    bigPictureSocialCommentCount.innerHTML = modal.context.showedComments.length + ' из <span class="comments-count">'+modal.context.photo.comments.length+'</span> комментариев';
    if(modal.context.showedComments.length < modal.context.photo.comments.length){
      bigPictureCommentsLoader.classList.remove('hidden');
    }
    else{
      bigPictureCommentsLoader.classList.add('hidden');
    }
  };

  const onBigPictureCloseClicked = function(){
    modal.close();
  }
  bigPictureClose.addEventListener('click', onBigPictureCloseClicked);

  const onCommentsLoaderClicked = function(){
    modal.context.showNextComments();
  }
  bigPictureCommentsLoader.addEventListener('click', onCommentsLoaderClicked);

  modal.onClosed = function(){
    bigPictureClose.removeEventListener('click', onBigPictureCloseClicked);
    bigPictureCommentsLoader.removeEventListener('click', onCommentsLoaderClicked);
  };

  modal.context.showNextComments();
  modal.open();
};

export {showPhotoModal};
