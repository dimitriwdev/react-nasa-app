import nasaLogo from '../assets/nasaLogo.png'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  notFound: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: '#fff',
    height: '100vh',
  },
  logo: {
    width: '80px',
    height: '70px',
  },
}))

const PageNotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.notFound}>
      <img className={classes.logo} src={nasaLogo} alt='nasa-logo' />
      <h1>Oops, the page cannot be found</h1>
    </div>
  );

}

export default PageNotFound;