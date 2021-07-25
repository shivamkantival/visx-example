import { makeStyles } from "@material-ui/core";
import flexbox from "utils/styleMixins/flexBox";
import { rightLeftMargin } from "utils/styleMixins/margin";

export default makeStyles(({ spacing }) => ({
  listContainer: {
    ...flexbox({ justifyContent: "space-around", flexWrap: "wrap" }),
    "& > *": {
      marginBottom: spacing(4),
    },
  },
  allAuthorsWithDitributionContainer: {
    ...flexbox({ flexDirection: "column", alignItems: "center" }),
  },
  topicDistributionInsightsContainer: {
    width: spacing(100),
    marginBottom: spacing(4),
  },
}));
