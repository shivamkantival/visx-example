import { makeStyles } from "@material-ui/core";
import flexbox from "utils/styleMixins/flexBox";
import { rightLeftMargin } from "utils/styleMixins/margin";

export default makeStyles(({ spacing }) => ({
  authorsListContainer: {
    ...flexbox({ justifyContent: "space-around", flexWrap: "wrap" }),
    "& > *": {
      // ...rightLeftMargin(spacing(4)),
      marginBottom: spacing(4),
      flex: `30% 0 0`,
    },
  },
}));
