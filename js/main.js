'use strict'

import {debounce} from './util.js';
import {getData} from './create-fetch.js';
import {renderThumbnails, removeThumbnails} from './render-thumbnails.js';
import {
  getThumbnailsData,
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
  getThumbnailsData(serverData);


  /* Переключение фильтров */

  // посты по-умолчанию
  const renderDefaultPosts = () => {
    removeThumbnails();
    renderThumbnails(serverData);
    getThumbnailsData(serverData);
  }

  setFilterClick(filterDefaultElement, debounce(renderDefaultPosts, RERENDER_DELAY));

  // рандомные посты
  const renderRandomPosts = () => {
    let filterData = shuffleArrayAndSlice(serverData);

    removeThumbnails();
    renderThumbnails(filterData);
    getThumbnailsData(filterData);
  }

  setFilterClick(filterRandomElement, debounce(renderRandomPosts, RERENDER_DELAY));

  // обсуждаемые посты
  const renderDiscussedPosts = () => {
    let filterData = serverData.slice().sort(compareDiscussedPosts);

    removeThumbnails();
    renderThumbnails(filterData);
    getThumbnailsData(filterData);
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
