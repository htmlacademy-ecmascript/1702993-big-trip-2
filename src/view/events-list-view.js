import AbstractView from '../framework/view/abstract-view';

function createListTemplate() {
  return `<ul class="trip-events__list">
          </ul>`;
}
export default class EventView extends AbstractView {

  get template() {
    return createListTemplate();
  }

  // getElement() {
  //   if (!this.element) {
  //     this.element = createElement(this.getTemplate());
  //   }

  //   return this.element;
  // }

  // removeElement() {
  //   this.element = null;
  // }
}
