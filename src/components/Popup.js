export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
    // this.setEventListeners(); // sets up the close button listener
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    // Close popup on close button click
    this._closeButton.addEventListener("click", () => this.close());

    // Close popup when clicking outside the popup content
    this._popupElement.addEventListener("click", (event) => {
      if (event.target === this._popupElement) {
        this.close();
      }
    });
  }
}
