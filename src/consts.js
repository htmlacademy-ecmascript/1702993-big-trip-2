const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'air', 'check-in', 'slightseeing', 'restaurant'];

const getDefaultPoint = () => ({
  basePrice: 0,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: 0,
  isFavorite: false,
  offers: [],
  type: POINT_TYPES[0]
});

const SortType = {
  DATE: 'date',
  TIME: 'time',
  PRICE: 'price'
};

const HOURS_IN_DAY = 24;
const MILLISECONDS_IN_MINUTES = 1000;
const SECONDS_IN_MINUTES = 60;

export {POINT_TYPES, getDefaultPoint, HOURS_IN_DAY, MILLISECONDS_IN_MINUTES, SECONDS_IN_MINUTES, SortType};
