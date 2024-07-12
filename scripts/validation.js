// enabling validation by calling enableValidation()
// pass all the settings on call

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  // inputEl.id shows the id of the input thats targeted
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValitity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }

  hideInputError(formEl, inputEl, options);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function disableBtn(submitBtn, inactiveButtonClass) {
  submitBtn.classList.add(inactiveButtonClass);
  submitBtn.disabled = true;
}

function enableBtn(submitBtn, inactiveButtonClass) {
  submitBtn.classList.remove(inactiveButtonClass);
  submitBtn.disabled = false;
}

function toggleButtonState(inputEls, submitBtn, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    return disableBtn(submitBtn, inactiveButtonClass);
  }

  enableBtn(submitBtn, inactiveButtonClass);
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitBtn = formEl.querySelector(".modal__button");
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      //learning the diffenet section
      //   console.log(input);
      //   console.log(inputEl);
      //   console.dir(inputEl);
      //   console.dir(inputEl.validity);
      //   console.dir(inputEl.validity.valid);
      //   console.log(inputEl.validationMessage);
      checkInputValitity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitBtn, options);
    });
  });
}

function enableValidation(options) {
  const { formSelector } = options;
  const formEls = [...document.querySelectorAll(formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
  });
}

enableValidation(config);
