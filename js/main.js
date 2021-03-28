'use strict'

import {debounce} from './util.js';
import {getData} from './create-fetch.js';
import {renderThumbnails, removeThumbnails} from './render-thumbnails.js';
import {getThumbnailsData} from './switch-modal.js';
import {filterChangeHandler} from './image-filters.js';
import {uploadFileElementChangeHandler} from './main-field.js';
import {
  showFilters,
  mixArrayAndSlice,
  compareDiscussedPosts,
  setFilterClick
} from './filters.js';

const RERENDER_DELAY = 500;

// кнопки фильтров
const filterDefaultElement = document.querySelector('#filter-default');
const filterRandomElement = document.querySelector('#filter-random');
const filterDiscussedElement = document.querySelector('#filter-discussed');

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
    let filterData = mixArrayAndSlice(serverData);

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

uploadFileElement.addEventListener('change', uploadFileElementChangeHandler);


// Вызов окна загрузки и редактирования изображения
const uploadFormElement = document.querySelector('#upload-select-image');

uploadFormElement.addEventListener('change', filterChangeHandler);

