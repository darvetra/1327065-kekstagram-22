'use strict'

import {debounce} from './util.js';
import {getData} from './create-fetch.js';
import {renderThumbnails, removeThumbnails} from './render-thumbnails.js';
import {
  addOpenHandlerToThumbnail,
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
  setFilterClick
} from './filters.js';

const RERENDER_DELAY = 500;

// кнопки фильтров
const filterDefaultElement = document.querySelector('#filter-default');
const filterRandomElement = document.querySelector('#filter-random');
const filterDiscussedElement = document.querySelector('#filter-discussed');

setUploadFormSubmit(handlerMessageSuccess, handlerMessageError);

getData((serverData) => {

  /* Отрисовка галереи */
  renderThumbnails(serverData);


  /* Открытие и закрытие модальных окон с данными с сервера */
  const thumbnailsElement = document.querySelectorAll('.picture');

  for (let i = 0; i < thumbnailsElement.length; i++) {
    let currentPost = serverData[i];
    addOpenHandlerToThumbnail(thumbnailsElement[i], currentPost.url, currentPost.description, currentPost.likes, currentPost.comments.length, currentPost.comments);
  }


  /* Переключение фильтров */

  // посты по-умолчанию
  const renderDefaultPosts = () => {
    removeThumbnails();
    renderThumbnails(serverData);
  }

  setFilterClick(filterDefaultElement, debounce(renderDefaultPosts, RERENDER_DELAY));

  // рандомные посты
  const renderRandomPosts = () => {
    removeThumbnails();
    renderThumbnails(shuffleArrayAndSlice(serverData));
  }

  setFilterClick(filterRandomElement, debounce(renderRandomPosts, RERENDER_DELAY));

  // обсуждаемые посты
  const renderDiscussedPosts = () => {
    removeThumbnails();
    renderThumbnails(serverData.slice().sort(compareDiscussedPosts))
  }

  setFilterClick(filterDiscussedElement, debounce(renderDiscussedPosts, RERENDER_DELAY));

});


/* Показать блок с фильтрами, сразу же после получения данных*/
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
