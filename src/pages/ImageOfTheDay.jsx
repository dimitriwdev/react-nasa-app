import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DateBuilder from '../components/DateBuilder';
import Header from '../components/Header';
import AppLoader from '../components/AppLoader';

import LinesEllipsis from "react-lines-ellipsis";
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    padding: '40px 20px 50px 20px',
    '@media (max-width: 400px)': {
      padding: '20px 20px 50px 20px',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  details: {
    '@media (max-width: 716px)': {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  imgTitle: {
    margin: '40px 0',
    '@media (max-width: 716px)': {
      fontSize: '20px',
    },
  },
  explanation: {
    width: 'calc(50vw - 50px)',
    marginTop: '20px',
    lineHeight: '2',
    cursor: 'pointer',
    marginRight: '20px',
    '@media (max-width: 716px)': {
      width: '100%',
      textAlign: 'center',
      marginTop: '40px',
    },
  },
  expandText: {
    color: 'skyblue',
    margin: '20px 0 40px 0',
    display: 'flex',
    justifyContent: 'center',
  },
  imgContainer: {
    width: 'calc(50vw - 50px)',
    '@media (max-width: 716px)': {
      width: '100%',
    },
  },
  apod: {
    width: '100%',
    borderRadius: '20px'
  },
  copyright: {
    margin: '20px 0',
  },
}))

const ImageOfTheDay = () => {
  const classes = useStyle();
  const [isEllipsis, setIsEllipsis] = useState(true)
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState('')

  useEffect(() => {
    const apiKey = process.env.REACT_APP_NASA_API_KEY;
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
      .then(res => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error', error);
      })
  }, []);

  if (isLoading) {
    return <AppLoader />
  }

  const expandText = () => {
    setIsEllipsis(!isEllipsis)
  }

  return (
    <div className={classes.apod}>
      <Header title='Astronomy Picture Of The Day' />
      <div className={classes.container}>
        <div className={classes.details}>
          <h2 className={classes.imgTitle}>{data.title}</h2>
          <DateBuilder
            date={data.date}
          />
          {data.copyright && <p className={classes.copyright}>Photo by: {data.copyright}</p>}
          <div className={classes.explanation}>
            {data.explanation}
          </div>
          {isEllipsis
            ?
            (<div
              onClick={expandText}
              className={classes.explanation}>
              <LinesEllipsis
                text={data.explanation}
                basedOn="letters"
                maxLine={3}
              />
              <p className={classes.expandText}>
                read more...
              </p>
            </div>)
            : (
              <div
                onClick={expandText}
                className={classes.explanation}>
                {data.explanation}
                <p className={classes.expandText}>
                  read less...
                </p>
              </div>
            )
          }
        </div>
        <div className={classes.imgContainer}>
          <img className={classes.apod} src={`${data.url}`} alt={(data.title + ' image')} />
        </div>
      </div>
    </div>
  )
}

export default ImageOfTheDay;