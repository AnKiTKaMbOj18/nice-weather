import React from 'react';
import { Route } from "react-router-dom";
import { makeStyles, withTheme } from '@material-ui/core/styles';
import routes from "./routes";
import Footer from "./components/Footer";
import Header from './components/Header';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App({theme}) {
  const classes = useStyles();

  return (
    <div>
      <Header classes={classes} />
      <main>
        {routes.map(({ path, exact, component: Component, ...rest }) => (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={props => <Component {...props} {...rest} />}
          />
        ))}
      </main>
      <Footer  classes={classes} theme={theme} />
    </div>
  );
}

export default withTheme(App);
