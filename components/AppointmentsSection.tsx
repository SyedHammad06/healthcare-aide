import { useRef, useState } from 'react';
import { NextPage } from 'next';
import { makeStyles } from '@mui/styles';
import { AppointmentType } from '../pages';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const useStyles = makeStyles((theme) => ({
  appointment: {
    padding: '1rem 4rem',
  },
  heading: {
    marginBottom: '1rem',
  },
  subHeading: {
    fontSize: '1.2rem',
  },
  relative: {
    position: 'relative',
  },
  cardContainer: {
    display: 'flex',
    gap: '1rem',
    margin: '2rem 0',
    overflowX: 'hidden',
  },
  card: {
    minWidth: 'calc(25% - 0.8rem)',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  cardMedia: {
    height: 200,
  },
  cardContent: {
    padding: '1rem 2rem',
    '& p': {
      marginBottom: 0,
    },
  },
  iconLeft: {
    position: 'absolute',
    left: '-1.25rem',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: theme.palette.secondary.main,

    '& svg': {
      fill: 'white',
    },

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  iconRight: {
    position: 'absolute',
    right: '-1.25rem',
    top: '50%',
    transform: 'translateY(-50%)',
    transition: 'all 0.5s',
    backgroundColor: theme.palette.secondary.main,

    '& svg': {
      fill: 'white',
    },

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

type Props = {
  appointments: AppointmentType[];
};

export const AppointmentSection: NextPage<Props> = ({ appointments }) => {
  const classes = useStyles();

  const appointmentContainerRef = useRef<HTMLDivElement>(null);

  const [scrollEnd, setScrollEnd] = useState(false);
  const [scrollStart, setScrollStart] = useState(true);

  const scroll = (direction: boolean, value: number) => {
    if (appointmentContainerRef.current) {
      direction
        ? appointmentContainerRef.current.scroll({
            left: appointmentContainerRef.current.scrollLeft + value,
            behavior: 'smooth',
          })
        : appointmentContainerRef.current.scroll({
            left: appointmentContainerRef.current.scrollLeft - value,
            behavior: 'smooth',
          });
      scrollEnd ? setScrollEnd(false) : setScrollEnd(true);
      scrollStart ? setScrollStart(false) : setScrollStart(true);
    }
  };

  return (
    <div className={classes.appointment}>
      <Typography variant='h2' color='primary' className={classes.heading}>
        Book an appointment with your doctor
      </Typography>
      <Typography
        variant='body1'
        color='primary'
        className={classes.subHeading}
      >
        Book appointments and receive experienced doctor insight from various
        medical fields.
      </Typography>
      <div className={classes.relative}>
        <div className={classes.cardContainer} ref={appointmentContainerRef}>
          {appointments.map((el) => (
            <Card key={el.id} className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                component='img'
                image={`http://127.0.0.1:8090/api/files/fields/${el.id}/${el.image}`}
                alt={el.title}
              />
              <CardContent className={classes.cardContent}>
                <Typography variant='h6'>{el.title}</Typography>
                <Typography paragraph>{el.subtitle}</Typography>
              </CardContent>
            </Card>
          ))}
          <div>
            {!scrollStart ? (
              <IconButton
                size='large'
                aria-label='next appointment'
                className={classes.iconLeft}
                onClick={() => scroll(false, 2000)}
              >
                <ArrowBackIcon fontSize='inherit' />
              </IconButton>
            ) : null}
            {!scrollEnd ? (
              <IconButton
                size='large'
                aria-label='next appointment'
                className={classes.iconRight}
                onClick={() => scroll(true, 2000)}
              >
                <ArrowForwardIcon fontSize='inherit' />
              </IconButton>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
