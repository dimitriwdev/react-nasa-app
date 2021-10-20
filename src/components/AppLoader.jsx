import React from "react";
import nasaLogo from '../assets/nasaLogo.png'

import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  appLoader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    minHeight: '100vh',
    color: '#fff',
  },
  logo: {
    width: '58px',
    height: '50px',
    marginBottom: '20px',
  },
}))

const AppLoader = () => {
  const classes = useStyles();
  return (
    <div className={classes.appLoader}>
      <img className={classes.logo} src={nasaLogo} alt='nasa-logo' />
      <Typography variant="h5">Loading...</Typography>
    </div>
  );
};

export default AppLoader;