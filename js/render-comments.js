'use strict'

const modalElement = document.querySelector('.big-picture');
const blockWithCommentsElement = modalElement.querySelector('.social__comments');

const commentTemplateElement = document.querySelector('#comment').content.querySelector('.social__comment');
const commentatorAvatarElement = commentTemplateElement.querySelector('.social__picture');
const commentatorMessageElement = commentTemplateElement.querySelector('.social__text');

const renderComments = (commentsCollection) => {

  const commentListFragment = document.createDocumentFragment();

  for (let showComment of commentsCollection) {
    commentatorAvatarElement.src = showComment.avatar;
    commentatorAvatarElement.alt = showComment.name;
    commentatorMessageElement.textContent = showComment.message;

    let comment = commentTemplateElement.cloneNode(true);
    commentListFragment.appendChild(comment);
  }

  blockWithCommentsElement.appendChild(commentListFragment);
};

const clearComments = () => {
  blockWithCommentsElement.innerHTML = '';
};

export {renderComments, clearComments};
