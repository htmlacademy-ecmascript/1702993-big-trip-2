import { offers } from '../mocks/offers';

export default class OffersModel {
  constructor() {
    this.offers = [];
  }

  init() {
    this.offers = offers;
  }

  getOffers() {
    return this.offers;
  }


  getOffersByType(type) {
    return this.offers.filter((item) => {
      item.type = type;
    });
  }
}
