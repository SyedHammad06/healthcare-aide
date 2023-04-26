import { useRef, useState } from 'react';
import { NextPage } from 'next';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { PackageType } from '../pages/tests';

const useStyles = makeStyles((theme) => ({
  appointment: {
    padding: '0',
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

    '&:hover': {
      cursor: 'pointer',
    },
  },
  cardMedia: {
    height: 200,
  },
  cardContent: {
    padding: '1rem 1.8rem',
    '& p': {
      marginBottom: 0,
    },
  },
  iconLeft: {
    position: 'absolute',
    left: '-1rem',
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
    right: '-1rem',
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
  packages: PackageType[];
  userId: string;
};

export const PackagesSection: NextPage<Props> = ({ packages, userId }) => {
  const classes = useStyles();
  const router = useRouter();

  const appointmentContainerRef = useRef<HTMLDivElement>(null);

  const [scrollEnd, setScrollEnd] = useState(false);
  const [scrollStart, setScrollStart] = useState(true);

  const splitSentence = (sentence: string): string => {
    const index = sentence.indexOf('.');
    return sentence.substring(0, index);
  };

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

  const changeRoute = (field: string) => {
    if (userId) {
      router.push(`/tests/${field}?id=${userId}`);
    } else {
      router.push(`/login`);
    }
  };

  return (
    <div className={classes.appointment}>
      <div className={classes.relative}>
        <div className={classes.cardContainer} ref={appointmentContainerRef}>
          {packages.map((el) => (
            <Card
              key={el.id}
              className={classes.card}
              onClick={() => changeRoute(el.id)}
            >
              <CardMedia
                className={classes.cardMedia}
                component='img'
                image={`http://127.0.0.1:8090/api/files/packages/${el.id}/${el.image}`}
                alt={el.name}
              />
              <CardContent className={classes.cardContent}>
                <Typography variant='h6' sx={{ lineHeight: 1.2 }} gutterBottom>
                  {el.name}
                </Typography>
                <Typography paragraph>
                  {`${splitSentence(el.description)}.`}
                </Typography>
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
