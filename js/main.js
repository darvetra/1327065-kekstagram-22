'use strict'


import {createArray, createPost} from './data.js';
import {renderThumbnails} from './render-thumbnails.js';
import {addOpenHandlerToThumbnail, closeModal, openModalUpload, closeModalUpload} from './switch-modal.js';
import {zoomIn, zoomOut} from './change-scale.js';
import {filterChangeHandler} from './image-filters.js';


/* Константы */
const NUMBER_OF_POSTS = 25;


/* Отрисовка постов */
const renderPosts = createArray(createPost, NUMBER_OF_POSTS);
renderThumbnails(renderPosts);


/* Модальные окна */
const modalElement = document.querySelector('.big-picture');
const thumbnailsElement = document.querySelectorAll('.picture');
const modalCloseElement = modalElement.querySelector('.big-picture__cancel');

for (let i = 0; i < thumbnailsElement.length; i++) {
  let currentPost = renderPosts[i];
  addOpenHandlerToThumbnail(thumbnailsElement[i], currentPost.url, currentPost.description, currentPost.likes, currentPost.comments.length, currentPost.comments);
}

modalCloseElement.addEventListener('click', () => {
  closeModal();
});


/* Загрузка и редактирование нового изображения */
const uploadFileElement = document.querySelector('#upload-file');
const uploadCancelElement = document.querySelector('#upload-cancel');

uploadFileElement.addEventListener('change', () => {
  openModalUpload();
});

uploadCancelElement.addEventListener('click', () => {
  closeModalUpload();
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
