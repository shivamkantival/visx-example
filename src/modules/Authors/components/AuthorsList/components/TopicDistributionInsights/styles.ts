import { makeStyles } from "@material-ui/core";
import flexbox from "utils/styleMixins/flexBox";

export default makeStyles(({ spacing }) => ({
  topicDistributionInsightsContainer: {
    ...flexbox({ flexDirection: "column", alignItems: "center" }),
  },
  pieChartContainer: {
    width: "100%",
    height: spacing(100),
  },
  noteText: {
    fontStyle: "italic",
  },
}));
