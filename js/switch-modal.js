import {isEscEvent} from './util.js';
import {renderModal} from './render-modal.js';
import {clearComments, renderComments} from './render-comments.js';

const bodyTag = document.querySelector('body');
const modalElement = document.querySelector('.big-picture');

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const openModal = (thumbnail, url, description, likesCount, commentsCount, comments) => {
  thumbnail.addEventListener('click', function () {
    modalElement.classList.remove('hidden');
    renderModal(url, description, likesCount, commentsCount);
    renderComments(comments);
    bodyTag.classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscKeydown);
  });
};

const closeModal = () => {
  modalElement.classList.add('hidden');
  clearComments();
  bodyTag.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

export {openModal, closeModal};

/*

// Пока что оставить. Не удалять. На подумать.
// Рабочее решение с помощью делегирования, но пока не ясно как его использовать здесь.
// Не ясно как связать сопутствующую информацию по конкретной миниатюре с выводимой картинкой в модальном окне.

// Функция открытия модального окна
const thumbnailsOpenHandler = (evt) => {
  if (evt.target.matches('.picture__img')) {
    // selectedCategoryContainer.textContent = evt.target.value;
    console.log('клик по миниатюре');

    evt.preventDefault();
    modalElement.classList.remove('hidden');
    imageUrl.src = evt.target.src;
  }
}

// открыть модальное окно
thumbnails.addEventListener('click', thumbnailsOpenHandler);

*/
