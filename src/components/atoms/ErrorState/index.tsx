import { FC } from "react";
import useStyle from "./styles";
import ClientErrorAsset from "./assets/clientError.png";
import NotFoundAsset from "./assets/not-found.png";

enum ERROR_TYPES {
  NO_CONTENT = "NO_CONTENT",
  CLIENT_ERROR = "CLIENT_ERROR",
}

const ERROR_CONFIGS: Record<ERROR_TYPES, { label: string; icon: any }> = {
  [ERROR_TYPES.NO_CONTENT]: {
    label: "No relevant data could be found",

    icon: NotFoundAsset,
  },
  [ERROR_TYPES.CLIENT_ERROR]: {
    label: "Oops! Something went wrong",
    icon: ClientErrorAsset,
  },
};

const ErrorState: FC<{ code: ERROR_TYPES }> = ({ code }) => {
  const classes = useStyle();
  const config = ERROR_CONFIGS[code];

  return (
    <div className={classes.errorStateContainer}>
      <img src={config.icon} className={classes.image} />
      <span className={classes.label}>{config.label}</span>
    </div>
  );
};

export default ErrorState;
export { ERROR_TYPES };
