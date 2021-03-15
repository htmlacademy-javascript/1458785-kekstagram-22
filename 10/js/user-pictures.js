/* global _:readonly */
import {showPhotoModal} from './big-picture.js';
import {getRandomUniqueArrayElements} from './utils.js';

const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const SIMILAR_PICTURES_COUNT = 25;
const PICTURES_COUNT_RANDOM = 10;
const filter = document.querySelector('.img-filters');
const filterDefault = filter.querySelector('#filter-default');
const filterRandom = filter.querySelector('#filter-random');
const filterDiscussed = filter.querySelector('#filter-discussed');

const pictures = [];
const RERENDER_DELAY = 500;

const renderPictureList = (similarPictures) => {
  const existingPictures = pictureContainer.querySelectorAll('.picture');
  for (let existingPicture of existingPictures) {
    existingPicture.parentNode.removeChild(existingPicture);
  }
  const similarListFragment = document.createDocumentFragment();

  similarPictures
    .slice(0, SIMILAR_PICTURES_COUNT)
    .forEach((photo) => {
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
};

const updateFilter = _.debounce(
  function (filter) {
    const filtered = filter(pictures);
    renderPictureList(filtered);
  },
  RERENDER_DELAY);

const updateFilterButtons = function (selectedFilterButton) {
  if (selectedFilterButton !== filterDefault) {
    filterDefault.classList.remove('img-filters__button--active');
  }
  if (selectedFilterButton !== filterRandom) {
    filterRandom.classList.remove('img-filters__button--active');
  }
  if (selectedFilterButton !== filterDiscussed) {
    filterDiscussed.classList.remove('img-filters__button--active');
  }
  selectedFilterButton.classList.add('img-filters__button--active');
};

const getFilter = function(selectedFilterButton){
  if (filterRandom === selectedFilterButton) {
    return (pics) => getRandomUniqueArrayElements(pics, PICTURES_COUNT_RANDOM);
  }
  else if (filterDiscussed === selectedFilterButton) {
    return (pics) => pics.slice().sort((a, b) => b.comments.length - a.comments.length);
  }

  return (pics) => pics;
}

const onFilterClicked = function(evt){
  const clickedButton = evt.target;
  updateFilterButtons(clickedButton);

  const filter = getFilter(clickedButton);
  updateFilter(filter);
}

filterDefault.addEventListener('click', onFilterClicked);
filterRandom.addEventListener('click', onFilterClicked);
filterDiscussed.addEventListener('click', onFilterClicked);

const initializePicturesList = function (pics) {
  pictures.push(...pics);
  renderPictureList(pictures);
  filter.classList.remove('img-filters--inactive');
};

export {initializePicturesList};
