let blockWithPhotos = document.querySelector('.pictures');

let pictureTemplate = document.querySelector('#picture').content;
let newPictureTemplate = pictureTemplate.querySelector('.picture');

let pictureImage = newPictureTemplate.querySelector('.picture__img');
let picturelikes = newPictureTemplate.querySelector('.picture__likes');
let pictureComments = newPictureTemplate.querySelector('.picture__comments');


const renderThumbnails = (postsList) => {
  for (let i = 0; i < postsList.length; i++) {
    let photoIndex = postsList[i];

    pictureImage.src = photoIndex.url;
    picturelikes.textContent = photoIndex.likes;
    pictureComments.textContent = photoIndex.comments.length;

    let picture = newPictureTemplate.cloneNode(true);
    blockWithPhotos.appendChild(picture);
  }
};

export {renderThumbnails};
