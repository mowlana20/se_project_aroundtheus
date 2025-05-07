export default class Api {
  constructor(options) {
    // Initialize the API class with the base URL and headers
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  // Helper method to check the response from the server
  _cheackingResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // General method to make HTTP requests
  _request(endpoint, options) {
    return fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: this.headers,
    })
      .then(this._cheackingResponse)
      .catch((err) => {
        console.error(err); // Log any errors
      });
  }

  // Get the initial set of cards from the server
  getInitialCards() {
    return this._request("/cards", {
      method: "GET",
    });
  }

  // Fetch user info (name, about) from the server
  getUserInfo() {
    return this._request("/users/me", {
      method: "GET",
    });
  }

  // Update the user's profile info (name and about)
  updateUserInfo({ userName, about }) {
    return this._request("/users/me", {
      method: "PATCH",
      body: JSON.stringify({
        name: userName,
        about: about,
      }),
    });
  }

  // Add a new card with a name and image link
  addNewCard({ locationName, link }) {
    return this._request("/cards", {
      method: "POST",
      body: JSON.stringify({
        name: locationName,
        link: link,
      }),
    });
  }

  // Delete a specific card by its ID
  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  // Like a card by its ID
  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  // Remove a like from a card by its ID
  unlikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  // Update the user's avatar/profile image
  updatingProfile({ profileImage }) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({
        avatar: profileImage,
      }),
    });
  }
}