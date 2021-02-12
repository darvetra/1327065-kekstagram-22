'use strict'


/* Основные функции */

/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно.
 * Результат: целое число из диапазона "от...до".
 *
 * @param min - минимальное значекние диапозона
 * @param max - максимальное значение диапозона
 */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= max) {
    return 'Введены неверные значения';
  }
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

/**
 * Функция для проверки максимальной длины строки.
 * Результат: true, если строка проходит по длине, и false — если не проходит.
 *
 * @param text - проверяемая_строка
 * @param length - максимальная длина строки
 */
function checkMaxLengthString(text, length) {
  return text.length <= length;
}

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
 * @param functionName - передаваемая функция
 * @param quantityElements - количество элементов массива
 * @returns {*[]}
 */
const createArray = (functionName, quantityElements) => {
  return new Array(quantityElements).fill(null).map((item, index) => functionName(index + 1));
};

/**
 * Генерирует объект с параметрами комментария
 * @param index - айди или номер комментария
 * @returns {{name: *, id, avatar: string, message: string}}
 */
const createComments = (index) => {
  const sentenceNumbers = getRandomIntInclusive(1, MAXIMUM_NUMBER_OF_SENTENCES);
  const createMessage = (length) => {
    const result = [];
    for (let i = 1; i <= length; i++) {
      result.push(MESSAGES[getRandomIntInclusive(0, MESSAGES.length - 1)]);
    }
    return result.join('');
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
const createPosts = (index) => {
  const fillComments = createArray(createComments, NUMBER_OF_COMMENTS);

  return {
    id: index,
    url: 'photos/' + index + '.jpg',
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomIntInclusive(MINIMUM_NUMBER_OF_LIKES, MAXIMUM_NUMBER_OF_LIKES),
    comments: fillComments,
  };
};

/* Константы */

const NUMBER_OF_AVATARS = 6;
const NUMBER_OF_POSTS = 25;
const MINIMUM_NUMBER_OF_LIKES = 15;
const MAXIMUM_NUMBER_OF_LIKES = 250;
const MAXIMUM_NUMBER_OF_COMMENTS = 5;
const NUMBER_OF_COMMENTS = getRandomIntInclusive(0, MAXIMUM_NUMBER_OF_COMMENTS);
const MAXIMUM_NUMBER_OF_SENTENCES = 2;


/* Массивы с данными */

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


/* Основной код */
const fillPosts = createArray(createPosts, NUMBER_OF_POSTS);

// eslint-disable-next-line no-console
console.log(checkMaxLengthString('Привет', 5));


// eslint-disable-next-line no-console
console.log(fillPosts);


