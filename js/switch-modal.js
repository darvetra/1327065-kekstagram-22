import {isEscEvent} from './util.js';
import {renderModal} from './render-modal.js';
import {clearComments, renderComments} from './render-comments.js';

const bodyTag = document.querySelector('body');
const modalElement = document.querySelector('.big-picture');


/* Открытие и закрытие модального окна изображения из галереи */
const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const openModal = () => {
  modalElement.classList.remove('hidden');
  bodyTag.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

const addOpenHandlerToThumbnail = (thumbnail, url, description, likesCount, commentsCount, comments) => {
  thumbnail.addEventListener('click', function () {
    openModal();
    renderModal(url, description, likesCount, commentsCount);
    renderComments(comments);
  });
};

const closeModal = () => {
  modalElement.classList.add('hidden');
  clearComments();
  bodyTag.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};


/* Открытие и закрытие модального окна загрузки и редактирования изображения */
const imgUploadOverlay = document.querySelector('.img-upload__overlay');

const onModalUploadEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModalUpload();
  }
};

const openModalUpload = () => {
  imgUploadOverlay.classList.remove('hidden');
  bodyTag.classList.add('modal-open');
  document.addEventListener('keydown', onModalUploadEscKeydown);
};

const closeModalUpload = () => {
  imgUploadOverlay.classList.add('hidden');
  bodyTag.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalUploadEscKeydown);
};


export {addOpenHandlerToThumbnail, closeModal, openModalUpload, closeModalUpload};
