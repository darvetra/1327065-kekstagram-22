import {isEscEvent} from './util.js';
import {renderModal} from './render-modal.js';
import {clearComments, renderComments} from './render-comments.js';

const bodyTagElement = document.querySelector('body');
const modalElement = document.querySelector('.big-picture');

const commentInputElement = document.querySelector('.text__description');
const hashtagInputElement = document.querySelector('.text__hashtags');

/* Открытие и закрытие модального окна изображения из галереи */
const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModalBigPictire();
  }
};

function stopEvent(evt) {
  evt.stopPropagation();
}

const openModalBigPicture = () => {
  modalElement.classList.remove('hidden');
  bodyTagElement.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

const addOpenHandlerToThumbnail = (thumbnail, url, description, likesCount, commentsCount, comments) => {
  thumbnail.addEventListener('click', function () {
    openModalBigPicture();
    renderModal(url, description, likesCount, commentsCount);
    renderComments(comments);
  });
};

const closeModalBigPictire = () => {
  modalElement.classList.add('hidden');
  clearComments();
  bodyTagElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};


/* Открытие и закрытие модального окна загрузки и редактирования изображения */
const imgUploadOverlay = document.querySelector('.img-upload__overlay');

const onModalUploadEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModalUploadFile();
  }
};

const openModalUploadFile = () => {
  imgUploadOverlay.classList.remove('hidden');
  bodyTagElement.classList.add('modal-open');
  commentInputElement.addEventListener('keydown', stopEvent)
  hashtagInputElement.addEventListener('keydown', stopEvent)
  document.addEventListener('keydown', onModalUploadEscKeydown);
};

const closeModalUploadFile = () => {
  imgUploadOverlay.classList.add('hidden');
  bodyTagElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalUploadEscKeydown);
};


export {addOpenHandlerToThumbnail, closeModalBigPictire, openModalUploadFile, closeModalUploadFile};
