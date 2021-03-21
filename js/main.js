'use strict'

import {debounce} from './util.js';
import {getData} from './create-fetch.js';
import {renderThumbnails, removeThumbnails} from './render-thumbnails.js';
import {
  addOpenHandlerToThumbnail,
  closeModalBigPicture,
  openModalUploadFile,
  closeModalUploadFile,
  handlerMessageSuccess,
  handlerMessageError
} from './switch-modal.js';
import {zoomIn, zoomOut} from './change-scale.js';
import {filterChangeHandler} from './image-filters.js';
import {validateFieldHashtags, reportFieldCommentsValidity, setUploadFormSubmit} from './main-field.js';
import {
  showFilters,
  shuffleArrayAndSlice,
  compareDiscussedPosts,
  setDefaultFilterClick,
  setRandomFilterClick,
  setDiscussedFilterClick
} from './filters.js';

const RERENDER_DELAY = 500;

setUploadFormSubmit(handlerMessageSuccess, handlerMessageError);

getData((serverData) => {
  /* Отрисовка галереи */
  renderThumbnails(serverData);

  /* Открытие и закрытие модальных окон с данными с сервера */
  const modalElement = document.querySelector('.big-picture');
  const thumbnailsElement = document.querySelectorAll('.picture');
  const modalCloseElement = modalElement.querySelector('.big-picture__cancel');

  for (let i = 0; i < thumbnailsElement.length; i++) {
    let currentPost = serverData[i];
    addOpenHandlerToThumbnail(thumbnailsElement[i], currentPost.url, currentPost.description, currentPost.likes, currentPost.comments.length, currentPost.comments);
  }

  modalCloseElement.addEventListener('click', () => {
    closeModalBigPicture();
  });

  setDefaultFilterClick(() => renderThumbnails(serverData));

  setRandomFilterClick(debounce(
    () => renderThumbnails(shuffleArrayAndSlice(serverData)), RERENDER_DELAY,
  ));

  setDiscussedFilterClick(() => renderThumbnails(serverData.slice().sort(compareDiscussedPosts)));
});

/* Показать блок с фильтрами, сразу же после получекния данных*/
showFilters();


/* Загрузка и редактирование нового изображения */
const uploadFileElement = document.querySelector('#upload-file');
const uploadCancelElement = document.querySelector('#upload-cancel');

uploadFileElement.addEventListener('change', () => {
  openModalUploadFile();
});

uploadCancelElement.addEventListener('click', () => {
  closeModalUploadFile();
});


// Выбор маштаба изображения
const controlSmallerElement = document.querySelector('.scale__control--smaller');
const controlBiggerElement = document.querySelector('.scale__control--bigger');

controlSmallerElement.addEventListener('click', () => {
  zoomOut();
});

controlBiggerElement.addEventListener('click', () => {
  zoomIn();
});


// Вызов окна загрузки и редактирования изображения
const uploadFormElement = document.querySelector('#upload-select-image');

uploadFormElement.addEventListener('change', filterChangeHandler);


// Валидация форм отправки изображения
const commentInputElement = document.querySelector('.text__description');
const hashtagInputElement = document.querySelector('.text__hashtags');

hashtagInputElement.addEventListener('input', () => {
  validateFieldHashtags();
})
;

commentInputElement.addEventListener('invalid', () => {
  reportFieldCommentsValidity();
});
