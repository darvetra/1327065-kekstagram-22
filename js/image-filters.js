'use strict'

// Подключение и настройка слайдера
const sliderElement = document.querySelector('.effect-level');
const effectLevelSliderElement = sliderElement.querySelector('.effect-level__slider');
const effectLevelValueElement = sliderElement.querySelector('.effect-level__value');

effectLevelValueElement.value = 80;

// eslint-disable-next-line no-undef
noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});


// Применение фильтров
const imagePreviewElement = document.querySelector('img');

let filterChangeHandler = function (evt) {
  if (evt.target.matches('.effects__radio')) {
    let choiceFilter = evt.target.value;

    const getFilter = function (choiceFilter) {
      switch (choiceFilter) {
        case 'none':
          imagePreviewElement.removeAttribute('class');
          sliderElement.classList.add('hidden')
          return 'effects__preview--none';

        case 'chrome':
          effectLevelSliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1,
          });
          sliderElement.classList.remove('hidden')
          return 'effects__preview--chrome';

        case 'sepia':
          effectLevelSliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1,
          });
          sliderElement.classList.remove('hidden')
          return 'effects__preview--sepia';

        case 'marvin':
          effectLevelSliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 100,
            },
            start: 100,
            step: 1,
          });
          sliderElement.classList.remove('hidden')
          return 'effects__preview--marvin';

        case 'phobos':
          effectLevelSliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 3,
            },
            start: 3,
            step: 0.1,
          });
          sliderElement.classList.remove('hidden')
          return 'effects__preview--phobos';

        case 'heat':
          effectLevelSliderElement.noUiSlider.updateOptions({
            range: {
              min: 1,
              max: 3,
            },
            start: 3,
            step: 0.1,
          });
          sliderElement.classList.remove('hidden')
          return 'effects__preview--heat';
      }
    }

    imagePreviewElement.removeAttribute('class');
    imagePreviewElement.classList.add(getFilter(choiceFilter));

    effectLevelSliderElement.noUiSlider.on('update', (values, handle) => {
      let filterValue = '';

      switch (choiceFilter) {
        case 'none':
          filterValue = 'filter: none';
          break;
        case 'chrome':
          filterValue = `filter: grayscale(${effectLevelValueElement.value})`;
          break;
        case 'sepia':
          filterValue = `filter: sepia(${effectLevelValueElement.value})`;
          break;
        case 'marvin':
          filterValue = `filter: invert(${effectLevelValueElement.value}%)`;
          break;
        case 'phobos':
          filterValue = `filter: blur(${effectLevelValueElement.value}px)`;
          break;
        case 'heat':
          filterValue = `filter: brightness(${effectLevelValueElement.value})`;
          break;
      }

      effectLevelValueElement.value = values[handle];
      imagePreviewElement.style.cssText += filterValue;

    });
  }
}

export {filterChangeHandler};
