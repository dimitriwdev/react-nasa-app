import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  appLoader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    minHeight: '100vh',
    color: '#fff',
  },
}))

const AppLoader = () => {
  const classes = useStyles();
  return (
    <div className={classes.appLoader}>
      <p>Loading...</p>
    </div>
  );
};

export default AppLoader;