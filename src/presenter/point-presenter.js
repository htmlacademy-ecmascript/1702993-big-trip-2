import EditView from '../view/edit-form-view.js';
import PointView from '../view/events-point-view.js';

import { remove, render, replace} from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #pointComponent = null;
  #editComponent = null;
  #newPointComponent = null;
  #newEditComponent = null;
  #point = null;
  #pointsContainer = null;
  #offers = null;
  #destinations = null;
  #onClickFavoriteButton = null;
  #onOpenEditForm = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({pointsContainer, destinations, offers, onClickFavoriteButton, handleModeChange}) {
    this.#pointsContainer = pointsContainer;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onClickFavoriteButton = onClickFavoriteButton;
    this.#handleModeChange = handleModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditComponent = this.#editComponent;

    this.#pointComponent = new PointView ({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onPointClick: this.#onPointClick,
      onClickFavoriteButton: this.#toggleFavoriteState
    });

    this.#editComponent = new EditView ({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditClick: this.#onEditClick
    });

    if (prevPointComponent === null || prevEditComponent === null) {
      render(this.#pointComponent, this.#pointsContainer.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #toggleFavoriteState = () => {
    this.#onClickFavoriteButton({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #onPointClick = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #onEditClick = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #replacePointToForm() {
    replace(this.#editComponent, this.#pointComponent);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#editComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };
}
