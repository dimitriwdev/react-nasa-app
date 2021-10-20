import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import AppLoader from '../components/AppLoader';
import Modal from '../components/Modal';

import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles(() => ({
  cardList: {
    color: '#fff',
    padding: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    '@media (max-width: 716px)': {
      paddingTop: '0px',
    },
  },
  card: {
    width: '300px',
    height: '300px',
    backgroundColor: 'transparent',
    margin: '20px',
    listStyle: 'none',
    borderRadius: '10px',
    boxShadow: '3px 3px rgba(50, 50, 50, 0.2),',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '50px',
  },
  moreButton: {
    width: '200px',
    margin: '0 auto',
    textTransform: 'capitalize',
    backgroundColor: 'rgba(50, 50, 50, 0.5)',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    transition: '0.5s ease',
    padding: '10px',
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    }
  },
}))

const ApodSelection = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState('');
  const [isRefreshed, setIsRefreshed] = useState(false);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_NASA_API_KEY;
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=6&concept_tags=True`)
      .then(res => {
        setDatas(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error', error);
      })
  }, [isRefreshed]);

  const handleAddPic = () => {
    setIsRefreshed(!isRefreshed)
  }

  if (isLoading) {
    return <AppLoader />
  }

  return (
    <div className={classes.apodSelection}>
      <Header title='Picture Of The Day Selection' />
      <ul className={classes.cardList}>
        {datas.filter(data => data.media_type === 'image')
          .map(data => (
            <li key={data.title} className={classes.card}>
              <Modal data={data} />
            </li>
          )
          )}
      </ul>
      <div className={classes.buttonContainer}>
        <Button className={classes.moreButton} onClick={handleAddPic}><Typography variant="body1">See more</Typography></Button>
      </div>
    </div >
  )
}

export default ApodSelection;