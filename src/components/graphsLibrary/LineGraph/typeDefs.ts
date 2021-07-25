export interface LineGraphDataInterface {
  value: number;
  domain: string;
}

export interface LineGraphSingularData {
  key: string;
  data: Array<LineGraphDataInterface>;
}

export interface LineGraphProps {
  data: Array<LineGraphSingularData>;
  domainToRangeGetter?: (domainValue: string) => string;
  uniqueKey: string;
  className?: string;
  width: number;
  height: number;
  padding: number;
}
