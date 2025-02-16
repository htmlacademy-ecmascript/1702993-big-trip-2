import dayjs from 'dayjs';
import { HOURS_IN_DAY, MILLISECONDS_IN_MINUTES, SECONDS_IN_MINUTES } from './consts';

const DATE_FORMAT = {
  monthDay: 'MMM D',
  yearsMonth: 'YYYY-MM-DD',
  hoursMin: 'h:mm'
};

function humanizeTaskDueDate(dueDate, value){
  return dueDate ? dayjs(dueDate).format(value) : '';
}

function getDuration (start, end) {
  const difference = dayjs(end).diff(start) / MILLISECONDS_IN_MINUTES;

  switch (difference) {
    case difference < SECONDS_IN_MINUTES:
      return dayjs(difference).format('mm[M]');

    case difference > SECONDS_IN_MINUTES && difference < SECONDS_IN_MINUTES * HOURS_IN_DAY:
      return dayjs(difference).format('HH[H] mm[M]');
    default:
      return dayjs(difference).format('DD[D] HH[H] mm[M]');
  }
}

function updateItem(items, updatedItem) {
  return items.map((item) => item.isFavorite === updatedItem.isFavorite ? updatedItem : item);
}

// Функция помещает задачи без даты в конце списка,
// возвращая нужный вес для колбэка sort
function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }
  if (dateA === null) {
    return 1;
  }
  if (dateB === null) {
    return -1;
  }
  return null;
}

function sortByPrice(eventA, eventB) {
  return eventA.basePrice - eventB.basePrice;
}

function sortByTime(eventA, eventB) {
  const eventADuration = getDuration(eventA);
  const eventBDuration = getDuration(eventB);

  return eventBDuration - eventADuration;
}

export {humanizeTaskDueDate, DATE_FORMAT, getDuration, updateItem, sortByTime, sortByPrice, getWeightForNullDate};
