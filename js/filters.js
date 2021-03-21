import {removeThumbnails} from './render-thumbnails.js';

const RANDOM_PHOTOS_COUNT = 10;

const filterDefaultElement = document.querySelector('#filter-default');
const filterRandomElement = document.querySelector('#filter-random');
const filterDiscussedElement = document.querySelector('#filter-discussed');

// Показываем фильтры
const showFilters = () => {
  const imgFiltersElement = document.querySelector('.img-filters');
  imgFiltersElement.classList.remove('img-filters--inactive');
}

// Функция для вывода рандомных значений на основе тасования Фишера-Йетса
const shuffleArrayAndSlice = (array) => {
  let newArray = array.slice();
  let i = 0
    , j = 0
    , temp = null

  let resultArray = [];

  for (i = newArray.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = newArray[i]
    newArray[i] = newArray[j]
    newArray[j] = temp

    resultArray.push(newArray[i]);
  }
  return resultArray.slice(0, RANDOM_PHOTOS_COUNT);
}


// Рейтинг постов на основе количества комментариев
const getCommentsQuantity = (post) => {
  return post.comments.length
}


// Сортировка по рейтингу
const compareDiscussedPosts = (postA, postB) => {
  const rankA = getCommentsQuantity(postA);
  const rankB = getCommentsQuantity(postB);

  return rankB - rankA;
}

const setDefaultFilterClick = (cb) => {
  filterDefaultElement.addEventListener('click', () => {

    removeThumbnails();
    cb();
  });
}

const setRandomFilterClick = (cb) => {
  filterRandomElement.addEventListener('click', () => {

    removeThumbnails();
    cb();
  });
}

const setDiscussedFilterClick = (cb) => {
  filterDiscussedElement.addEventListener('click', () => {
    removeThumbnails();
    cb();
  });
}

export {showFilters, shuffleArrayAndSlice, compareDiscussedPosts, setDefaultFilterClick, setRandomFilterClick, setDiscussedFilterClick};
