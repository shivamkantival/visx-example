import { makeStyles } from "@material-ui/core";
import { rightLeftMargin } from "utils/styleMixins/margin";

export default makeStyles(({ spacing }) => {
  const marginOn1Side = spacing(8);
  return {
    heatmapContainer: {
      height: spacing(25),
      ...rightLeftMargin(marginOn1Side),
      marginBottom: spacing(8),
    },
    authorCardContainer: {
      width: spacing(100),
    },
  };
});
