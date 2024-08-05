export default class FormValidator {
  constructor(options, formElms) {
    this._options = options;
    this._formSelector = options.formSelector;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._formElms = formElms;
  }

  _hideInputError(this._formEl, inputEl, this._options){
    this._errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(this._inputErrorClass);
  this._errorMessageEl.textContent = "";
  this._errorMessageEl.classList.remove(this._errorClass);
  }

  _showInputError(this._formEl, inputEl, this._options){
   this._errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(this._inputErrorClass);
  this._errorMessageEl.textContent = inputEl.validationMessage;
  this._errorMessageEl.classList.add(this._errorClass);
  }


  _checkInputValitity(this._formEl, inputEl, this._options){
    if (!inputEl.validity.valid) {
        return _showInputError(this._formEl, inputEl, this._options);
      }
    
      _hideInputError(this._formEl, inputEl, this._options);
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }
  
  _disableBtn(submitBtn, inactiveButtonClass) {
    submitBtn.classList.add(inactiveButtonClass);
    submitBtn.disabled = true;
  }
  
  _enableBtn(submitBtn, inactiveButtonClass) {
    submitBtn.classList.remove(inactiveButtonClass);
    submitBtn.disabled = false;
  }

  _toggleButtonState(this._inputEls, this._submitBtn, this._options){
    if (_hasInvalidInput(inputEls)) {
        return _disableBtn(submitBtn, inactiveButtonClass);
      }
    
      _enableBtn(submitBtn, inactiveButtonClass);
  }

  _setEventListeners(this._formEl, this._options) {
    this._inputEls = [...this._formEl.querySelectorAll(inputSelector)];
    this._submitBtn = this._formEl.querySelector(submitButtonSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
 
        _checkInputValitity(this._formEl, inputEl, this._options);
        _toggleButtonState(this._inputEls, this._submitBtn, this._options);
      });
    });
  }

  enableValidation() {
    //question about formEl
    this._formEls.forEach((formEl) => {
      formEl.addEventListener("submit", (e) => {
        e.preventDefault();
      });

      _setEventListeners(this._formEl, this._options);
    });
  }
}
