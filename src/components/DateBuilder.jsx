import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

const useStyle = makeStyles(() => ({

  date: {
    '@media (max-width: 400px)': {
      textAlign: 'center',
    },
  },
}))

const DateBuilder = (props) => {
  const { date } = props
  const classes = useStyle();

  const year = date.slice(0, 4);
  let month = date.slice(5, 7);
  const day = date.slice(8, 10);

  switch (month) {
    case '01':
      month = "January";
      break;
    case '02':
      month = "February";
      break;
    case '03':
      month = "March";
      break;
    case '04':
      month = "April";
      break;
    case '05':
      month = "May";
      break;
    case '06':
      month = "June";
      break;
    case '07':
      month = "July";
      break;
    case '08':
      month = "August";
      break;
    case '09':
      month = "September";
      break;
    case '10':
      month = "October";
      break;
    case '11':
      month = "November";
      break;
    case '12':
      month = "December";
      break;
    default: new Date().getMonth();
  }

  return (
    <Typography className={classes.date} variant="body1">{day + ' ' + month + ' ' + year}</Typography>
  );

}

export default DateBuilder;
