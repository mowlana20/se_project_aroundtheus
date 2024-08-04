export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
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
  }

  _handleTrashBtn() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    console.log(this._cardElement);

    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._trashBtn = this._cardElement.querySelector(".card__trash-button");

    console.log(this._likeBtn);

    this._setEventListener();

    return this._cardElement;
  }
}
