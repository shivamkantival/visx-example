import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from "@visx/xychart";
import { map } from "lodash";
import { ReactElement, useCallback } from "react";
import { LineGraphDataInterface, LineGraphProps } from "./typeDefs";
import withGraphContainedDimensions from "components/graphsLibrary/hocs/withGraphContainedDimensions";

const yAccessor: (dataPoint: LineGraphDataInterface) => number = (
  dataPoint
) => {
  return dataPoint.value;
};

const LineGraph: (
  props: LineGraphProps
) => ReactElement<LineGraphProps> | null = ({
  uniqueKey,
  padding,
  data,
  width,
  height,
}) => {
  const xAccessor = useCallback<(dataPoint: LineGraphDataInterface) => string>(
    (dataPoint) => {
      return dataPoint.domain;
    },
    []
  );

  const lineSeriesKeyPrefix = `${uniqueKey}-line-`;

  return (
    <XYChart
      height={height - 2 * padding}
      xScale={{ type: "band" }}
      yScale={{ type: "linear" }}
      width={width - 2 * padding}
    >
      <AnimatedAxis orientation="bottom" numTicks={10} />
      <AnimatedAxis orientation="left" />
      <AnimatedGrid columns={false} numTicks={4} />
      {map(data, (singularLineData) => {
        return (
          <AnimatedLineSeries
            dataKey={`${lineSeriesKeyPrefix}${singularLineData.key}`}
            data={singularLineData.data}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            key={singularLineData.key}
          />
        );
      })}
      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showVerticalCrosshair
        showSeriesGlyphs
        renderTooltip={({ tooltipData, colorScale }) => {
          const data = tooltipData?.nearestDatum;

          return data ? (
            <div>
              <div
                style={{ color: colorScale ? colorScale(data.key) : "black" }}
              >
                {data.key.replace(lineSeriesKeyPrefix, "")}
              </div>
              {xAccessor(data.datum as LineGraphDataInterface)}
              {", "}
              {yAccessor(data.datum as LineGraphDataInterface)}
            </div>
          ) : null;
          // return ;
        }}
      />
    </XYChart>
  );
};

export default withGraphContainedDimensions<LineGraphProps>(LineGraph);
