/* Утилитарные функции */

/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно.
 * Результат: целое число из диапазона "от...до".
 *
 * @param min - минимальное значекние диапозона
 * @param max - максимальное значение диапозона
 */
const getRandomIntInclusive = (min, max) => {
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
// eslint-disable-next-line no-unused-vars
const checkMaxLengthString = (text, length) => {
  return text.length <= length;
}

/**
 * Проверка нажатия ESC
 * @param evt
 * @returns {boolean}
 */
const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

/**
 * Проверка нажатия Enter
 * @param evt
 * @returns {boolean}
 */
// eslint-disable-next-line no-unused-vars
const isEnterEvent = (evt) => {
  return evt.key === 'Enter';
};

/**
 *
 * @param fn - Функция
 * @param ms - Время, в милисекундах
 * @returns {function(): void}
 */
const debounce = (fn, ms) => {
  let timeout;
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments)
    }
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms)
  };
}

export {getRandomIntInclusive, isEscEvent, debounce};
