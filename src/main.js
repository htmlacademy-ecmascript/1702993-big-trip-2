import BoardPresenter from './presenter/board-presenter.js';
import FilterView from './view/filter.js';
import {render} from './render.js';

const siteEventsElement = document.querySelector('.trip-events');
const filterElement = document.querySelector('.trip-controls__filters');
const boardPresenter = new BoardPresenter({container: siteEventsElement});

render(new FilterView(), filterElement);

boardPresenter.init();
