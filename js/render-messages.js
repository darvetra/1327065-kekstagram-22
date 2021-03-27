'use strict'

import {closeModalUploadFile} from './switch-modal.js';

const ALERT_SHOW_TIME = 10000;

const messageSuccessTemplateElement = document.querySelector('#success').content.querySelector('.success');
const messageErrorTemplateElement = document.querySelector('#success').content.querySelector('.success');
const mainTagElement = document.querySelector('main');

/**
 * Сообщение сообщающее об ошибке
 * @type {number}
 */
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

/**
 * Отрисовка сообщения об успешной отправке формы
 */
const renderMessageSuccess = () => {
  closeModalUploadFile();

  let messageSuccess = messageSuccessTemplateElement.cloneNode(true);
  mainTagElement.appendChild(messageSuccess);
};

/**
 * Отрисовка сообщения об ошибке, при отправке формы
 */
const renderMessageError = () => {
  closeModalUploadFile();

  let messageError = messageErrorTemplateElement.cloneNode(true);
  mainTagElement.appendChild(messageError);
};

export {showAlert, renderMessageSuccess, renderMessageError};

