import SortView from '../view/sort.js';
import EditView from '../view/creating-form.js';
import EventView from '../view/events-list.js';
import PointView from '../view/events-point.js';
import { render } from '../render.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  editComponent = new EventView();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(this.sortComponent, this.container);
    render(this.editComponent, this.container);
    render(new EditView(), this.editComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.editComponent.getElement());
    }
  }
}
