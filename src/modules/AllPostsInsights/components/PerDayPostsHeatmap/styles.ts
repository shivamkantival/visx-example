import { makeStyles } from "@material-ui/core";
import flexbox from "utils/styleMixins/flexBox";

export default makeStyles(({ spacing }) => ({
  perDayPostsHeatmapContainer: {
    width: "100%",
    ...flexbox({ flexDirection: "column", alignItems: "center" }),
  },
  heatmapContainer: {
    width: spacing(150),
    height: spacing(50),
    marginBottom: spacing(4),
  },
  label: {},
}));
