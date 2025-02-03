import { destinations } from '../mocks/destinations';

export default class DestinationModel {
  #destinations = null;

  constructor() {
    this.#destinations = [];
  }

  init() {
    this.#destinations = destinations;
  }

  get destinations() {
    return this.#destinations;
  }

  getDestinationById(id) {
    return this.#destinations.filter((item) => {
      item.id = id;
    });
  }

}
