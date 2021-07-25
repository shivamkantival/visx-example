import { makeStyles } from "@material-ui/core";
import flexbox from "utils/styleMixins/flexBox";

export default makeStyles(({ spacing }) => ({
  appContentContainer: { minHeight: spacing(200), ...flexbox({}) },
}));
