export default class FormValidator {
  constructor(options, formEl) {
    // Store the options and form element references.
    this._options = options;
    this._formSelector = options.formSelector;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._formEl = formEl;
  }

  // Hide the error message and remove error styles from the input.
  _hideInputError(inputEl) {
    this._errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    this._errorMessageEl.textContent = "";
    this._errorMessageEl.classList.remove(this._errorClass);
  }

  // Show the error message and apply error styles to the input.
  _showInputError(inputEl) {
    this._errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    this._errorMessageEl.textContent = inputEl.validationMessage;
    this._errorMessageEl.classList.add(this._errorClass);
  }

  // Check if the input value is valid and show or hide error messages accordingly.
  _checkInputValitity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }

  // Check if there are any invalid inputs in the form.
  _hasInvalidInput() {
    return !this._inputEls.every((inputEl) => inputEl.validity.valid);
  }

  // Disable the submit button by adding the inactive class and setting the disabled property.
  _disableBtn() {
    this._submitBtn.classList.add(this._inactiveButtonClass);
    this._submitBtn.disabled = true;
  }

  // Enable the submit button by removing the inactive class and clearing the disabled property.
  _enableBtn() {
    this._submitBtn.classList.remove(this._inactiveButtonClass);
    this._submitBtn.disabled = false;
  }

  // Toggle the submit button state based on the form's validity.
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      return this._disableBtn();
    }
    this._enableBtn();
  }

  // Set up event listeners for the form inputs to validate on the fly.
  _setEventListeners() {
    this._inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
    this._submitBtn = this._formEl.querySelector(this._submitButtonSelector);

    // For each input element, listen for changes and validate the input.
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValitity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  // Initialize form validation by preventing default form submission and setting up listeners.
  enableValidation() {
    console.log(this._formEl);

    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}

//////////////////////////////////////

/*

const closeButtons = document.querySelectorAll('.modal__close');

closeButtons.forEach((button) => {
  const popup = button.closest('.modal');
  button.addEventListener('click', () => closePopup(popup));
});

*/

///////////////////////////
