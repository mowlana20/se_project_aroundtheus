import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this.formElement = this._popupElement.querySelector(".modal__form");
    this._inputList = Array.from(
      this.formElement.querySelectorAll(".modal__input")
    );
    this._submitButton = this.formElement.querySelector(".modal__save-button");
    this._submitButtonText = this._submitButton.textContent;
    this.setEventListeners();
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  renderLoading(isLoading) {
    this._submitButton.textContent = isLoading
      ? "Saving..."
      : this._submitButtonText;
  }

  close() {
    super.close();
    this.formElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this.renderLoading(true);

      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close())
        .catch((err) => console.error(err))
        .finally(() => {
          this.renderLoading(false);
        });
    });
  }
}
