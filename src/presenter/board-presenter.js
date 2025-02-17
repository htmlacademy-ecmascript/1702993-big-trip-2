import SortView from '../view/sort-view.js';
import StubPointsView from '../view/stub-points-view.js';
import EventListView from '../view/events-list-view.js';
import { render, RenderPosition } from '../framework/render.js';
import { updateItem, sortByPrice, sortByTime} from '../util.js';
import PointPresenter from './point-presenter.js';
import { SortType } from '../consts.js';


export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #boardListComponent = new EventListView();
  #points = null;
  #pointPresenter = new Map();
  #sortComponent = null;
  #currentSortType = SortType.DATE;
  #sourcedBoardPoints = [];

  constructor({container, pointsModel, destinationsModel, offersModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#points = this.#pointsModel.points;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#sourcedBoardPoints = [...this.#pointsModel.points];
    render(new SortView({handleSortTypeChange: this.#handleSortTypeChange}), this.#container, RenderPosition.AFTERBEGIN);
    this.#renderBoard();
  }

  #renderBoard = () => {
    const destinations = this.#destinationsModel.destinations;
    const offers = this.#offersModel.offers;
    const pointsContainer = this.#boardListComponent;

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
      // this.#renderSort();
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType){
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderBoard();
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.TIME:
        this.#points.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
      default:
        this.#points = [...this.#sourcedBoardPoints];
    }
    this.#currentSortType = sortType;
  };

  // #renderSort() {
  //   this.#sortComponent = new SortView ({
  //     onSortTypeChange: this.#handleSortTypeChange
  //   });

  //   // render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  // }

  #handleEventsChange = (updatedEvent) => {
    this.#points = updateItem(this.#points, updatedEvent);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedEvent);
    this.#pointPresenter.get(updatedEvent.id).init(updatedEvent);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((pointsPresenter) => pointsPresenter.resetView());
  };
}
