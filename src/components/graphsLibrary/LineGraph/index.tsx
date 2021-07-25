import { ReactElement } from 'react';
import { useTheme } from '@material-ui/core';
import { ParentSize } from '@visx/responsive';
import ParentContainedLineGraph from './components/ParentContainedLineGraph';
import { LineGraphProps } from './typeDefs';

const LineGraph: (props: LineGraphProps) => ReactElement<any, any> | null =
  props => {
    const { spacing } = useTheme();
    return (
      <div className={props.className}>
        <ParentSize>
          {({ width, height }) => (
            <ParentContainedLineGraph
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

export default LineGraph;
