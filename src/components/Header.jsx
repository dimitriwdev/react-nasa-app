import React, { useState } from "react";
import nasaLogo from '../assets/nasaLogo.png'

import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from "../customHooks/useMediaQuery";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  appHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '20px',
    color: '#fff',
  },
  logo: {
    width: '58px',
    height: '50px',
  },
  title: {
    margin: '20px 0',
    '@media (max-width: 716px)': {
      fontSize: '20px',
    },
  },
  navActive: {
    color: 'skyblue',
  },
  navigation: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  mobileNavigation: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileMenu: {
    boxShadow: '0px 10px 10px -4px rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  menuDesktopLink: {
    margin: '20px',
  },
  menuButton: {
    backgroundColor: 'transparent',
    border: 'none',
  },
  menuIcon: {
    color: '#fff',
  },
  menuMobileLink: {
    width: '100vw',
    textAlign: 'center',
    padding: '20px 0',
  },
}))

const Header = ({ title }) => {
  const classes = useStyles();
  const [toggleMenu, setToggleMenu] = useState(false);
  let isPageWide = useMediaQuery('(min-width:900px)');

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu)
  }

  return (
    <div className={classes.appHeader}>
      <img className={classes.logo} src={nasaLogo} alt='nasa-logo' />
      <Typography variant='h4' className={classes.title}>{title}</Typography>
      {isPageWide ?
        <div className={classes.navigation}>
          <NavLink exact to="/" className={classes.menuDesktopLink} activeClassName={classes.navActive}>
            <Typography variant='body1'>Picture Of The Day</Typography>
          </NavLink>
          <NavLink exact to="/mars-rover" className={classes.menuDesktopLink} activeClassName={classes.navActive}>
            <Typography variant='body1'>Mars Rover</Typography>
          </NavLink>
          <NavLink exact to="/apod" className={classes.menuDesktopLink} activeClassName={classes.navActive}>
            <Typography variant='body1'>Picture Of The Day Selection</Typography>
          </NavLink>
        </div>
        : <div className={classes.mobileNavigation}>
          <button onClick={handleToggleMenu} className={classes.menuButton}><MenuIcon className={classes.menuIcon} /></button>
          {toggleMenu ?
            <div className={classes.mobileMenu}>
              <NavLink exact to="/" className={classes.menuMobileLink} activeClassName={classes.navActive}>
                <Typography variant='body1'>Picture Of The Day</Typography>
              </NavLink>
              <NavLink exact to="/mars-rover" className={classes.menuMobileLink} activeClassName={classes.navActive}>
                <Typography variant='body1'>Mars Rover</Typography>
              </NavLink>
              <NavLink exact to="/apod" className={classes.menuMobileLink} activeClassName={classes.navActive}>
                <Typography variant='body1'>Picture Of The Day Selection</Typography>
              </NavLink>
            </div>
            : null
          }
        </div>
      }
    </div>
  );

}

export default Header;