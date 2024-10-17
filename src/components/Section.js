// Section.js
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // Array of items to render
    this._renderer = renderer; // Function to render a single item
    this._container = document.querySelector(containerSelector); // Container for the elements
  }

  // Method to render all items
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item); // Call renderer function for each item
    });
  }

  // Method to add a single DOM element to the container
  addItem(element) {
    this._container.prepend(element); // Add element to the top of the container
  }
}
