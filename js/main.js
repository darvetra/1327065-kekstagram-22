'use strict'


import {createArray, createPosts} from './data.js';
import {renderThumbnails} from './render-thumbnails.js';
import {thumbnailsOpenHandler, closeModal} from './switch-modal.js';


/* Константы */
const NUMBER_OF_POSTS = 25;


/* Отрисовка постов */
const renderPosts = createArray(createPosts, NUMBER_OF_POSTS);
renderThumbnails(renderPosts);


/* Модальные окна */
const modalElement = document.querySelector('.big-picture');
const thumbnails = document.querySelectorAll('.picture');
const modalCloseElement = modalElement.querySelector('.big-picture__cancel');

for (let i = 0; i < thumbnails.length; i++) {
  let currentPost = renderPosts[i];
  thumbnailsOpenHandler(thumbnails[i], currentPost.url, currentPost.description, currentPost.likes, currentPost.comments.length, currentPost.comments);
}

modalCloseElement.addEventListener('click', () => {
  closeModal();
});
