import React, { useState } from 'react';
import DateBuilder from './DateBuilder';

import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(() => ({
  apod: {
    width: '300px',
    height: '300px',
    borderRadius: '20px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  dialog: {
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    left: 0,
    padding: 0,
    margin: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    '@media (max-width: 900px)': {
      height: '100%',
    },
  },
  imgDialogContainer: {
    position: 'relative',
    padding: '20px',
    display: 'flex',
    backgroundColor: '#000',
    borderRadius: '20px',
    '@media (max-width: 900px)': {
      flexDirection: 'column',
      height: '90%',
      justifyContent: 'space-around',
    },
  },
  apodDialog: {
    width: '60vw',
    maxHeight: '80vh',
    borderRadius: '20px',
    '@media (max-width: 900px)': {
      width: '80vw',
    },
  },
  detailContainer: {
    color: '#fff',
    width: '25vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 0 20px 20px',
    '@media (max-width: 900px)': {
      width: '80vw',
      padding: '20px 0',
    },
  },
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#fff',
    cursor: 'pointer',
    padding: 0,
    '&:hover': {
      color: 'rgb(100, 100, 100)'
    },
  },
  details: {
    textAlign: 'center',
  },
  title: {
    marginBottom: '10px',
    '@media (max-width: 900px)': {
      fontSize: '18px',
    },
  },
  copyright: {
    marginTop: '10px',
  },
  sol: {
    marginTop: '10px',
  },
}))

const Modal = (props) => {
  const { data } = props;
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  console.log('data', data);

  const handleShowDialog = () => {
    console.log('clicked image', data.title)
    setIsOpen(!isOpen);
  }

  const img = data.url || data.img_src;
  const title = data.title || data.rover.name;
  const date = data.date || data.earth_date;
  const copyright = data.coyright;
  const sol = data.sol;
  return (
    <div className={classes.apod} style={{ backgroundImage: `url(${img})` }} onClick={handleShowDialog}>
      {
        isOpen && (
          <dialog
            className={classes.dialog}
            open
            onClick={handleShowDialog}
          >
            <div className={classes.imgDialogContainer}>
              <img className={classes.apodDialog} src={`${img}`} alt='img' />
              <div className={classes.detailContainer}>
                <button className={classes.closeButton}><CancelIcon /></button>
                <div className={classes.details}>
                  <Typography variant="h5" className={classes.title}>{title}</Typography>
                  <DateBuilder date={date} />
                  {
                    data.copyright
                      ? <Typography variant="body2" className={classes.copyright}>Photo by: {copyright}</Typography>
                      : data.sol
                        ? <Typography variant='body1' className={classes.sol}>Sol: {sol}</Typography>
                        : null
                  }
                </div>
              </div>
            </div>
          </dialog>
        )
      }
    </div >
  )
}

export default Modal;