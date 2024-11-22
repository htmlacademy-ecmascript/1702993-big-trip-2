import NewFilter from "./view/filter";
import NewSort from "./view/sort";
import NewForm from "./view/form.js";
import {render} from "./render.js";

const filterContainer = document.querySelector('.trip-controls__filters');
const sortContainer = document.querySelector('.trip-events');
const formContanier = document.querySelector('.trip-events');
const editContanier = document.querySelector('.trip-events');

render(new NewFilter(), filterContainer);
render(new NewSort(), sortContainer);
render(new NewForm(), sortContainer);