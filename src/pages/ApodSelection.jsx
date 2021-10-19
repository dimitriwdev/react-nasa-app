import React, { useEffect, useState } from 'react';
import DateBuilder from '../components/DateBuilder';
import Header from '../components/Header';
import AppLoader from '../components/AppLoader';

import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  cardList: {
    color: '#fff',
    padding: '20px',
    width: '95vw',
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
    position: 'relative',
  },
  imgContainer: {
    width: '100%',
    height: '100%',
    borderRadius: '20px',
    position: 'relative',
  },
  apod: {
    width: '100%',
    height: '100%',
    borderRadius: '20px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  details: {
    transition: '0.5s ease',
    opacity: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '90%',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '40px',
    '&:hover': {
      opacity: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '50px',
  },
  moreButton: {
    width: '200px',
    margin: '0 auto',
    border: 'none',
    background: 'transparent',
    color: '#fff',
    cursor: 'pointer',
    transition: '0.5s ease',
    padding: '10px',
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)'
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
        {datas.map(data => (
          <li key={data.title} className={classes.card}>
            <div className={classes.imgContainer}>
              <div className={classes.apod} style={{ backgroundImage: `url(${data.url})` }} />
            </div>
            <div className={classes.details}>
              <h3 className={classes.title}>{data.title}</h3>
              <DateBuilder date={data.date} />
              {data.copyright && <p className={classes.copyright}>Photo by: {data.copyright}</p>}
            </div>
          </li>
        )
        )}
      </ul>
      <div className={classes.buttonContainer}>
        <button className={classes.moreButton} onClick={handleAddPic}>See more</button>
      </div>
    </div >
  )
}

export default ApodSelection;