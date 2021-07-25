import { makeStyles } from "@material-ui/core";
import flexbox from "utils/styleMixins/flexBox";
import { topBottomMargin } from "utils/styleMixins/margin";

export default makeStyles(({ spacing }) => ({
  authorsPageContainer: {
    ...flexbox({
      alignItems: "center",
      flexDirection: "column",
    }),
    width: "100%",
    marginTop: spacing(8),
  },
  pageHeader: {
    ...topBottomMargin(spacing(4)),
  },
  contentContainer: {
    minHeight: spacing(100),
    alignSelf: "stretch",
    ...flexbox({
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
    }),
  },
}));
