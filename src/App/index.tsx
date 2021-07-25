import React from "react";
import { createTheme, CssBaseline, MuiThemeProvider } from "@material-ui/core";
import ApplicationHeader from "components/molecules/ApplicationHeader";
import { BrowserRouter } from "react-router-dom";
import ApplicationContent from "components/molecules/ApplicationContent";
import useStyle from "./styles";

const theme = createTheme({ spacing: 4 });

function App() {
  const classes = useStyle();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className={classes.fullPageAppContainer}>
          <ApplicationHeader className={classes.appHeaderContainer} />
          <ApplicationContent className={classes.applicationContentContainer} />
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
