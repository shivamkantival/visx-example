import { makeStyles } from "@material-ui/core";
import flexbox from "utils/styleMixins/flexBox";

export default makeStyles(({ spacing }) => ({
  postsPerDayContainer: {
    width: "100%",
    ...flexbox({ flexDirection: "column", alignItems: "center" }),
  },
  lineGraphContainer: {
    width: "100%",
    height: spacing(80),
    // marginBottom: spacing(4),
  },
  label: {},
}));
