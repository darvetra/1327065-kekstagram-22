import {getRandomIntInclusive} from './util.js';


/* Константы */

const NUMBER_OF_AVATARS = 6;
const MINIMUM_NUMBER_OF_LIKES = 15;
const MAXIMUM_NUMBER_OF_LIKES = 250;
const MAXIMUM_NUMBER_OF_COMMENTS = 5;
const MAXIMUM_NUMBER_OF_SENTENCES = 2;

const DESCRIPTIONS = [
  'Такого не ожидал никто',
  '#безфильтров',
  '#сказочноебали',
  'Привет, котики!',
  'Ну что тут скажешь?',
  'Здесь могла бы быть ваша реклама',
  'Человек собаке друг',
  'Жизнь удалась!',
  'Кто на новенького?',
  'Уноси готовенького!',
  'Wroooom',
  'Погнали!',
  'Мир ждет!',
  'Кто здесь?',
  'Вопрос: зачем?',
  'Кто следующий?',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

/* Функции */

/**
 * Получает рандомный элемент массива
 * @param elements
 * @returns {*}
 */
const getRandomArrayElement = (elements) => {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
};

/**
 * Создает новый массив с объектами
 * @param createArrayFunction - передаваемая функция
 * @param quantityElements - количество элементов массива
 * @returns {*[]}
 */
const createArray = (createArrayFunction, quantityElements) => {
  return new Array(quantityElements).fill(null).map((item, index) => createArrayFunction(index + 1));
};

/**
 * Генерирует объект с параметрами комментария
 * @param index - айди или номер комментария
 * @returns {{name: *, id, avatar: string, message: string}}
 */
const createComment = (index) => {
  const sentenceNumbers = getRandomIntInclusive(1, MAXIMUM_NUMBER_OF_SENTENCES);
  const createMessage = (length) => {
    let result = [];
    for (let i = 1; i <= length; i++) {
      result.push(MESSAGES[getRandomIntInclusive(0, MESSAGES.length - 1)]);
    }
    return result.join(' ');
  };

  return {
    id: index,
    avatar: 'img/avatar-' + getRandomIntInclusive(1, NUMBER_OF_AVATARS) + '.svg',
    message: createMessage(sentenceNumbers),
    name: getRandomArrayElement(NAMES),
  };
};

/**
 * Генерирует объект с параметрами поста (публицации фото)
 * @param index - айди или номер по порядку
 * @returns {{comments: *[], description: *, id, url: string, likes: (string|*)}}
 */
const createPost = (index) => {
  const fillComments = createArray(createComment, getRandomIntInclusive(0, MAXIMUM_NUMBER_OF_COMMENTS));

  return {
    id: index,
    url: 'photos/' + index + '.jpg',
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomIntInclusive(MINIMUM_NUMBER_OF_LIKES, MAXIMUM_NUMBER_OF_LIKES),
    comments: fillComments,
  };
};

export {getRandomArrayElement, createArray, createComment, createPost};
