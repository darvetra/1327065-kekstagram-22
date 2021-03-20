const RANDOM_PHOTOS_COUNT = 10;


// Функция для вывода рандомных значений на основе тасования Фишера-Йетса
const shuffleArray = (array) => {
  let newArray = array.slice();
  let i = 0
    , j = 0
    , temp = null

  let resultArray = [];

  for (i = newArray.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = newArray[i]
    newArray[i] = newArray[j]
    newArray[j] = temp

    resultArray.push(newArray[i]);
  }
  return resultArray.slice(0, RANDOM_PHOTOS_COUNT);
}


// Рейтинг постов на основе количества комментариев
const getTopDiscussedPosts = (post) => {
  return post.comments.length
}


// Сортировка по рейтингу
const sortDiscussedPosts = (postA, postB) => {
  const rankA = getTopDiscussedPosts(postA);
  const rankB = getTopDiscussedPosts(postB);

  return rankB - rankA;
}


export {shuffleArray, sortDiscussedPosts};
