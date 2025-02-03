import { offers } from '../mocks/offers';

export default class OffersModel {
  #offers = null;

  constructor() {
    this.#offers = [];
  }

  init() {
    this.#offers = offers;
  }

  get offers() {
    return this.#offers;
  }


  getOffersByType(type) {
    return this.#offers.filter((item) => {
      item.type = type;
    });
  }
}
