const modalElement = document.querySelector('.big-picture');
const blockCountComments = modalElement.querySelector('.social__comment-count');
const blockLoaderComments = modalElement.querySelector('.comments-loader');
const blockWithComments = modalElement.querySelector('.social__comments');

const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentatorAvatar = commentTemplate.querySelector('.social__picture');
const commentatorMessage = commentTemplate.querySelector('.social__text');


const renderComments = (commentsCollection) => {

  const commentListFragment = document.createDocumentFragment();

  for (let showComment of commentsCollection) {
    commentatorAvatar.src = showComment.avatar;
    commentatorAvatar.alt = showComment.name;
    commentatorMessage.textContent = showComment.message;

    let comment = commentTemplate.cloneNode(true);
    commentListFragment.appendChild(comment);
  }

  blockWithComments.appendChild(commentListFragment);

  blockCountComments.classList.add('hidden');
  blockLoaderComments.classList.add('hidden');

};

const clearComments = () => {
  blockWithComments.innerHTML = '';
};

export {renderComments, clearComments};
