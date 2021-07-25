import { Bin, ColumnData } from 'components/graphsLibrary/Heatmap/typeDefs';
import dayjs from 'dayjs';
import {
  chunk,
  flow,
  groupBy,
  map,
  partialRight,
  reduce,
  reverse,
} from 'lodash';
import { initArrayWithEpochForNDaysInPast } from 'utils/dateTime';

function createEpochToFrequencyMapFromData<DataType = any>(
  data: Array<DataType>,
  dataGetter: (d: DataType) => number
): Record<string, number> {
  return flow(
    data =>
      groupBy<DataType>(data, individualDataPoint => {
        return dayjs(dataGetter(individualDataPoint)).startOf('day').valueOf();
      }),

    groupedByData =>
      reduce(
        groupedByData,
        (acc, values, key) => ({
          ...acc,
          [key]: values.length,
        }),
        {}
      )
  )(data);
}

function startWeekFromSunday(arrayWithDayEpochs: Array<number>): Array<number> {
  const newEntriesToPrepend: Array<number> = [];
  let latestEntryAtHead = dayjs(arrayWithDayEpochs[0]);
  while (latestEntryAtHead.day() > 0) {
    const newEntry = latestEntryAtHead.subtract(1, 'd').startOf('d');
    newEntriesToPrepend.push(newEntry.valueOf());
    latestEntryAtHead = newEntry;
  }

  return [...reverse(newEntriesToPrepend), ...arrayWithDayEpochs];
}

function convertEpochToTupleWithFrequencies(
  arrayWithDayEpochs: Array<number>,
  frequencyMapByDayEpoch: Record<string, number>
): Array<[number, number]> {
  return map<number, [number, number]>(arrayWithDayEpochs, epoch => [
    epoch,
    frequencyMapByDayEpoch[`${epoch}`] ?? 0,
  ]);
}

function mapWeeklyChunkedTuplesAsHeatmapData(
  weeklyChunkedData: Array<Array<[number, number]>>
): Array<ColumnData> {
  return map(weeklyChunkedData, (columnDataAsTuple, index) => ({
    bins: map<[number, number], Bin>(columnDataAsTuple, singlePointTuple => ({
      count: singlePointTuple[1],
      bin: singlePointTuple[0],
    })),
    bin: index,
  }));
}

export function createWeaklyHeatmapData<DataType = any>(
  data: Array<DataType>,
  params: {
    numberOfDaysToPrepareDataFor?: number;
    dataGetter: (d: DataType) => number;
    endDateEpoch: number;
  }
): Array<ColumnData> {
  const {
    numberOfDaysToPrepareDataFor = 30,
    dataGetter,
    endDateEpoch,
  } = params;
  const frequencyByDayEpoch = createEpochToFrequencyMapFromData(
    data,
    dataGetter
  );

  return flow(
    startWeekFromSunday,
    partialRight(convertEpochToTupleWithFrequencies, frequencyByDayEpoch),
    partialRight(chunk, 7),
    mapWeeklyChunkedTuplesAsHeatmapData
  )(
    initArrayWithEpochForNDaysInPast(endDateEpoch, numberOfDaysToPrepareDataFor)
  );
}
