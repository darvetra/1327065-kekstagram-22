'use strict'

import {createArray, createPosts} from './data.js';
import {renderThumbnails} from './render-thumbnails.js';


/* Константы */
const NUMBER_OF_POSTS = 25;


/* Основной код */
const fillPosts = createArray(createPosts, NUMBER_OF_POSTS);

renderThumbnails(fillPosts);
