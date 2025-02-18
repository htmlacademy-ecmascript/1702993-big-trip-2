import AbstractView from '../framework/view/abstract-view.js';
import { humanizeTaskDueDate, getDuration, DATE_FORMAT } from '../util.js';

const createPointTemplate = (point, destinations, offers) => {
  const {basePrice, isFavorite, dateFrom, dateTo, type} = point;
  const typeOffers = offers.find((off) => off.type === point.type).offers;
  const pointOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));
  const pointDestination = destinations.find((dest) => dest.id === point.destination);

  return `<li class="trip-events__item">
              <div class="event">
              <time class="event__date" datetime=${humanizeTaskDueDate(dateFrom, DATE_FORMAT.monthDay)}>${humanizeTaskDueDate(dateFrom, DATE_FORMAT.monthDay)}</time></time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${pointDestination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime=${humanizeTaskDueDate(dateFrom, DATE_FORMAT.hoursMin)}>${humanizeTaskDueDate(dateFrom, DATE_FORMAT.hoursMin)}</time></time>
                    &mdash;
                    <time class="event__end-time" datetime=${humanizeTaskDueDate(dateTo, DATE_FORMAT.hoursMin)}>${humanizeTaskDueDate(dateTo, DATE_FORMAT.hoursMin)}</time>
                  </p>
                  <p class="event__duration">${getDuration(dateFrom, dateTo)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                ${pointOffers.map((offer) => (
    `<li class="event__offer">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                </li>`
  )).join('')}

                </ul>
                <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''} " type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
          </li>`;
};

export default class PointView extends AbstractView {
  #handleClick = null;
  #onClickFavoriteButton = null;

  constructor({point, destinations, offers, onPointClick, onClickFavoriteButton}) {
    super();
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
    this.#handleClick = onPointClick;
    this.#onClickFavoriteButton = onClickFavoriteButton;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#onClickFavoriteButtonHandler);
  }

  get template() {
    return createPointTemplate(this.point, this.destinations, this.offers);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

  #onClickFavoriteButtonHandler = () => {
    this.#onClickFavoriteButton();
  };
}
