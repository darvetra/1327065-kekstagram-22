const modalElement = document.querySelector('.big-picture');

const imagePic = modalElement.querySelector('.big-picture__img');
const imageUrl = imagePic.querySelector('img');
const imageDescription = modalElement.querySelector('.social__caption');
const imageCountLikes = modalElement.querySelector('.likes-count');
const ImageCountComments = modalElement.querySelector('.comments-count');

const renderModal = (url, description, likesCount, commentsCount) => {
  imageUrl.src = url;
  imageDescription.textContent = description;
  imageCountLikes.textContent = likesCount;
  ImageCountComments.textContent = commentsCount;
};

export {renderModal};
