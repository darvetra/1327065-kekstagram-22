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
const thumbnails = document.querySelectorAll('.picture');
const modalCloseElement = modalElement.querySelector('.big-picture__cancel');

for (let i = 0; i < thumbnails.length; i++) {
  let currentPost = renderPosts[i];
  addOpenHandlerToThumbnail(thumbnails[i], currentPost.url, currentPost.description, currentPost.likes, currentPost.comments.length, currentPost.comments);
}

modalCloseElement.addEventListener('click', () => {
  closeModal();
});


/* Загрузка и редактирование нового изображения */
const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');

uploadFile.addEventListener('change', () => {
  openModalUpload();
});

uploadCancel.addEventListener('click', () => {
  closeModalUpload();
});


// Выбор маштаба изображения
const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');

controlSmaller.addEventListener('click', () => {
  zoomOut();
});

controlBigger.addEventListener('click', () => {
  zoomIn();
});








// Вызов слушатяля выбора радиобатона
const form = document.querySelector('#upload-select-image');

form.addEventListener('change', filterChangeHandler);
