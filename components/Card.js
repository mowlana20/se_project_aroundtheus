export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _setEventListener() {
    console.log("1");
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeBtn;
      });

    // this._handleLikeBtn();
  }

  _handleLikeBtn() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button-active");
    console.log("2");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);

    this._setEventListener();

    return this._cardElement;
  }
}
