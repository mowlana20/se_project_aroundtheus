export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error:${res.status}`);
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error:${res.status}`);
    });
  }

  updateUserInfo({ userName, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: userName,
        about: about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addNewCard({ locationName, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: locationName,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  likeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  unlikeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updatingProfile({ profileImage }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: profileImage,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // other methods for working with the API
}

// updatingProfile(){}

// updateUserInfo({ userName, about }) {
//   return fetch(`${this.baseUrl}/users/me`, {
//     method: "PATCH",
//     headers: this.headers,
//     body: JSON.stringify({
//       name: userName,
//       about: about,
//     }),
//   }).then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Error: ${res.status}`);
//   });
// }

// fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
//   method: "PATCH",
//   headers: {
//     authorization: "7cae60c4-2bcd-456d-8f4f-c19671a2e101",
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     name: "Marie Skłodowska Curie",
//     about: "Physicist and Chemist",
//   }),
// });

/////////////////////

// fetch("https://around-api.en.tripleten-services.com/v1/cards", {
//   method: "POST",
//   headers: {
//     authorization: "7cae60c4-2bcd-456d-8f4f-c19671a2e101",
//     "Content-Type": "application/json", // Specifies the format of the request body
//   },
//   body: JSON.stringify({
//     isLiked: false,

//     name: "Bald Mountains",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
//     createdAt: "2023-07-05T12:16:42.240Z",
//   }),
// })
//   .then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Error: ${res.status}`);
//   })
//   .then((data) => {
//     console.log(data); // Handle the successful response
//   })
//   .catch((err) => {
//     console.error(err); // Handle any errors
//   });

/////////////////////
