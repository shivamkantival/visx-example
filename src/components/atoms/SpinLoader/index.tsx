import { FC } from "react";
import { CircularProgress } from "@material-ui/core";
import useStyle from "./styles";

const SpinLoader: FC<{ className?: string }> = ({ className }) => {
  const classes = useStyle();
  return (
    <CircularProgress className={`${classes.loaderContainer} ${className}`} />
  );
};

export default SpinLoader;
