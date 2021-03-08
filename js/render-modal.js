const modalElement = document.querySelector('.big-picture');

const imagePicElement = modalElement.querySelector('.big-picture__img');
const imageUrlElement = imagePicElement.querySelector('img');
const imageDescriptionElement = modalElement.querySelector('.social__caption');
const imageCountLikesElement = modalElement.querySelector('.likes-count');
const ImageCountCommentsElement = modalElement.querySelector('.comments-count');

const renderModal = (url, description, likesCount, commentsCount) => {
  imageUrlElement.src = url;
  imageDescriptionElement.textContent = description;
  imageCountLikesElement.textContent = likesCount;
  ImageCountCommentsElement.textContent = commentsCount;
};

export {renderModal};
