import { FC } from "react";
import { ParentSize } from "@visx/responsive";
import { useTheme } from "@material-ui/core";

export default function withGraphContainedDimensions<
  WrappedComponentProps extends {
    width: number;
    height: number;
    padding: number;
  }
>(
  WrappedComponent: FC<WrappedComponentProps>
): FC<
  Omit<WrappedComponentProps, "width" | "height" | "padding"> & {
    className?: string;
    padding?: number;
  }
> {
  return (props) => {
    const { spacing } = useTheme();
    return (
      <div className={props.className}>
        <ParentSize>
          {({ width, height }) => (
            // @ts-ignore
            <WrappedComponent
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
}
