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

// Buttons for opening modals
const profileEditBtn = document.querySelector("#profile__edit-button");
const addCardButton = document.querySelector("#profile__add-button");

// Profile and card input elements
const profileNameInput = document.querySelector(".modal__input-name");
const profileJobInput = document.querySelector(".modal__input-job");
const cardTitleInput = document.querySelector(".modal__input-title");
const cardUrlInput = document.querySelector(".modal__input-url");

// Handle image click to open preview
function handleImageClick(data) {
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
    popupEditProfile.formElement.reset();
  },
});

// Popup for adding new cards
const popupAddCard = new PopupWithForm({
  popupSelector: "#modal_adding-cards",
  handleFormSubmit: (formData) => {
    const cardData = { name: formData.title, link: formData.url };
    section.addItem(createCard(cardData));
    // cardListEl.prepend(createCard(cardData));
    cardFormValidator.disableBtn();

    popupAddCard.close();
    popupAddCard.formElement.reset();
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
