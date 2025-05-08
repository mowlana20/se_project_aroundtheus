import Popup from "./Popup.js";

export default class PopupConfirmDelete extends Popup {
  constructor({ popupSelector, handleDeleteSubmit }) {
    super({ popupSelector });
    this.formElement = this._popupElement.querySelector(".modal__form");
    this._handleDeleteSubmit = handleDeleteSubmit;
    this.setEventListeners();
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteSubmit(this._card);
    });
  }
}
