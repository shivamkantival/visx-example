import { ReactElement } from 'react';
import { useTheme } from '@material-ui/core';
import { ParentSize } from '@visx/responsive';
import ParentContainedPie from './components/ParentContainedPie';
import { PieChartDataInterface, PieProps } from './typeDefs';

const PieChart: <DataType extends PieChartDataInterface>(
  props: PieProps<DataType>
) => ReactElement<any, any> | null = props => {
  const { spacing } = useTheme();
  return (
    <div className={props.className}>
      <ParentSize>
        {({ width, height }) => (
          <ParentContainedPie
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

export default PieChart;
