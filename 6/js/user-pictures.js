import {getPhotos} from './data.js';
import {showPhotoModal} from './big-picture.js';

const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarPictures = getPhotos();

const similarListFragment = document.createDocumentFragment();

similarPictures.forEach((photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;

  pictureElement.addEventListener('click', () => {
    showPhotoModal(photo);
  });

  similarListFragment.appendChild(pictureElement);
});

pictureContainer.appendChild(similarListFragment);
