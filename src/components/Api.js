export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
    .then(this._cheackingResponse)
    .catch((err) => {
      console.error(err);
    });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(this._cheackingResponse)
    .catch((err) => {
      console.error(err);
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
    }).then(this._cheackingResponse)
    .catch((err) => {
      console.error(err);
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
    }).then(this._cheackingResponse)
    .catch((err) => {
      console.error(err);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._cheackingResponse)
    .catch((err) => {
      console.error(err);
    });
  }

  likeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    }).then(this._cheackingResponse)
    .catch((err) => {
      console.error(err);
    });
  }

  unlikeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._cheackingResponse)
    .catch((err) => {
      console.error(err);
    });
  }

  updatingProfile({ profileImage }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: profileImage,
      }),
    }).then(this._cheackingResponse)
    .catch((err) => {
      console.error(err);
    });
  }


  _cheackingResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

}
