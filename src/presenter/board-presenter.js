import SortView from '../view/sort-view.js';
import EditView from '../view/edit-form-view.js';
import PointView from '../view/events-point-view.js';
import { render, RenderPosition } from '../framework/render.js';


export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor({container, pointsModel, destinationsModel, offersModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

  }

  init() {
    const points = this.#pointsModel.points;
    const destinations = this.#destinationsModel.destinations;
    const offers = this.#offersModel.offers;

    render(new SortView(), this.#container, RenderPosition.BEFOREBEGIN);

    for (let i = 0; i < points.length; i++) {
      this.#renderPoint(points[i], destinations, offers);
      this.#renderEdit(points[i], destinations, offers);
    }
  }

  #renderPoint (points, destinations, offers) {
    const pointComponent = new PointView (points, destinations, offers);
    render(pointComponent, this.#container);
  }

  #renderEdit (points, destinations, offers) {
    const pointEdit = new EditView (points, destinations, offers);
    render(pointEdit, this.#container);
  }
}
