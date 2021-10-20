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
    flexDirection: 'column',
    color: '#fff',
    padding: '40px 20px 50px 20px',
    '@media (max-width: 900px)': {
      padding: '20px 20px 50px 20px',
    },
  },
  apodDetails: {
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 900px)': {
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  imgTitle: {
    margin: '40px 0',
    '@media (max-width: 900px)': {
      fontSize: '18px',
      margin: '20px 0',
    },
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '40px',
    '@media (max-width: 900px)': {
      flexDirection: 'column',
    },
  },
  explanation: {
    width: 'calc(50vw - 50px)',
    paddingLeft: '50px',
    lineHeight: '2',
    cursor: 'pointer',
    '@media (max-width: 900px)': {
      width: '100%',
      paddingLeft: '0px',
      paddingTop: '40px',
      textAlign: 'center',
    },
  },
  expandText: {
    color: 'skyblue',
    margin: '20px 0 40px 0',
    display: 'flex',
    justifyContent: 'center',
  },
  imgContainer: {
    flexGrow: 1,
    width: 'calc(50vw - 50px)',
    '@media (max-width: 900px)': {
      width: '100%',
    },
  },
  apod: {
    width: '100%',
    borderRadius: '20px'
  },
  copyright: {
    margin: '40px 0 0 0',
    '@media (max-width: 900px)': {
      margin: '20px 0 0 0',
    },
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
        <div className={classes.apodDetails}>
          <h2 className={classes.imgTitle}>{data.title}</h2>
          <DateBuilder
            date={data.date}
          />
          {data.copyright && <p className={classes.copyright}>Photo by: {data.copyright}</p>}
        </div>
        <div className={classes.content}>
          <div className={classes.imgContainer}>
            <img className={classes.apod} src={`${data.url}`} alt={(data.title + ' image')} />
          </div>
          {/* <div className={classes.explanation}>
            {data.explanation}
          </div> */}
          {isEllipsis
            ?
            (<div
              onClick={expandText}
              className={classes.explanation}>
              <LinesEllipsis
                text={data.explanation}
                basedOn="letters"
                maxLine={5}
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
      </div>
    </div>
  )
}

export default ImageOfTheDay;