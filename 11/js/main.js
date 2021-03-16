import {initializePicturesList} from './user-pictures.js';
import './upload-picture.js';
import {getData} from './api.js';
import {showErrorMessage} from './utils.js';

getData()
  .then((photos) => initializePicturesList(photos))
  .catch((error) => showErrorMessage(error));




