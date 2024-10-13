import Card from "../components/Card.js";
import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";

const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const formEls = [...document.querySelectorAll(options.formSelector)];
const profileFormElement = document.forms["modal__profile-form"];
const cardFormElement = document.forms["modal__card-form"];

const profileFormValidator = new FormValidator(options, profileFormElement);
const cardFormValidator = new FormValidator(options, cardFormElement);
const popupWithImage = new PopupWithImage("#modal_image");

// Enable validation
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

popupWithImage.setEventListeners();

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Modal elements
const profileEditModal = document.querySelector("#modal_one");
const addCardModal = document.querySelector("#modal_adding-cards");
const previewImageModal = document.querySelector("#modal_image");

const previewImage = previewImageModal.querySelector(".modal__image");
const previewTitleEL = previewImageModal.querySelector(
  ".modal__card_image-title"
);

const profileEditBtn = document.querySelector("#profile__edit-button");
const addCardButton = document.querySelector("#profile__add-button");
const modalProfileCloseBtn = profileEditModal.querySelector("#modal__close");
const modalCardCloseBtn = addCardModal.querySelector("#modal__close");
const modalPreviewCloseBtn = previewImageModal.querySelector("#modal__close");

const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__job");
const profileNameInput = document.querySelector(".modal__input-name");
const profileJobInput = document.querySelector(".modal__input-job");

const cardListEl = document.querySelector(".cards__list");
const cardTitleInput = document.querySelector(".modal__input-title");
const cardUrlInput = document.querySelector(".modal__input-url");

// Utility functions
const escListener = (event) => {
  if (event.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closePopUp(modal);
  }
};

const clickOutListener = (event) => {
  if (event.target.classList.contains("modal")) {
    closePopUp(event.target);
  }
};

function openPopUp(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", escListener);
  document.addEventListener("click", clickOutListener);
}

function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", escListener);
  document.removeEventListener("click", clickOutListener);
}

// Handle image click for preview
function handleImageClick({ link, name }) {
  const data = { link, name };
  popupWithImage.open(data);
}

// Create a card object from input values
function createCardObject() {
  return {
    name: cardTitleInput.value,
    link: cardUrlInput.value,
  };
}

// Event handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopUp(profileEditModal);
}

// Create and return a card element
function createCard(item) {
  const cardElement = new Card(item, handleImageClick, "#card-template");
  return cardElement.getView();
}

function handleCardAddSubmit(e) {
  e.preventDefault();
  closePopUp(addCardModal);
  const placeObject = createCardObject();
  cardListEl.prepend(createCard(placeObject));
  cardFormElement.reset();
  cardFormValidator.disableBtn();
}

// Event listeners
profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopUp(profileEditModal);
});

const closeButtons = document.querySelectorAll(".modal__close-button");

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopUp(popup));
});

/*
modalCardCloseBtn.addEventListener("click", () => closePopUp(addCardModal));
modalProfileCloseBtn.addEventListener("click", () =>
  closePopUp(profileEditModal)
);
modalPreviewCloseBtn.addEventListener("click", () =>
  closePopUp(previewImageModal)
);

*/

profileFormElement.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  cardListEl.prepend(createCard(cardData));
});

cardFormElement.addEventListener("submit", handleCardAddSubmit);
addCardButton.addEventListener("click", () => openPopUp(addCardModal));
