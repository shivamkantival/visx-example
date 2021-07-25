export interface PieChartDataInterface {
  label: string;
  value: number;
}

export interface PieProps<DataType extends PieChartDataInterface> {
  data: Array<DataType>;
  padding?: number;
  uniqueKey: string;
  className?: string;
}

export interface ParentContainedPieProps<DataType extends PieChartDataInterface>
  extends PieProps<DataType> {
  width: number;
  height: number;
  padding: number;
}
