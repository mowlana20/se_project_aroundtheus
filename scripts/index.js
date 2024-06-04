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

/*=============================================
=            Elements start                   =
=============================================*/

const profileEditBtn = document.querySelector("#profile__edit-button");
const modalCloseBtn = document.querySelector("#modal__close-button");
const profileEditmodal = document.querySelector("#modal_one");
const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__job");
const profileTitleInput = document.querySelector(".modal__input-title");
const profileJobInput = document.querySelector(".modal__input-job");
// const profileModalSaveButton = document.querySelector(".js-modal-save-button");
const profileFormElement = document.querySelector("#modal__profile-form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/*=============================================
=            functions                        =
=============================================*/

function closePopUp() {
  profileEditmodal.classList.remove("modal__opened");
}

function getCardElement(cardData) {
  // clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  // access the card title and image and store them in variables
  const cardImageEL = cardElement.querySelector(".card__image");
  const cardTitleEL = cardElement.querySelector(".card__title");

  // set the path to the image to the link field of the object
  cardImageEL.src = cardData.link;
  // set the image alt text to the name field of the object
  cardImageEL.alt = cardData.name;
  // set the card title to the name field of the object, too
  cardTitleEL.textContent = cardData.name;
  // return the ready HTML element with the filled-in data
  return cardElement;
}

/*=============================================
=            EventHandlers                        =
=============================================*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopUp();
}

/*=============================================
=            EventListener                        =
=============================================*/

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileJobInput.value = profileJob.textContent;
  profileEditmodal.classList.add("modal__opened");
});

modalCloseBtn.addEventListener("click", closePopUp);

profileFormElement.addEventListener("submit", handleProfileEditSubmit);

for (let i = 0; i < initialCards.length; i++) {
  // const card = initialCards[i];
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
