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
      render(new PointView(points[i], destinations, offers), this.#container);
      render(new EditView(points[i], destinations, offers), this.#container);
    }
  }
}
