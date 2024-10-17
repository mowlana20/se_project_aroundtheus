import Card from "../components/Card.js";
import Section from "../components/Section.js";
import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, options } from "../utils/constants";

// Initialize user information
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__job",
});

// Form elements and validators
const profileFormElement = document.forms["modal__profile-form"];
const cardFormElement = document.forms["modal__card-form"];
const profileFormValidator = new FormValidator(options, profileFormElement);
const cardFormValidator = new FormValidator(options, cardFormElement);
const popupWithImage = new PopupWithImage("#modal_image");

// Enable validation for forms
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
popupWithImage.setEventListeners();

// Modal elements for different functionalities
const profileEditModal = document.querySelector("#modal_one");
const addCardModal = document.querySelector("#modal_adding-cards");
const previewImageModal = document.querySelector("#modal_image");

// Preview image elements
const previewImage = previewImageModal.querySelector(".modal__image");
const previewTitleEL = previewImageModal.querySelector(
  ".modal__card_image-title"
);

// Buttons for opening modals
const profileEditBtn = document.querySelector("#profile__edit-button");
const addCardButton = document.querySelector("#profile__add-button");

// Profile and card input elements
const profileNameInput = document.querySelector(".modal__input-name");
const profileJobInput = document.querySelector(".modal__input-job");
const cardTitleInput = document.querySelector(".modal__input-title");
const cardUrlInput = document.querySelector(".modal__input-url");

// Card container element
const cardListEl = document.querySelector(".cards__list");

// Listeners for escape key and click outside modal to close it
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

// Functions to open and close modals
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

// Handle image click to open preview
function handleImageClick({ link, name }) {
  const data = { link, name };
  popupWithImage.open(data);
}

// Create card object from input values
function createCardObject() {
  return {
    name: cardTitleInput.value,
    link: cardUrlInput.value,
  };
}

// Popup for editing profile
const popupEditProfile = new PopupWithForm({
  popupSelector: "#modal_one",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    popupEditProfile.close();
  },
});

// Popup for adding new cards
const popupAddCard = new PopupWithForm({
  popupSelector: "#modal_adding-cards",
  handleFormSubmit: (formData) => {
    const cardData = { name: formData.title, link: formData.url };
    cardListEl.prepend(createCard(cardData));
    cardFormValidator.disableBtn();
    popupAddCard.close();
  },
});

// Create and return a new card element
function createCard(item) {
  const cardElement = new Card(item, handleImageClick, "#card-template");
  return cardElement.getView();
}

// Event listener for profile edit button
profileEditBtn.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name;
  profileJobInput.value = userData.job;
  popupEditProfile.open();
});

// Add event listeners for close buttons in all modals
const closeButtons = document.querySelectorAll(".modal__close-button");
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopUp(popup));
});

// Render cards on the page using Section class
function renderCard(item) {
  const card = createCard(item);
  section.addItem(card);
}

// Initialize Section class to manage card rendering
const section = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list"
);
section.renderItems();

// Event listener for add card button
addCardButton.addEventListener("click", () => popupAddCard.open());
