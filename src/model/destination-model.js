import { destinations } from '../mocks/destinations';

export default class DestinationModel {
  constructor() {
    this.destinations = [];
  }

  init() {
    this.destinations = destinations;
  }

  getDestinations() {
    return this.destinations;
  }

  getDestinationById(id) {
    return this.destinations.filter((item) => {
      item.id = id;
    });
  }

}
