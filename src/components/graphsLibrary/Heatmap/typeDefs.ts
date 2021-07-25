export interface Bin<DataType = any> {
  count: number;
  bin: DataType;
}

export interface ColumnData<DataType = any> {
  bin: number;
  bins: Array<Bin<DataType>>;
}

export interface HeatmapProps<DataType = any> {
  width: number;
  height: number;
  padding: number;
  data: Array<ColumnData<DataType>>;
  uniqueKey: string;
  className?: string;
}
