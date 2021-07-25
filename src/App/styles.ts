import { makeStyles } from "@material-ui/core";
import flexBox from "utils/styleMixins/flexBox";

export default makeStyles({
  fullPageAppContainer: {
    height: "100vh",
    ...flexBox({ flexDirection: "column", alignItems: "stretch" }),
  },
  appHeaderContainer: {
    flex: "auto 0 0",
  },
  applicationContentContainer: {
    flex: "auto 1 1",
    overflow: "auto",
  },
});
