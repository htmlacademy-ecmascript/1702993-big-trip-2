import SortView from '../view/sort-view.js';
import EditView from '../view/edit-form-view.js';
import PointView from '../view/events-point-view.js';
import StubPointsView from '../view/stub-points-view.js';
import EventListView from '../view/events-list-view.js';

import { render, replace} from '../framework/render.js';


export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #boardListComponent = new EventListView();

  constructor({container, pointsModel, destinationsModel, offersModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard () {
    const points = this.#pointsModel.points;
    const destinations = this.#destinationsModel.destinations;
    const offers = this.#offersModel.offers;

    render(new SortView(), this.#container);
    render(this.#boardListComponent, this.#container);

    if (points === 0) {
      render(new StubPointsView(), this.#container);
    } else {
      for (let i = 0; i < points.length; i++) {
        this.#renderPoint(points[i], destinations, offers);
      }
    }
  }

  #renderPoint (points, destinations, offers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView (points, destinations, offers, onPointClick);
    const pointEdit = new EditView (points, destinations, offers, onEditClick);

    function onPointClick () {
      replacePointToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    }

    function onEditClick () {
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    function replacePointToForm() {
      replace(pointEdit, pointComponent);
    }
    function replaceFormToPoint() {
      replace(pointComponent, pointEdit);
    }

    render(pointComponent, this.#boardListComponent.element);
  }
}
