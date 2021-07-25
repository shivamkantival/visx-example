import { ReactElement } from 'react';
import { useTheme } from '@material-ui/core';
import { ParentSize } from '@visx/responsive';
import ParentContainedHeatmap from './components/ParentContainedHeatmap';
import { HeatmapProps } from './typeDefs';

const Heatmap: <BinDataType = any>(
  props: HeatmapProps<BinDataType>
) => ReactElement<any, any> | null = props => {
  const { spacing } = useTheme();
  return (
    <div className={props.className}>
      <ParentSize>
        {({ width, height }) => (
          <ParentContainedHeatmap
            {...props}
            width={width}
            height={height}
            // @ts-ignore
            padding={spacing(props.padding ?? 2)}
          />
        )}
      </ParentSize>
    </div>
  );
};

export default Heatmap;
