'use strict'

const KEKSTAGRAM_SERVER = 'https://22.javascript.pages.academy/kekstagram';
const KEKSTAGRAM_DATA = 'https://22.javascript.pages.academy/kekstagram/data';

import {showAlert} from './render-messages.js';

/* Получение данных с сервера */
const getData = (onSuccess, onError) => {
  fetch(KEKSTAGRAM_DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showAlert('Не удалось получить данные сервера');
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((json) => {
      onSuccess(json);
    })
    .catch((err) => {
      showAlert('Не удалось получить данные сервера');
      onError(err);
    });
};


/* отправка данных на сервер */
const sendData = (onSuccess, onFail, body) => {
  fetch(
    KEKSTAGRAM_SERVER,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
