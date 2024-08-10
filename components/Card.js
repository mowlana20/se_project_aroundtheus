export default class Card {
  constructor(data, handleImageClick, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListener() {
    this._likeBtn.addEventListener("click", () => this._handleLikeBtn());

    this._trashBtn.addEventListener("click", () => this._handleTrashBtn());

    this._cardImageEL.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleLikeBtn() {
    this._likeBtn.classList.toggle("card__like-button-active");
    console.log("");
  }

  _handleTrashBtn() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    console.log(this._likeBtn);

    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImageEL = this._cardElement.querySelector(".card__image");
    this._cardTitleEL = this._cardElement.querySelector(".card__title");

    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._trashBtn = this._cardElement.querySelector(".card__trash-button");

    this._setEventListener();

    this._cardImageEL.src = this._link;
    this._cardImageEL.alt = this._name;
    this._cardTitleEL.textContent = this._name;

    return this._cardElement;
  }
}
