'use strict'

const SCALE_STEP = 25;

const controlValueElement = document.querySelector('.scale__control--value');
const divImagePreviewElement = document.querySelector('.img-upload__preview');
const imagePreviewElement = divImagePreviewElement.querySelector('img');


/**
 * Увеличение масштаба
 */
const zoomIn = () => {
  let currentControlValue = parseInt(controlValueElement.value.substring(0, controlValueElement.value.length - 1), 10);

  if (currentControlValue < 100) {
    let newControlValue = currentControlValue + SCALE_STEP;
    controlValueElement.value = newControlValue + '%';

    let scaleValue = newControlValue / 100;
    imagePreviewElement.style.cssText += `transform: scale(${scaleValue})`;
  }
}

const controlBiggerElementClickHandler = () => {
  zoomIn();
}


/**
 * Уменьшение масштаба
 */
const zoomOut = () => {
  let currentControlValue = parseInt(controlValueElement.value.substring(0, controlValueElement.value.length - 1), 10);

  if (currentControlValue > SCALE_STEP) {
    let newControlValue = currentControlValue - SCALE_STEP;
    controlValueElement.value = newControlValue + '%';

    imagePreviewElement.style.cssText += `transform: scale(0.${newControlValue})`;
  }
}

const controlSmallerElementClickHandler = () => {
  zoomOut();
}


export {controlSmallerElementClickHandler, controlBiggerElementClickHandler};
