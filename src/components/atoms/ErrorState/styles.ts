import { makeStyles } from "@material-ui/core";
import flexbox from "utils/styleMixins/flexBox";

export default makeStyles(({ spacing, palette: { error } }) => ({
  errorStateContainer: {
    ...flexbox({
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }),
    alignSelf: "center",
    padding: spacing(10),
  },
  image: {
    maxWidth: spacing(40),
    maxHeight: spacing(40),
    marginBottom: spacing(4),
  },
  label: {
    color: error.light,
  },
}));
