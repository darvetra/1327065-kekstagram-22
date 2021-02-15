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

export {getRandomIntInclusive};
