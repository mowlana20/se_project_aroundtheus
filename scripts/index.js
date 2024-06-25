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

const profileEditmodal = document.querySelector("#modal_one");
const addCardmodal = document.querySelector("#modal_adding-cards");
const profileEditBtn = document.querySelector("#profile__edit-button");
const addCardButtom = document.querySelector("#profile__add-button");
const modalProfileCloseBtn = profileEditmodal.querySelector("#modal__close");
const modalCardCloseBtn = addCardmodal.querySelector("#modal__card-close-btn");

const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__job");
const profileTitleInput = document.querySelector(".modal__input-name");
const profileJobInput = document.querySelector(".modal__input-job");
const profileFormElement = document.querySelector("#modal__profile-form");

const cardFormElement = document.querySelector("#modal__card-form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/*=============================================
=            functions                        =
=============================================*/

function closePopUp(modal) {
  modal.classList.remove("modal__opened");
}

function openPopUp(modal) {
  modal.classList.add("modal__opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEL = cardElement.querySelector(".card__image");
  const cardTitleEL = cardElement.querySelector(".card__title");
  const likeBtn = cardElement.querySelector(".card__like-button");
  const trashBtn = cardElement.querySelector(".card__trash-button");

  trashBtn.addEventListener("click", (event) => {
    event.target.closest(".card").remove();
  });

  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-button-active");
  });

  cardImageEL.src = cardData.link;
  cardImageEL.alt = cardData.name;
  cardTitleEL.textContent = cardData.name;
  return cardElement;
}

/*=============================================
=            EventHandlers                        =
=============================================*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopUp(profileEditmodal);
}

function handleCardAddSubmit(e) {
  e.preventDefault();
  closePopUp(addCardmodal);
}

/*=============================================
=            EventListener                        =
=============================================*/

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopUp(profileEditmodal);
});

modalProfileCloseBtn.addEventListener("click", () =>
  closePopUp(profileEditmodal)
);

modalCardCloseBtn.addEventListener("click", () => closePopUp(addCardmodal));

profileFormElement.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});

cardFormElement.addEventListener("submit", handleCardAddSubmit);

addCardButtom.addEventListener("click", () => openPopUp(addCardmodal));

// const likeBtns = document.querySelectorAll(".card__like-button");

// likeBtns.forEach((likeBtn) => {
//   likeBtn.addEventListener("click", () => {
//     likeBtn.classList.toggle("card__like-button-active");
//   });
// });
