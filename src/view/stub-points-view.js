import AbstractView from '../framework/view/abstract-view';

function createStubPointsTemplate () {
  return (`<h2 class="visually-hidden">Trip events</h2>
          <p class="trip-events__msg">Click New Event to create your first point</p>`
  );
}


export default class StubPointsView extends AbstractView {
  get template() {
    return createStubPointsTemplate();
  }
}
