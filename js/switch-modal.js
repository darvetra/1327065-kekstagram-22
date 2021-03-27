'use strict'

import {isEscEvent} from './util.js';
import {renderModal} from './render-modal.js';
import {clearComments, renderComments} from './render-comments.js';
import {renderMessageSuccess, renderMessageError} from './render-messages.js';
import {controlBiggerElementClickHandler, controlSmallerElementClickHandler} from './change-scale.js';


const COMMENTS_PACK = 5;

const bodyTagElement = document.querySelector('body');
const mainTagElement = document.querySelector('main');
const modalElement = document.querySelector('.big-picture');
const modalCloseElement = modalElement.querySelector('.big-picture__cancel');

const commentInputElement = document.querySelector('.text__description');
const hashtagInputElement = document.querySelector('.text__hashtags');

const commentsLoaderElement = document.querySelector('.comments-loader');
const socialCommentsElement = document.querySelector('.social__comments');
const socialCommentsCollectionElements = socialCommentsElement.children;

/**
 *  Открытие и закрытие модального окна изображения из галереи
 */

/* Открытие и закрытие модальных окон с данными с сервера */
const thumbnailsElement = document.getElementsByClassName('picture');

const getThumbnailsData = (data) => {
  for (let i = 0; i < thumbnailsElement.length; i++) {
    let currentPost = data[i];
    openAndCloseBigPicture(thumbnailsElement[i], currentPost.url, currentPost.description, currentPost.likes, currentPost.comments.length, currentPost.comments);
  }
}

const commentsLoaderHandler = (comments) => {
  renderComments(comments.slice(socialCommentsCollectionElements.length, socialCommentsCollectionElements.length + COMMENTS_PACK));
  hideCommentsLoaderElement(comments);
}

const hideCommentsLoaderElement = (comments) => {
  if (socialCommentsCollectionElements.length >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

const openAndCloseBigPicture = (thumbnail, url, description, likesCount, commentsCount, comments) => {

  const commentsLoaderHandlerWithArgument = commentsLoaderHandler.bind(null, comments);

  const handlerModalBigPictureEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeModalBigPicture();
    }
  };

  const openModalBigPicture = () => {
    modalElement.classList.remove('hidden');
    bodyTagElement.classList.add('modal-open');
    document.addEventListener('keydown', handlerModalBigPictureEscKeydown);
  };

  const closeModalBigPicture = () => {
    modalElement.classList.add('hidden');
    clearComments();
    commentsLoaderElement.classList.remove('hidden');
    bodyTagElement.classList.remove('modal-open');
    document.removeEventListener('keydown', handlerModalBigPictureEscKeydown);
    commentsLoaderElement.removeEventListener('click', commentsLoaderHandlerWithArgument);
  };

  thumbnail.addEventListener('click', function () {
    openModalBigPicture();
    renderModal(url, description, likesCount, commentsCount);
    renderComments(comments.slice(0, COMMENTS_PACK));
    commentsLoaderElement.addEventListener('click', commentsLoaderHandlerWithArgument);
    hideCommentsLoaderElement(comments);
  });

  modalCloseElement.addEventListener('click', () => {
    closeModalBigPicture();
  });
};


/**
 * Открытие и закрытие модального окна загрузки и редактирования нового изображения
 */
const imgUploadOverlay = document.querySelector('.img-upload__overlay');

const controlValueElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('img');

const sliderElement = document.querySelector('.effect-level');
const inputUploadFileElement = document.querySelector('#upload-file');
const uploadCancelElement = document.querySelector('#upload-cancel');

const controlSmallerElement = document.querySelector('.scale__control--smaller');
const controlBiggerElement = document.querySelector('.scale__control--bigger');

const handlerModalUploadEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModalUploadFile();
  }
};

function stopEvent(evt) {
  evt.stopPropagation();
}


/**
 * Открытие модального окна загрузки и редактирования нового изображения
 */
const openModalUploadFile = () => {
  imgUploadOverlay.classList.remove('hidden');
  bodyTagElement.classList.add('modal-open');
  commentInputElement.addEventListener('keydown', stopEvent)
  hashtagInputElement.addEventListener('keydown', stopEvent)
  document.addEventListener('keydown', handlerModalUploadEscKeydown);
  uploadCancelElement.addEventListener('click', uploadCancelElementClickHandler);
  controlSmallerElement.addEventListener('click', controlSmallerElementClickHandler);
  controlBiggerElement.addEventListener('click', controlBiggerElementClickHandler);
};

/**
 * Закрытие модального окна загрузки и редактирования нового изображения
 */
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

  uploadCancelElement.removeEventListener('click', uploadCancelElementClickHandler);

  controlSmallerElement.removeEventListener('click', controlSmallerElementClickHandler);
  controlBiggerElement.removeEventListener('click', controlBiggerElementClickHandler);
};

/**
 *  Обработчик закрытия модального окна загрузки нового изображения
 */
const uploadCancelElementClickHandler = () => {
  closeModalUploadFile();
}

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
  getThumbnailsData,
  openModalUploadFile,
  closeModalUploadFile,
  handlerMessageSuccess,
  handlerMessageError
};
