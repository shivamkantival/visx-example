export interface PieChartDataInterface {
  label: string;
  value: number;
}

export interface PieProps<DataType extends PieChartDataInterface> {
  data: Array<DataType>;
  uniqueKey: string;
  className?: string;
  width: number;
  height: number;
  padding: number;
}
