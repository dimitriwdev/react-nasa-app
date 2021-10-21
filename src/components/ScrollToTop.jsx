import React, { useEffect, useState } from 'react';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { makeStyles } from '@material-ui/core/styles';
import { useWindowScroll } from 'react-use';

const useStyles = makeStyles(() => ({
  scrollToTop: {
    position: 'sticky',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '40px',
    borderRadius: '5px',
    backgroundColor: 'rgba(50, 50, 50, 0.75)',
    color: '#fff',
    zIndex: 1,

    '&:hover': {
      backgroundColor: 'rgba(50, 50, 50, 1)',
    },
    '@media (max-width: 716px)': {
      height: '60px',
      marginTop: '20px',
    },
  },
  scrollToTopIcon: {
    marginTop: '0px',
    animation: '$scrollTop 0.5s alternate ease infinite',
  },

  "@keyframes scrollTop": {
    from: {
      transform: 'translateY(2px)',
    },
    to: {
      transform: 'translateY(-1px)',
    }
  }
}));

const ScrollToTop = () => {
  const classes = useStyles();
  const { y: pageYOffset } = useWindowScroll();
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    if (pageYOffset > 400) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  }, [pageYOffset]);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visibility) {
    return false;
  }
  return (
    <div className={classes.scrollToTop} onClick={handleScrollTop}>
      <KeyboardArrowUpIcon className={classes.scrollToTopIcon} />
    </div>
  );
};

export default ScrollToTop;