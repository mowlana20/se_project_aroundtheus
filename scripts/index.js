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
const previewImageModal = document.querySelector("#modal_image");
const profileEditBtn = document.querySelector("#profile__edit-button");
const addCardButtom = document.querySelector("#profile__add-button");
const modalProfileCloseBtn = profileEditmodal.querySelector("#modal__close");
const modalCardCloseBtn = addCardmodal.querySelector("#modal__close");
const modalPreviewCloseBtn = previewImageModal.querySelector("#modal__close");

const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__job");
const profileNameInput = document.querySelector(".modal__input-name");
const profileJobInput = document.querySelector(".modal__input-job");
const profileFormElement = document.querySelector("#modal__profile-form");

const cardFormElement = document.querySelector("#modal__card-form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardTitleInput = document.querySelector(".modal__input-title");
const cardUrlInput = document.querySelector(".modal__input-url");
/*=============================================
=            functions                        =
=============================================*/

const EscListener = (event) => {
  if (event.key === "Escape") {
    console.log(event.key);
    const modal = document.querySelector(".modal_opened");
    closePopUp(modal);
  }
};

function openProfileModal() {
  openPopUp(profileEditmodal);
}

const clickOutListener = (event) => {
  // console.log("hi");

  if (event.target.classList.contains("modal")) {
    console.log(true);
    const modal = document.querySelector(".modal_opened");
    closePopUp(modal);
  }
};

function openPopUp(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", EscListener);
  document.addEventListener("click", clickOutListener);
}

function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", EscListener);
  document.removeEventListener("click", clickOutListener);
}

/////////////////////////////////// working

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEL = cardElement.querySelector(".card__image");
  const cardTitleEL = cardElement.querySelector(".card__title");
  const likeBtn = cardElement.querySelector(".card__like-button");
  const trashBtn = cardElement.querySelector(".card__trash-button");
  const previewImage = previewImageModal.querySelector(".modal__image");
  const previewTitleEL = previewImageModal.querySelector(
    ".modal__card_image-title"
  );

  cardImageEL.addEventListener("click", () => {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewTitleEL.textContent = cardData.name;
    openPopUp(previewImageModal);
  });

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

function createCardObject() {
  return {
    name: cardTitleInput.value,
    link: cardUrlInput.value,
  };
}

/*=============================================
=            EventHandlers                        =
=============================================*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopUp(profileEditmodal);
}

function handleCardAddSubmit(e) {
  e.preventDefault();
  closePopUp(addCardmodal);
  const placeObject = createCardObject();
  const cardElement = getCardElement(placeObject);
  cardListEl.prepend(cardElement);

  document.getElementById("modal__card-form").reset();
}

/*=============================================
=            EventListener                        =
=============================================*/

profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileJob.textContent;
  openProfileModal();
});

modalCardCloseBtn.addEventListener("click", () => closePopUp(addCardmodal));

modalProfileCloseBtn.addEventListener("click", () =>
  closePopUp(profileEditmodal)
);

modalPreviewCloseBtn.addEventListener("click", () =>
  closePopUp(previewImageModal)
);

profileFormElement.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});

cardFormElement.addEventListener("submit", handleCardAddSubmit);

addCardButtom.addEventListener("click", () => openPopUp(addCardmodal));
