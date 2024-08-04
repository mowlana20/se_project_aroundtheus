export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImageEL = this._cardElement.querySelector(".card__image");
    this._cardTitleEL = this._cardElement.querySelector(".card__title");

    this._previewImage = this._cardElement.querySelector(".modal__image");
    this._previewTitleEL = this._cardElement.querySelector(
      ".modal__card_image-title"
    );

    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._trashBtn = this._cardElement.querySelector(".card__trash-button");
  }

  _setEventListener() {
    // this._likeBtn.addEventListener("click", this._handleLikeBtn);
    this._likeBtn.addEventListener("click", () => {
      this._likeBtn.classList.toggle("card__like-button-active");
    });

    this._trashBtn.addEventListener("click", this._handleTrashBtn);
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

    this._setEventListener();

    this._cardImageEL.src = this._link;
    this._cardImageEL.alt = this._name;
    this._cardTitleEL.textContent = this._name;

    return this._cardElement;
  }
}
