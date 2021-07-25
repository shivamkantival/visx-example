import { FC } from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { BASE_APPLICATION_ROUTES } from "configs/routes";
import { Link } from "react-router-dom";
import { map } from "lodash";
import useStyle from "components/molecules/ApplicationHeader/styles";

const APP_NAVIGATION_LINKS: ReadonlyArray<{
  route: BASE_APPLICATION_ROUTES;
  label: string;
}> = [
  {
    route: BASE_APPLICATION_ROUTES.POSTS_INSIGHTS,
    label: "Posts Insights",
  },
  {
    route: BASE_APPLICATION_ROUTES.AUTHORS,
    label: "Authors",
  },
];

const ApplicationHeader: FC<{ className?: string }> = ({ className }) => {
  const classes = useStyle();

  return (
    <AppBar position="static" className={className}>
      <Toolbar className={classes.navigationLinksContainer}>
        {map(APP_NAVIGATION_LINKS, (config) => (
          <Link className={classes.link} to={config.route} key={config.route}>
            {config.label}
          </Link>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationHeader;
