import React, { useEffect, useState } from 'react';
import DateBuilder from '../components/DateBuilder';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import AppLoader from '../components/AppLoader';

import axios from 'axios';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  cardList: {
    color: '#fff',
    padding: '0 20px',
    width: '95vw',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
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
  pic: {
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
  pagination: {
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  paginationIcon: {
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    backgroundColor: 'transparent',
    margin: '0 20px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)'
    }
  },
}))

const MarsRover = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState('');
  const [page, setPage] = useState(1);

  const handlePageChangePrev = () => {
    return (page !== 1) && setPage(page - 1)

  }

  const handlePageChangeNext = () => {
    return (datas.photos.length === 25) ? setPage(page + 1) : null
  }

  useEffect(() => {
    const apiKey = process.env.REACT_APP_NASA_API_KEY;
    axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=${apiKey}`)
      .then(res => {
        setDatas(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error', error);
      })
  }, [page]);

  if (isLoading) {
    return <AppLoader />
  }

  return (
    <div className={classes.marsRover}>
      <Header title='Home' />
      <Navigation />
      <div className={classes.pagination}>
        <button className={classes.paginationIcon} onClick={handlePageChangePrev}><ChevronLeftIcon /></button>
        {page}
        <button className={classes.paginationIcon} onClick={handlePageChangeNext}><ChevronRightIcon /></button>
      </div>
      <ul className={classes.cardList}>
        {datas.photos.map(photo => (
          <li key={photo.id} className={classes.card}>
            <div className={classes.imgContainer}>
              <div className={classes.pic} style={{ backgroundImage: `url(${photo.img_src})` }} />
            </div>
            <div className={classes.details}>
              <h3 className={classes.roverName}>{photo.rover.name}</h3>
              <p className={classes.date}>{<DateBuilder date={photo.earth_date} />}</p>
              <h3>Sol: {photo.sol}</h3>
            </div>
          </li>
        )
        )}
      </ul>
      <div className={classes.pagination}>
        <button className={classes.paginationIcon} onClick={handlePageChangePrev}><ChevronLeftIcon /></button>
        {page}
        <button className={classes.paginationIcon} onClick={handlePageChangeNext}><ChevronRightIcon /></button>
      </div>
    </div >
  )
}

export default MarsRover;