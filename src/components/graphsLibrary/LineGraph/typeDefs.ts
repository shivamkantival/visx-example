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
  padding?: number;
  uniqueKey: string;
  className?: string;
}

export interface ParentContainedLineGraphProps extends LineGraphProps {
  width: number;
  height: number;
  padding: number;
}
