import { points } from '../mocks/points';

export default class PointsModel {
  #points = null;

  constructor() {
    this.#points = [];
  }

  init() {
    this.#points = points;
  }

  get points() {
    return this.#points;
  }
}
