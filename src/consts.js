export const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'air', 'check-in', 'slightseeing', 'restaurant'];

export const getDefaultPoint = () => ({
  basePrice: 0,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: 0,
  isFavorite: false,
  offers: [],
  type: POINT_TYPES[0]
});

export const HOURS_IN_DAY = 24;
export const MILLISECONDS_IN_MINUTES = 1000;
export const SECONDS_IN_MINUTES = 60;
