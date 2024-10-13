export default class Card {
  constructor(data, handleImageClick, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListener() {
    // Like button click handler
    this._likeBtn.addEventListener("click", () => this._handleLikeBtn());

    // Trash button click handler
    this._trashBtn.addEventListener("click", () => this._handleTrashBtn());

    // Image click handler
    this._cardImageEL.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleLikeBtn() {
    // Toggle like button state
    this._likeBtn.classList.toggle("card__like-button-active");
  }

  _handleTrashBtn() {
    // Remove card from the DOM
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    // Clone the card template and set up elements
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardImageEL = this._cardElement.querySelector(".card__image");
    this._cardTitleEL = this._cardElement.querySelector(".card__title");
    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._trashBtn = this._cardElement.querySelector(".card__trash-button");

    this._setEventListener();

    // Set image and title
    this._cardImageEL.src = this._link;
    this._cardImageEL.alt = this._name;
    this._cardTitleEL.textContent = this._name;

    return this._cardElement;
  }
}
