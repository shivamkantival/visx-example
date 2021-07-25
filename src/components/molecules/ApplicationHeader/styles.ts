import { makeStyles } from "@material-ui/core";

export default makeStyles(
  ({ palette: { getContrastText, primary }, spacing }) => ({
    navigationLinksContainer: {
      "& > *": {
        marginRight: spacing(2),
      },
    },
    link: {
      color: getContrastText(primary.main),
    },
  })
);
