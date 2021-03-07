const SCALE_STEP = 25;

const controlValue = document.querySelector('.scale__control--value');
const divImagePreview = document.querySelector('.img-upload__preview');
const imagePreview = divImagePreview.querySelector('img');

const zoomIn = () => {
  let currentControlValue = parseInt(controlValue.value.substring(0, controlValue.value.length - 1), 10);

  if (currentControlValue < 100) {
    let newControlValue = currentControlValue + SCALE_STEP;
    controlValue.value = newControlValue + '%';

    let scaleValue = newControlValue / 100;
    imagePreview.style.cssText += `transform: scale(${scaleValue})`;
  }
}


const zoomOut = () => {
  let currentControlValue = parseInt(controlValue.value.substring(0, controlValue.value.length - 1), 10);

  if (currentControlValue > SCALE_STEP) {
    let newControlValue = currentControlValue - SCALE_STEP;
    controlValue.value = newControlValue + '%';

    imagePreview.style.cssText += `transform: scale(0.${newControlValue})`;
  }
}

export {zoomIn, zoomOut};
