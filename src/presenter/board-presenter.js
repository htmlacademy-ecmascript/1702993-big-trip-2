import SortView from '../view/sort-view.js';
import StubPointsView from '../view/stub-points-view.js';
import EventListView from '../view/events-list-view.js';
import { render } from '../framework/render.js';
import { updateItem } from '../util.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #boardListComponent = new EventListView();
  #points = null;
  #pointPresenter = new Map();

  constructor({container, pointsModel, destinationsModel, offersModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#points = this.#pointsModel.points;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard = () => {
    const destinations = this.#destinationsModel.destinations;
    const offers = this.#offersModel.offers;
    const pointsContainer = this.#boardListComponent;

    render(new SortView(), this.#container);
    render(pointsContainer, this.#container);

    if (this.#points === 0) {
      render(new StubPointsView(), this.#container);
    } else {
      for (let i = 0; i < this.#points.length; i++) {
        const pointsPresenter = new PointPresenter({pointsContainer,
          destinations,
          offers,
          onClickFavoriteButton: this.#handleEventsChange,
          handleModeChange : this.#handleModeChange
        });
        this.#pointPresenter.set(this.#points[i].id, pointsPresenter);
        pointsPresenter.init(this.#points[i]);
      }
    }
  };

  #handleEventsChange = (updatedEvent) => {
    this.#points = updateItem(this.#points, updatedEvent);
    this.#pointPresenter.get(updatedEvent.id).init(updatedEvent);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((pointsPresenter) => pointsPresenter.resetView());
  };
}
