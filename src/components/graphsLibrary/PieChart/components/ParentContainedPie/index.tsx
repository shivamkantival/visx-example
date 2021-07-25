import { ReactElement, useMemo } from "react";
import { ParentContainedPieProps, PieChartDataInterface } from "../../typeDefs";
import { useTheme } from "@material-ui/core";
import { map, min } from "lodash";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";

const SEQUENCED_PIE_COLORS = [
  "rgb(124,181,236)",
  "#90ed7d",
  "rgb(247,163,92)",
  "rgb(128,133,233)",
  "#f15c80",
  "rgb(228,211,84)",
  "#2b908f",
  "rgb(244,91,91)",
  "#53B8BB",
];

function getArcColor(arcIndex: number): string {
  return SEQUENCED_PIE_COLORS[arcIndex];
}

const pieValueGetter = (data: PieChartDataInterface): number => data.value;

const ParentContainedPie: <DataType extends PieChartDataInterface>(
  props: ParentContainedPieProps<DataType>
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

  const outerRadius = useMemo(
    () => (min([availableHeight, availableWidth]) as NonNullable<number>) / 2,
    [availableHeight, availableWidth]
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
      ></rect>
      <Group top={height / 2} left={width / 2}>
        <Pie
          data={data}
          outerRadius={outerRadius}
          innerRadius={outerRadius - 50}
          cornerRadius={4}
          padAngle={0.02}
          pieValue={pieValueGetter}
        >
          {({ arcs, path }) => {
            return map(arcs, (arc, index) => {
              const [centroidX, centroidY] = path.centroid(arc);
              const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;

              return (
                <g key={`${uniqueKey}-piechart-arc-${arc.data.label}`}>
                  <path
                    d={path(arc) as string | undefined}
                    fill={getArcColor(index)}
                  />
                  {hasSpaceForLabel ? (
                    <text
                      fill="black"
                      x={centroidX}
                      y={centroidY}
                      dy=".33em"
                      fontSize={9}
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      {`${arc.data.label} (${arc.data.value})`}
                    </text>
                  ) : null}
                </g>
              );
            });
          }}
        </Pie>
      </Group>
    </svg>
  );
};

export default ParentContainedPie;
