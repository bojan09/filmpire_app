import React, { useRef } from "react";

// mui component
import { CssBaseline } from "@mui/material";

// react router
import { Route, Switch } from "react-router-dom";

// styles
import useStyles from "./styles";

// components
import { Actors, MovieInformation, Movies, Navbar, Profile } from "./";

// Alan AI
import useAlan from "./AlanAI/Alan";

const App = () => {
  const classes = useStyles();

  const alanButtonContainer = useRef();
  useAlan();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/movie/:id">
            <MovieInformation />
          </Route>
          <Route exact path="/actors/:id">
            <Actors />
          </Route>
          <Route exact path={["/", "/approved"]}>
            <Movies />
          </Route>
          <Route exact path="/profile/:id">
            <Profile />
          </Route>
        </Switch>
      </main>
      <div ref={alanButtonContainer} />
    </div>
  );
};

export default App;
