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

/* 
          Elements start
 */

const profileEditBtn = document.querySelector("#profile__edit-button");
const modalCloseBtn = document.querySelector("#modal__close-button");
const profileEditmodal = document.querySelector("#modal_one");
const profileTitle = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__job");
const profileTitleInput = document.querySelector(".modal__input-title");
const profileJobInput = document.querySelector(".modal__input-job");
// const profileModalSaveButton = document.querySelector(".js-modal-save-button");
const profileFormElement = document.querySelector("#modal__profile-form");

/* 
          Elements end
 */

function closePopUp() {
  profileEditmodal.classList.remove("modal__opened");
}

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileJobInput.value = profileJob.textContent;
  profileEditmodal.classList.add("modal__opened");
});

modalCloseBtn.addEventListener("click", () => {
  closePopUp();
});

profileFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopUp();
});
