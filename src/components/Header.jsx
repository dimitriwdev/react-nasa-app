import nasaLogo from '../assets/nasaLogo.png'
import { makeStyles } from '@material-ui/core/styles';

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
    margin: 0,
  },
}))

const Header = ({ title }) => {
  const classes = useStyles();

  return (
    <div className={classes.appHeader}>
      <img className={classes.logo} src={nasaLogo} alt='nasa-logo' />
      <h1>{title}</h1>
    </div>
  );

}

export default Header;