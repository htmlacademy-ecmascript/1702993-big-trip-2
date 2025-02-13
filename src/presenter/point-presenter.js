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
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({pointsContainer, destinations, offers}) {
    this.#pointsContainer = pointsContainer;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditComponent = this.#editComponent;

    this.#pointComponent = new PointView ({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onPointClick: this.#onPointClick
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

    // this.#renderPoint(this.#point, this.#destinations, this.#offers);

    remove(prevPointComponent);
    remove(prevEditComponent);
  }

  #onPointClick = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #onEditClick = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
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
