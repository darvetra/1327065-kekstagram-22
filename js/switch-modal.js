'use strict'

import {isEscEvent} from './util.js';
import {renderModal} from './render-modal.js';
import {clearComments, renderComments} from './render-comments.js';
import {renderMessageSuccess, renderMessageError} from './render-messages.js';
import {controlBiggerElementClickHandler, controlSmallerElementClickHandler} from './change-scale.js';
import {reportFieldCommentsValidity, validateFieldHashtags} from './main-field.js';


const COMMENTS_PACK = 5;

const bodyTagElement = document.querySelector('body');
const modalElement = document.querySelector('.big-picture');
const modalCloseElement = modalElement.querySelector('.big-picture__cancel');

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

  const modalBigPictureEscKeydownHandler = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeModalBigPicture();
    }
  };

  const openModalBigPicture = () => {
    modalElement.classList.remove('hidden');
    bodyTagElement.classList.add('modal-open');
    document.addEventListener('keydown', modalBigPictureEscKeydownHandler);
    modalCloseElement.addEventListener('click', modalCloseElementClickHandler);
  };

  const closeModalBigPicture = () => {
    modalElement.classList.add('hidden');
    clearComments();
    commentsLoaderElement.classList.remove('hidden');
    bodyTagElement.classList.remove('modal-open');
    document.removeEventListener('keydown', modalBigPictureEscKeydownHandler);
    commentsLoaderElement.removeEventListener('click', commentsLoaderHandlerWithArgument);
    modalCloseElement.removeEventListener('click', modalCloseElementClickHandler);
  };

  const modalCloseElementClickHandler = () => {
    closeModalBigPicture();
  }

  const thumbnailClickHandler = () => {
    openModalBigPicture();
    renderModal(url, description, likesCount, commentsCount);
    renderComments(comments.slice(0, COMMENTS_PACK));
    commentsLoaderElement.addEventListener('click', commentsLoaderHandlerWithArgument);
    hideCommentsLoaderElement(comments);
  }

  thumbnail.addEventListener('click', thumbnailClickHandler);
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

const commentInputElement = document.querySelector('.text__description');
const hashtagInputElement = document.querySelector('.text__hashtags');


const modalUploadEscKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModalUploadFile();
  }
};

const stopEvent = (evt) => {
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
  document.addEventListener('keydown', modalUploadEscKeydownHandler);
  uploadCancelElement.addEventListener('click', uploadCancelElementClickHandler);
  controlSmallerElement.addEventListener('click', controlSmallerElementClickHandler);
  controlBiggerElement.addEventListener('click', controlBiggerElementClickHandler);

  hashtagInputElement.addEventListener('input', hashtagInputElementInputHandler);
  commentInputElement.addEventListener('invalid', commentInputElementInvalidHandler);
};

/**
 * Закрытие модального окна загрузки и редактирования нового изображения
 */
const closeModalUploadFile = () => {
  imgUploadOverlay.classList.add('hidden');
  bodyTagElement.classList.remove('modal-open');
  document.removeEventListener('keydown', modalUploadEscKeydownHandler);

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
  commentInputElement.value = '';
  inputUploadFileElement.value = '';

  uploadCancelElement.removeEventListener('click', uploadCancelElementClickHandler);

  controlSmallerElement.removeEventListener('click', controlSmallerElementClickHandler);
  controlBiggerElement.removeEventListener('click', controlBiggerElementClickHandler);

  hashtagInputElement.removeEventListener('input', hashtagInputElementInputHandler);
  commentInputElement.removeEventListener('invalid', commentInputElementInvalidHandler);
};


/**
 * Обработчик валидации поля с тегами
 */
const hashtagInputElementInputHandler = () => {
  validateFieldHashtags();
}


/**
 * Обработчик валидации поля комментария
 */
const commentInputElementInvalidHandler = () => {
  reportFieldCommentsValidity();
}

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
    successElement.remove();

    successButtonElement.removeEventListener('click', successButtonElementClickHandler);
    successElement.removeEventListener('click', clickOutForm);
    document.removeEventListener('keydown', handlerMessageSuccessEscKeydown);
  };

  // закрытие по нажатию ескейп
  const handlerMessageSuccessEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      removeMessageSuccess();
    }
  };

  let clickOutForm = (evt) => {
    if (!evt.target.matches('.success__inner, .success__button')) {
      removeMessageSuccess();
    }
  };

  const successButtonElementClickHandler = () => {
    removeMessageSuccess();
  }

  successButtonElement.addEventListener('click', successButtonElementClickHandler);
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
    errorElement.remove();

    errorButtonElement.removeEventListener('click', errorButtonElementClickHandler);
    errorElement.removeEventListener('click', clickOutForm);
    document.removeEventListener('keydown', handlerMessageErrorEscKeydown);
  };

  // закрытие по нажатию ескейп
  const handlerMessageErrorEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      removeMessageError();
    }
  };

  let clickOutForm = (evt) => {
    if (!evt.target.matches('.error__inner, .error__button')) {
      removeMessageError();
    }
  };

  const errorButtonElementClickHandler = () => {
    removeMessageError();
  }

  errorButtonElement.addEventListener('click', errorButtonElementClickHandler);
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
