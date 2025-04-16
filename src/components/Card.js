export default class Card {
  constructor(
    data,
    handleImageClick,
    cardSelector,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._handleLikeClick = handleLikeClick;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _setEventListener() {
    // Like button click handler
    this._likeBtn.addEventListener("click", () =>
      this._handleLikeClick({ _id: this._id, isLiked: this._isLiked }, this)
    );

    // Trash button click handler
    this._trashBtn.addEventListener("click", () => {
      this._handleDeleteClick({ id: this._id, element: this._cardElement });
    });

    // _handleTrashBtn() {
    //   // Remove card from the DOM
    //   this._cardElement.remove();
    //   this._cardElement = null;
    // }
    // Image click handler
    this._cardImageEL.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  updateLikeBtn(isLiked) {
    // Toggle like button state
    if (isLiked === false) {
      this._likeBtn.classList.remove("card__like-button-active");
    } else {
      this._likeBtn.classList.add("card__like-button-active");
    }
    this._isLiked = isLiked;
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

    if (this._isLiked === true) {
      this._likeBtn.classList.add("card__like-button-active");
    }

    return this._cardElement;
  }
}
