import { points } from '../mocks/points';

export default class PointsModel {
  constructor() {
    this.points = [];
  }

  init() {
    this.points = points;
  }

  getPoints() {
    return this.points;
  }
}
