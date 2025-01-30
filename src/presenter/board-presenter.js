import SortView from '../view/sort-view.js';
// import CreateView from '../view/creating-form-view.js';
import EditView from '../view/edit-form-view.js';
// import EventView from '../view/events-list-view.js';
import PointView from '../view/events-point-view.js';
// import { render } from '../render.js';
// import { RenderPosition } from '../render.js';
import { render, RenderPosition } from '../framework/render.js';
// import { getDefaultPoint } from '../consts.js';


export default class BoardPresenter {
  constructor({container, pointsModel, destinationsModel, offersModel}) {
    this.container = container;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;

    // this.eventViewComponent = new EventView();
    // this.editorFormComponent = new EditView();
  }

  init() {
    const points = this.pointsModel.getPoints();
    const destinations = this.destinationsModel.getDestinations();
    const offers = this.offersModel.getOffers();

    render(new SortView(), this.container, RenderPosition.BEFOREBEGIN);
    // render(this.editComponent, this.container);
    // render(new CreateView(getDefaultPoint(), destinations, offers), this.editorFormComponent.element);
    render(new EditView(points[2], destinations, offers), this.container, RenderPosition.BEFOREBEGIN);
    for (const point of points) {
      render(new PointView(point, destinations, offers), this.container);
    }
  }
}
