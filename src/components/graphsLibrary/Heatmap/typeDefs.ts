export interface Bin<DataType = any> {
  count: number;
  bin: DataType;
}

export interface ColumnData<DataType = any> {
  bin: number;
  bins: Array<Bin<DataType>>;
}

export interface HeatmapProps<DataType = any> {
  data: Array<ColumnData<DataType>>;
  padding?: number;
  uniqueKey: string;
  className?: string;
}

export interface ParentContainedHeatmapProps<DataType = any>
  extends HeatmapProps<DataType> {
  width: number;
  height: number;
  padding: number;
}
