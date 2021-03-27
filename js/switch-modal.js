'use strict'

import {isEscEvent} from './util.js';
import {renderModal} from './render-modal.js';
import {clearComments, renderComments} from './render-comments.js';
import {renderMessageSuccess, renderMessageError} from './render-messages.js';


const bodyTagElement = document.querySelector('body');
const mainTagElement = document.querySelector('main');
const modalElement = document.querySelector('.big-picture');

const commentInputElement = document.querySelector('.text__description');
const hashtagInputElement = document.querySelector('.text__hashtags');

/* Открытие и закрытие модального окна изображения из галереи */
const handlerModalBigPictureEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModalBigPicture();
  }
};

function stopEvent(evt) {
  evt.stopPropagation();
}

const openModalBigPicture = () => {
  modalElement.classList.remove('hidden');
  bodyTagElement.classList.add('modal-open');
  document.addEventListener('keydown', handlerModalBigPictureEscKeydown);
};

const addOpenHandlerToThumbnail = (thumbnail, url, description, likesCount, commentsCount, comments) => {
  thumbnail.addEventListener('click', function () {
    openModalBigPicture();
    renderModal(url, description, likesCount, commentsCount);
    renderComments(comments);
  });
};

const closeModalBigPicture = () => {
  modalElement.classList.add('hidden');
  clearComments();
  bodyTagElement.classList.remove('modal-open');
  document.removeEventListener('keydown', handlerModalBigPictureEscKeydown);
};


/* Открытие и закрытие модального окна загрузки и редактирования изображения */
const imgUploadOverlay = document.querySelector('.img-upload__overlay');

const handlerModalUploadEscKeydown = (evt) => {
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
  document.addEventListener('keydown', handlerModalUploadEscKeydown);
};

//масштаб
const controlValueElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('img');

const sliderElement = document.querySelector('.effect-level');
const inputUploadFileElement = document.querySelector('#upload-file');


const closeModalUploadFile = () => {
  imgUploadOverlay.classList.add('hidden');
  bodyTagElement.classList.remove('modal-open');
  document.removeEventListener('keydown', handlerModalUploadEscKeydown);

  // возвращаем форму в исходное положение
  // масштаб
  controlValueElement.value = '100%';
  imagePreviewElement.style.cssText += 'transform: scale(1)';

  //оригинал фото
  sliderElement.classList.add('hidden')
  imagePreviewElement.removeAttribute('class');
  imagePreviewElement.classList.add('effects__preview--none');

  imagePreviewElement.style.cssText += 'filter: none';

  hashtagInputElement.value = '';
  inputUploadFileElement.value = '';

};

/**
 * Переключаем состояние сообщения об успешной отправки формы
 */
const handlerMessageSuccess = () => {
  renderMessageSuccess();

  // закрытие сообщения об успешной отправке
  const successButtonElement = document.querySelector('.success__button');
  const successElement = document.querySelector('.success');

  // Закрытие окна
  const removeMessageSuccess = () => {
    mainTagElement.removeChild(successElement);
  };

  // закрытие по нажатию ескейп
  const handlerMessageSuccessEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      removeMessageSuccess();
    }
  };

  let clickOutForm = function (evt) {
    if (!evt.target.matches('.success__inner, .success__button')) {
      removeMessageSuccess();
    }
  };

  successButtonElement.addEventListener('click', () => {
    removeMessageSuccess();
  });

  successElement.addEventListener('click', clickOutForm);
  document.addEventListener('keydown', handlerMessageSuccessEscKeydown);
}


/**
 * Переключаем состояние сообщения об ошибке, при отправки формы
 */
const handlerMessageError = () => {
  renderMessageError();

  // закрытие сообщения об успешной отправке
  const errorButtonElement = document.querySelector('.error__button');
  const errorElement = document.querySelector('.error');

  // Закрытие окна
  const removeMessageError = () => {
    mainTagElement.removeChild(errorElement);
  };

  // закрытие по нажатию ескейп
  const handlerMessageErrorEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      removeMessageError();
    }
  };

  let clickOutForm = function (evt) {
    if (!evt.target.matches('.error__inner, .error__button')) {
      removeMessageError();
    }
  };

  errorButtonElement.addEventListener('click', () => {
    removeMessageError();
  });

  errorElement.addEventListener('click', clickOutForm);
  document.addEventListener('keydown', handlerMessageErrorEscKeydown);
}

export {
  addOpenHandlerToThumbnail,
  closeModalBigPicture,
  openModalUploadFile,
  closeModalUploadFile,
  handlerMessageSuccess,
  handlerMessageError
};
