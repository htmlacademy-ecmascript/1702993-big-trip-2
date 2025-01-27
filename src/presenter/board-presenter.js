import SortView from '../view/sort-view.js';
import CreateView from '../view/creating-form-view.js';
import EditView from '../view/edit-form-view.js';
import EventView from '../view/events-list-view.js';
import PointView from '../view/events-point-view.js';
import { render } from '../render.js';
import { RenderPosition } from '../render.js';
import { getDefaultPoint } from '../consts.js';


export default class BoardPresenter {
  constructor({container, pointsModel, destinationsModel, offersModel}) {
    this.container = container;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;

    this.editComponent = new EventView();
  }

  init() {
    const points = this.pointsModel.getPoints();
    const destinations = this.destinationsModel.getDestinations();
    const offers = this.offersModel.getOffers();

    render(new SortView(), this.container);
    render(this.editComponent, this.container);
    render(new CreateView(getDefaultPoint(), destinations, offers), this.editComponent.getElement());
    render(new EditView(points[2], destinations, offers), this.editComponent.getElement(), RenderPosition.BEFOREBEGIN);
    // console.log(points.length)
    console.log(offers)
    for (const point of points) {
      render(new PointView(point, destinations, offers), this.editComponent.getElement());
      // console.log('создаю')
    }
  }
}
