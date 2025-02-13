import SortView from '../view/sort-view.js';
import StubPointsView from '../view/stub-points-view.js';
import EventListView from '../view/events-list-view.js';
import { render, replace } from '../framework/render.js';
import EditView from '../view/edit-form-view.js';
import PointView from '../view/events-point-view.js';
import { updateItem } from '../util.js';
import PointPresenter from './point-presenter.js';

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

  // #handlePointChange = (updatedElement) => {
  //   this.#pointsModel = updatedElement(this.#pointsModel, updatedElement);
  //   this.#renderBoard();
  // };

  #renderBoard () {
    // const container = this.#container;
    const points = this.#pointsModel.points;
    const destinations = this.#destinationsModel.destinations;
    const offers = this.#offersModel.offers;
    const pointsContainer = this.#boardListComponent;

    render(new SortView(), this.#container);
    render(pointsContainer, this.#container);

    if (points === 0) {
      render(new StubPointsView(), this.#container);
    } else {
      for (let i = 0; i < points.length; i++) {
        // this.#renderPoint(points[i], destinations, offers);
        const pointsPresenter = new PointPresenter({pointsContainer, destinations, offers});
        pointsPresenter.init(points[i]);
      }
    }
  }

  // #renderPoint (points, destinations, offers) {

  //   const escKeyDownHandler = (evt) => {
  //     if (evt.key === 'Escape') {
  //       evt.preventDefault();
  //       replaceFormToPoint();
  //       document.removeEventListener('keydown', escKeyDownHandler);
  //     }
  //   };

  //   const pointComponent = new PointView (points, destinations, offers, onPointClick);
  //   const pointEdit = new EditView (points, destinations, offers, onEditClick);

  //   function onFavoriteButtonClick (updatedElement) {
  //     this.#pointsModel = updatedElement(this.#pointsModel, updatedElement);
  //     this.#renderBoard();
  //     if (points.isFavorite === false) {
  //       points.isFavorite = true;
  //       console.log(points.isFavorite);
  //     } else {
  //       points.isFavorite = false;
  //       console.log(points.isFavorite);
  //     }

  //   }

  //   function onPointClick () {
  //     replacePointToForm();
  //     document.addEventListener('keydown', escKeyDownHandler);
  //   }

  //   function onEditClick () {
  //     replaceFormToPoint();
  //     document.removeEventListener('keydown', escKeyDownHandler);
  //   }

  //   function replacePointToForm() {
  //     replace(pointEdit, pointComponent);
  //   }
  //   function replaceFormToPoint() {
  //     replace(pointComponent, pointEdit);
  //   }

  //   // const handleModeChange = () => {

  //   // };

  //   // function resetView() {
  //   //   if (this.mode !== Mode.DEFAULT) {
  //   //     replaceFormToPoint();
  //   //   }
  //   // }

  //   render(pointComponent, this.#boardListComponent.element);
  // }
}
