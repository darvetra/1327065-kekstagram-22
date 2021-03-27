'use strict'

import {sendData} from './create-fetch.js';
import {handlerMessageError, handlerMessageSuccess, openModalUploadFile} from './switch-modal.js';


const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_NUMBER_OF_HASHTAGS = 5;

const commentInputElement = document.querySelector('.text__description');
const hashtagInputElement = document.querySelector('.text__hashtags');
const redBorder = 'red auto 1px';

/**
 *  Валидация поля с тегами
 */
const validateFieldHashtags = () => {
  /* хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом */
  /* хэш-теги разделяются пробелами */
  let arrayOfHashtags = hashtagInputElement.value.split(' ').map(item => item.toLowerCase());

  arrayOfHashtags.forEach((value) => {
    if (value[0] !== '#') { /* хэш-тег начинается с символа # (решётка) */
      hashtagInputElement.setCustomValidity(`Хэш-тег должен начинаться с символа # (решётка). Будь добр, исправь следующий хэш-тег: "${value}".`)
      hashtagInputElement.style.outline = redBorder;
    } else if (value.match(/#([^#]+)[^a-zA-Zа-яА-Я0-9]/g)) { /* строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д. */
      hashtagInputElement.setCustomValidity(`Хэштег может содержать только буквы и цифры! Исправь hashtag "${value}".`)
      hashtagInputElement.style.outline = redBorder;
    } else if (value.length < MIN_HASHTAG_LENGTH) { /* хеш-тег не может состоять только из одной решётки */
      hashtagInputElement.setCustomValidity(`Хэш-тег не может состоять только из одной решётки. Исправь hashtag "${value}".`)
      hashtagInputElement.style.outline = redBorder;
    } else if (value.length > MAX_HASHTAG_LENGTH) { /* максимальная длина одного хэш-тега 20 символов, включая решётку */
      hashtagInputElement.setCustomValidity(`Максимальная длина одного хэш-тега не может быть больше 20 символов, включая решетку. Исправь hashtag "${value}".`)
      hashtagInputElement.style.outline = redBorder;
    } else if (arrayOfHashtags.indexOf(value) !== arrayOfHashtags.lastIndexOf(value)) { /* один и тот же хэш-тег не может быть использован дважды */
      hashtagInputElement.setCustomValidity(`Хэш-теги не могут повторяться, удали один из хэш-тегов "${value}"!`)
      hashtagInputElement.style.outline = redBorder;
    } else if (arrayOfHashtags.length > MAX_NUMBER_OF_HASHTAGS) { /* нельзя указать больше пяти хэш-тегов */
      hashtagInputElement.setCustomValidity(`Количество хэш-тегов превышает допустимое значение. Максимальное количество хештегов - ${MAX_NUMBER_OF_HASHTAGS}, удалите ${arrayOfHashtags.length - MAX_NUMBER_OF_HASHTAGS} хэш-тег(а)`);
      hashtagInputElement.style.outline = redBorder;
    } else {
      hashtagInputElement.setCustomValidity('');
      hashtagInputElement.style.outline = '';
    }
  });

  hashtagInputElement.reportValidity();
};

/**
 *  Валидация поля с комментарием
 */
const reportFieldCommentsValidity = () => {
  if (commentInputElement.validity.tooLong) {
    commentInputElement.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    commentInputElement.style.outline = redBorder;
  } else {
    commentInputElement.setCustomValidity('');
    commentInputElement.style.outline = '';
  }
};


const sendFormElement = document.querySelector('.img-upload__form');

/**
 *  Отправка формы с новым изображением
 */
const setUploadFormSubmit = (onSuccess, onFail) => {

  const getResponseAndRemoveListener = (response) => {
    response();
    sendFormElement.removeEventListener('submit', submitFormListener);
  }

  const submitFormListener = (evt) => {
    evt.preventDefault();

    sendData(
      () => getResponseAndRemoveListener(onSuccess),
      () => getResponseAndRemoveListener(onFail),
      new FormData(evt.target),
    )
    ;
  }

  sendFormElement.addEventListener('submit', submitFormListener);
};


/**
 *  Обработчик открытия модального окна для редактирования
 */
const uploadFileElementChangeHandler = () => {
  openModalUploadFile();
  setUploadFormSubmit(handlerMessageSuccess, handlerMessageError);
}


export {validateFieldHashtags, reportFieldCommentsValidity, uploadFileElementChangeHandler};
