import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Container, Paper } from "@material-ui/core";
import useStyle from "components/molecules/ApplicationContent/style";
import { BASE_APPLICATION_ROUTES } from "configs/routes";
import { map } from "lodash";
import { Redirect, Route, Switch } from "react-router-dom";
import SpinLoader from "components/atoms/SpinLoader";

const BASE_APPLICATION_RENDER_CONFIG: ReadonlyArray<{
  route: BASE_APPLICATION_ROUTES;
  component: LazyExoticComponent<any>;
  exact: boolean;
}> = [
  {
    route: BASE_APPLICATION_ROUTES.POSTS_INSIGHTS,
    component: lazy(() => import("modules/AllPostsInsights")),
    exact: true,
  },
  {
    route: BASE_APPLICATION_ROUTES.AUTHORS,
    component: lazy(() => import("modules/Authors")),
    exact: false,
  },
];

const BaseApplicationRouter: FC<{}> = ({}) => {
  return (
    <Switch>
      {map(BASE_APPLICATION_RENDER_CONFIG, (config) => {
        const { component: Component, exact, route } = config;

        return (
          <Route path={route} exact={exact} key={route}>
            <Suspense fallback={<SpinLoader />}>
              <Component />
            </Suspense>
          </Route>
        );
      })}
      <Redirect to={BASE_APPLICATION_ROUTES.POSTS_INSIGHTS} />
    </Switch>
  );
};

const ApplicationContent: FC<{ className?: string }> = ({ className }) => {
  const classes = useStyle();

  return (
    <Container
      maxWidth="lg"
      className={`${classes.appContentContainer} ${className}`}
    >
      <BaseApplicationRouter />
    </Container>
  );
};

export default ApplicationContent;
