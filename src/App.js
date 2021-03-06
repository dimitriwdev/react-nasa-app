import React from 'react';
import './index.css';
import ImageOfTheDay from './pages/ImageOfTheDay';
import MarsRover from './pages/MarsRover'
import ApodSelection from "./pages/ApodSelection";
import PageNotFound from './pages/PageNotFound';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  app: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#000',
    minHeight: '100vh',
  },
}))

function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Router>
        <Switch>
          <Route exact path="/" component={ImageOfTheDay} />
          <Route exact path="/mars-rover" component={MarsRover} />
          <Route exact path="/apod" component={ApodSelection} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div >
  );
}

export default App;
