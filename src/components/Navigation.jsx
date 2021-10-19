import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import '../index.css';

const useStyles = makeStyles(() => ({
  navActive: {
    color: 'skyblue',
  },
  navigation: {
    margin: '0 0 20px 0',
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
}))

const Navigation = () => {
  const classes = useStyles();
  return (
    <div className={classes.navigation}>
      <NavLink exact to="/" activeClassName={classes.navActive}>
        Picture Of The Day
      </NavLink>
      <NavLink exact to="/mars-rover" activeClassName={classes.navActive}>
        Mars Rover
      </NavLink>
      <NavLink exact to="/apod" activeClassName={classes.navActive}>
        Picture Of The Day Selection
      </NavLink>
    </div>
  );
};

export default Navigation;