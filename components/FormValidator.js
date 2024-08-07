export default class FormValidator {
  constructor(options, formEls) {
    this._options = options;
    this._formSelector = options.formSelector;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._formEls = formEls;
  }

  _hideInputError(inputEl, formEl) {
    this._errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    this._errorMessageEl.textContent = "";
    this._errorMessageEl.classList.remove(this._errorClass);
  }
  //end of branch

  _showInputError(formEl, inputEl) {
    this._errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    this._errorMessageEl.textContent = inputEl.validationMessage;
    this._errorMessageEl.classList.add(this._errorClass);
  }
  //end of branch

  _checkInputValitity(formEl, inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(formEl, inputEl);
    }

    this._hideInputError(inputEl, formEl);
  }

  _hasInvalidInput() {
    return !this._inputEls.every((inputEl) => inputEl.validity.valid);
  }
  //end of branch

  _disableBtn() {
    this._submitBtn.classList.add(this._inactiveButtonClass);
    this._submitBtn.disabled = true;
  }
  //end of branch

  _enableBtn() {
    this._submitBtn.classList.remove(this._inactiveButtonClass);
    this._submitBtn.disabled = false;
  }
  //end of branch

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      return this._disableBtn();
    }

    this._enableBtn();
  }

  _setEventListeners(formEl) {
    this._inputEls = [...formEl.querySelectorAll(this._inputSelector)];
    this._submitBtn = formEl.querySelector(this._submitButtonSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValitity(formEl, inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    //question about formEl
    this._formEls.forEach((formEl) => {
      formEl.addEventListener("submit", (e) => {
        e.preventDefault();
      });

      this._setEventListeners(formEl);
    });
  }
}
