import { flow, groupBy, map } from 'lodash';
import {
  LineGraphDataInterface,
  LineGraphSingularData,
} from 'components/graphsLibrary/LineGraph/typeDefs';
import { initArrayWithEpochForNDaysInPast } from 'utils/dateTime';
import dayjs from 'dayjs';

export function getDistributionDataForLineGraphByDay<DataType>(
  allData: Array<DataType>,
  params: {
    numberOfDaysToCover?: number;
    endDateEpoch: number;
    epochGetter: (data: DataType) => number;
    key: string;
  }
): Array<LineGraphSingularData> {
  const { numberOfDaysToCover = 30, endDateEpoch, epochGetter, key } = params;

  const dataGroupedByCreationDay = groupBy<DataType>(allData, data =>
    dayjs(epochGetter(data)).startOf('d').valueOf()
  );

  return flow(
    daysEpochArray =>
      map<number, LineGraphDataInterface>(daysEpochArray, dayEpoch => ({
        domain: dayjs(dayEpoch).format('DD/MM/YY'),
        value: dataGroupedByCreationDay[`${dayEpoch}`]?.length ?? 0,
      })),
    data => [{ key, data }]
  )(initArrayWithEpochForNDaysInPast(endDateEpoch, numberOfDaysToCover));
}
