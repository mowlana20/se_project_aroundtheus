import Popup from "./Popup.js";

export default class PopupWithProfileImage extends Popup {
  constructor({ popupSelector, imageSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._imageElement = document.querySelector(imageSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector("form");
    this._inputElement = this._formElement.querySelector(".modal__input");
  }

  _setClickListener() {
    super.setEventListeners();
    this._imageElement.addEventListener("click", () => this.open());

    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit({ profileImage: this._inputElement.value });
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
