import BoardPresenter from './presenter/board-presenter.js';
import FilterView from './view/filter-view.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destination-model.js';
import EventView from './view/events-list-view.js';
import {render} from './framework/render.js';


const siteEventsElement = document.querySelector('.trip-events');
const filterElement = document.querySelector('.trip-controls__filters');

render(new EventView(), siteEventsElement);
render(new FilterView(), filterElement);

const eventsList = document.querySelector('.trip-events__list');

const pointsModel = new PointsModel ();
pointsModel.init();
const offersModel = new OffersModel ();
offersModel.init();
const destinationsModel = new DestinationsModel ();
destinationsModel.init();

const boardPresenter = new BoardPresenter({container: eventsList, pointsModel, destinationsModel, offersModel});

boardPresenter.init();
