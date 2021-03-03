import {isEscEvent} from './util.js';
import {renderModal} from './render-modal.js';
import {clearComments, renderComments} from './render-comments.js';

const bodyTag = document.querySelector('body');
const modalElement = document.querySelector('.big-picture');

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

const thumbnailsOpenHandler = (thumbnail, url, description, likesCount, commentsCount, comments) => {
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

export {thumbnailsOpenHandler, closeModal};
