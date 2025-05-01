import Card from "../components/Card.js";
import Section from "../components/Section.js";
import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirmDelete from "../components/ConfirmDelete.js";
import PopupWithProfileImage from "../components/PopupWithProfileImage.js";
import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, options } from "../utils/constants";

// Initialize user information
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__job",
  profileImageSelector: ".profile__image",
});

// Form elements and validators
const profileFormElement = document.forms["modal__profile-form"];
const cardFormElement = document.forms["modal__card-form"];
const profileFormValidator = new FormValidator(options, profileFormElement);
const cardFormValidator = new FormValidator(options, cardFormElement);

const deleteCardFormElement = document.forms["modal__delete-card-form"];
const editProfileFormElement = document.forms["modal__profile-image"];
const deleteCardFormValidator = new FormValidator(
  options,
  deleteCardFormElement
);
const editProfileFormValidator = new FormValidator(
  options,
  editProfileFormElement
);

const popupWithImage = new PopupWithImage("#modal_image");
const userImage = document.querySelector(".profile__image");

// Initialize the profile image modal
const popupUpdateProfileImage = new PopupWithProfileImage({
  popupSelector: "#modal_profile-image",
  imageSelector: ".profile__image-container",
  handleFormSubmit: (formData) => {
    return api
      .updatingProfile({ profileImage: formData.profileImage })
      .then((updatedUserData) => {
        userInfo.setUserInfo(updatedUserData);
      })
      .catch((err) => {
        console.error(`Failed to update profile image: ${err}`);
      });
  },
});

popupUpdateProfileImage._setClickListener();

const popupConfirmDeletes = new PopupConfirmDelete({
  popupSelector: "#modal_delete-card",
  handleDeleteSubmit: (card) => {
    api
      .deleteCard(card.id)
      .then(() => {
        card.element.remove();
        popupConfirmDeletes.close();
      })
      .catch((err) => {
        console.error(`Failed to delete the card: ${err}`);
      });
  },
}); //??????????????????????????????

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "95098c46-93e7-4f0b-a6fc-0aca47be17cd",
    "Content-Type": "application/json",
  },
});
// uses api to get initial cards

api
  .getInitialCards()
  .then((result) => {
    section.renderItems(result);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

///////

// Fetch user info and set it on the page
api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({ name: userData.name, job: userData.about });
    userImage.src = userData.avatar;
  })
  .catch((err) => {
    console.error(`Failed to fetch user data: ${err}`);
  });

////////////////////////

// Enable validation for forms
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
popupWithImage.setEventListeners();

deleteCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

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
    return api
      .updateUserInfo({ userName: formData.name, about: formData.job })
      .then((updatedUserData) => {
        userInfo.setUserInfo({
          name: updatedUserData.name,
          job: updatedUserData.about,
          avatar: updatedUserData.avatar,
        });
      })
      .catch((err) => {
        console.error(`Failed to update user data: ${err}`);
      });
  },
});

// Popup for adding new cards old
// const popupAddCard = new PopupWithForm({
//   popupSelector: "#modal_adding-cards",
//   handleFormSubmit: (formData) => {
//     const cardData = { name: formData.title, link: formData.url };
//     renderCard(cardData);
//     cardFormValidator.disableBtn();
//     popupAddCard.close();
//     popupAddCard.formElement.reset();
//   },
// });

const popupAddCard = new PopupWithForm({
  popupSelector: "#modal_adding-cards",
  handleFormSubmit: (formData) => {
    return api
      .addNewCard({ locationName: formData.title, link: formData.url })
      .then((newCardData) => {
        renderCard(newCardData); // Add the newly created card to the UI
        cardFormValidator.disableBtn();
      })
      .catch((err) => {
        console.error(`Failed to add a new card: ${err}`);
      });
  },
});

function handleLikeClick(cardData, card) {
  if (cardData.isLiked === false) {
    api.likeCard(cardData._id).then((newCardData) => {
      card.updateLikeBtn(newCardData.isLiked);
    });
  } else {
    api.unlikeCard(cardData._id).then((newCardData) => {
      card.updateLikeBtn(newCardData.isLiked);
    });
  }
}

// Create and return a new card element
function createCard(item) {
  const cardElement = new Card(
    item,
    handleImageClick,
    "#card-template",
    handleDeleteClick,
    handleLikeClick
  );
  return cardElement.getView();
}

// Event listener for profile edit button old code
// profileEditBtn.addEventListener("click", () => {
//   const userData = userInfo.getUserInfo();
//   profileNameInput.value = userData.name;
//   profileJobInput.value = userData.job;
//   popupEditProfile.open();
// });

profileEditBtn.addEventListener("click", () => {
  api
    .getUserInfo()
    .then((userData) => {
      profileNameInput.value = userData.name;
      profileJobInput.value = userData.about;
      popupEditProfile.open();
    })
    .catch((err) => {
      console.error(`Failed to load user data for editing: ${err}`);
    });
});

// Render cards on the page using Section class
function renderCard(item) {
  const card = createCard(item);
  section.addItem(card);
}

// Initialize Section class to manage card rendering
const section = new Section({ renderer: renderCard }, ".cards__list");

// Event listener for add card button
addCardButton.addEventListener("click", () => popupAddCard.open());

function handleDeleteClick(card) {
  popupConfirmDeletes.open(card);
}
