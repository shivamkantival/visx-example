import { Bin, ColumnData } from './typeDefs';

export function max<Datum>(data: Datum[], value: (d: Datum) => number): number {
  return Math.max(...data.map(value));
}

export function min<Datum>(data: Datum[], value: (d: Datum) => number): number {
  return Math.min(...data.map(value));
}

// accessors
export const bins = (d: ColumnData) => d.bins;
export const count = (d: Bin) => d.count;
