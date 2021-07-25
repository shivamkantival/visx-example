import dayjs from 'dayjs';
import { fill, map } from 'lodash';

export function initArrayWithEpochForNDaysInPast(
  endDateEpoch: number,
  numberOfDays: number
): Array<number> {
  const startDate = dayjs(endDateEpoch)
    .subtract(numberOfDays - 1, 'days')
    .startOf('day');

  return map<number, number>(fill(new Array(numberOfDays), 0), (_, index) => {
    return startDate.add(index, 'd').startOf('day').valueOf();
  });
}
