import {renderPictureList} from './user-pictures.js';
import './upload-picture.js';
import {getData} from './api.js';
import {showErrorMessage} from './utils.js';

getData()
  .then((photos) => renderPictureList(photos))
  .catch((error) => showErrorMessage(error));




