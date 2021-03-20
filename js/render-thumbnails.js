const blockWithPhotosElement = document.querySelector('.pictures');

const pictureTemplateElement = document.querySelector('#picture').content;
const newPictureTemplateElement = pictureTemplateElement.querySelector('.picture');

const pictureImageElement = newPictureTemplateElement.querySelector('.picture__img');
const pictureLikesElement = newPictureTemplateElement.querySelector('.picture__likes');
const pictureCommentsElement = newPictureTemplateElement.querySelector('.picture__comments');

const renderThumbnails = (postsList) => {
  for (let i = 0; i < postsList.length; i++) {
    let photoIndex = postsList[i];

    pictureImageElement.src = photoIndex.url;
    pictureLikesElement.textContent = photoIndex.likes;
    pictureCommentsElement.textContent = photoIndex.comments.length;

    let picture = newPictureTemplateElement.cloneNode(true);
    blockWithPhotosElement.appendChild(picture);
  }
};


const postsCollection = blockWithPhotosElement.children;

// Очистить вывод постов
const removeThumbnails = () => {
  for (let i = postsCollection.length - 1; i > 0; i--) {
    if (postsCollection[i].classList.contains('picture')) {
      postsCollection[i].remove();
    }
  }
}

export {renderThumbnails, removeThumbnails};
