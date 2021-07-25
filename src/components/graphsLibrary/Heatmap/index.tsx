import { ReactElement, useMemo } from "react";
import { scaleLinear } from "@visx/scale";
import { HeatmapCircle } from "@visx/heatmap";
import { HeatmapProps } from "./typeDefs";
import { minColor, maxColor } from "./constants";
import { bins, count, max, min } from "./utils";
import { identity } from "lodash";
import { useTheme } from "@material-ui/core";
import { NumberValue } from "d3-scale";
import withGraphContainedDimensions from "../hocs/withGraphContainedDimensions";

const Heatmap: <BinDataType = any>(
  props: HeatmapProps<BinDataType>
) => ReactElement<any, any> | null = ({
  data,
  padding,
  width,
  height,
  uniqueKey,
}) => {
  const availableWidth = width - 2 * padding;
  const availableHeight = height - 2 * padding;

  const {
    palette: { background },
  } = useTheme();

  const colorMax = useMemo(() => max(data, (d) => max(bins(d), count)), [data]);
  const bucketSizeMax = useMemo(() => max(data, (d) => bins(d).length), [data]);

  const xScale = useMemo(() => {
    const _xScale = scaleLinear<number>({
      domain: [0, data.length],
      range: [padding, width - padding],
    });

    return (d: NumberValue) => _xScale(d) ?? 0;
  }, [data.length, padding, width]);

  const yScale = useMemo(() => {
    const _yScale = scaleLinear<number>({
      domain: [0, bucketSizeMax],
      range: [padding, height - padding],
    });

    return (d: NumberValue) => _yScale(d) ?? 0;
  }, [bucketSizeMax, height, padding]);

  const colorScale = useMemo(
    () =>
      scaleLinear<string>({
        range: [minColor, maxColor],
        domain: [0, colorMax],
      }),
    [colorMax]
  );

  const opacityScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [0.1, 1],
        domain: [0, colorMax],
      }),
    [colorMax]
  );

  const dataPointWidth = availableWidth / data.length;
  const dataPointHeight = availableHeight / bucketSizeMax;
  const radius = useMemo(
    () => min([dataPointWidth, dataPointHeight], identity) / 2,
    [dataPointHeight, dataPointWidth]
  );

  if (!(availableHeight > 0 && availableWidth > 0)) {
    return null;
  }

  return (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={14}
        fill={background.default}
      />
      <HeatmapCircle
        xScale={xScale}
        yScale={yScale}
        data={data}
        colorScale={colorScale}
        opacityScale={opacityScale}
        radius={radius < 0 ? 0 : radius}
        gap={2}
      >
        {(heatmap) => {
          return heatmap.map((heatmapBins) =>
            heatmapBins.map((bin) => (
              <circle
                key={`${uniqueKey}-heatmap-circle-${bin.row}-${bin.column}`}
                cx={bin.cx}
                cy={bin.cy}
                r={bin.r}
                fill={bin.color}
                fillOpacity={bin.opacity}
              />
            ))
          );
        }}
      </HeatmapCircle>
    </svg>
  );
};

export default withGraphContainedDimensions<HeatmapProps>(Heatmap);
