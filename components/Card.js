export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _setEventListener() {
    console.log("1");

    // this._likeBtn.addEventListener("click", this._handleLikeBtn);
    this._likeBtn.addEventListener("click", () => {
      this._likeBtn.classList.toggle("card__like-button-active");
    });

    this._trashBtn.addEventListener("click", this._handleTrashBtn);
    // this._handleLikeBtn();

    console.log(this._likeBtn.classList);
  }

  _handleLikeBtn() {
    this._likeBtn.classList.toggle("card__like-button-active");
    console.log("2");
  }

  _handleTrashBtn() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);

    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._trashBtn = this._cardElement.querySelector(".card__trash-button");

    console.log("2get view");

    this._setEventListener();

    return this._cardElement;
  }
}
