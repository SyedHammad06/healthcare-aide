import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { TestsType } from '.';
import { useRouter } from 'next/router';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardActions from '@mui/material/CardActions';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import MorningImg from '../../public/images/morning.png';
import AfternoonImg from '../../public/images/afternoon.png';
import EveningImg from '../../public/images/evening.png';
import NightImg from '../../public/images/night.png';
import Image from 'next/image';
import Link from '../../src/Link';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '1.5rem',
    display: 'flex',
    gap: '1.5rem',
  },
  left: {
    flex: '40%',
  },
  right: {
    flex: '60%',
  },
  card: {
    position: 'sticky',
    top: '1.5rem',
  },
  contentContainer: {
    padding: '0 1rem',
    marginTop: '0.5rem',
  },
  list: {
    margin: 0,
    listStylePosition: 'inside',

    '& li': {
      fontSize: '1.2rem',
      marginTop: '0.5rem',
      listStyle: 'none',
      listStyleImage: "url('/images/li.png')",

      '&::marker': {
        display: 'block',
      },
    },
  },
  flex: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& p': {
      fontSize: '1.2rem',
    },

    '& a': {
      color: 'white',
      fontSize: '1rem',
      fontWeight: 600,
      padding: '0.5rem 1.5rem',
    },
  },
  btn: {
    color: 'white',
    marginTop: '1rem',
    fontSize: '1.4rem',
    padding: '0.5rem 0',
  },
  spacer: {
    display: 'block',
    margin: '1rem 0',
  },
  timingsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  timingIcon: {
    minWidth: '2rem',
    display: 'inline-block',
  },
  timingHeading: {
    flex: '40%',
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',

    '& p': {
      fontSize: '1.3rem',
      fontWeight: 500,
    },
  },
  timings: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  timingBtn: {
    fontSize: '1.1rem',
    padding: '0.25rem 1.5rem',
  },
  btnContainer: {
    flex: '60%',
    display: 'flex',
    gap: '0.5rem',
  },
  direction: {
    textDecoration: 'none',
    fontSize: '1.2rem',
    color: 'white',
    width: '100%',
    padding: '1rem 2rem',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '0.5rem',
    textAlign: 'center',
  },
}));

const TestDetails: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();

  //* State variables
  const [test, setTest] = useState<TestsType>();
  const [testId, setTestId] = useState('');
  const [userId, setUserId] = useState('');
  const [dialog, setDialog] = useState(false);
  const [dialog2, setDialog2] = useState(false);
  const [error, setError] = useState('');

  //* Functions
  useEffect(() => {
    if (router.isReady) {
      if (router.query.tests) {
        setTestId(router.query.tests[0]);
        router.query.id && typeof router.query.id === 'string'
          ? setUserId(router.query.id)
          : null;
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    (async () => {
      try {
        if (testId) {
          const testsRes = await axios
            .get(
              `http://127.0.0.1:8090/api/collections/lab_test/records/${testId}`
            )
            .then((res) => res.data);
          testsRes && setTest(testsRes);
        }
      } catch (error: any) {
        setError(error.message);
      }
    })();
  }, [testId]);

  const makeAppointment = async (time: number) => {
    if (userId) {
      const currentDate = new Date();
      currentDate.setHours(time);
      currentDate.setMinutes(0);
      currentDate.setSeconds(0);
      const body = {
        user_id: userId,
        test_id: testId,
        date_time: new Date(currentDate),
      };
      try {
        const appointmentRes = await axios.post(
          'http://127.0.0.1:8090/api/collections/test_schedule/records',
          body
        );
        if (appointmentRes) {
          setDialog2(true);
        }
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      }
    }
  };

  const getTimings = (dayType: any) => {
    const timings = test?.timings;
    if (timings && timings[dayType]) {
      const hours: number[] = [];
      for (let i = timings[dayType].start; i <= timings[dayType].end; i++) {
        const currentTime = new Date().getHours();
        if (i > currentTime) {
          hours.push(i);
        }
      }
      return (
        <>
          {hours.map((el, i) => (
            <Button
              variant='outlined'
              key={i}
              color='secondary'
              className={classes.timingBtn}
              onClick={() => makeAppointment(el)}
            >
              {el}:00
            </Button>
          ))}
        </>
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.left}>
          <Card elevation={0} className={classes.card}>
            <CardMedia
              component='img'
              image={`http://127.0.0.1:8090/api/files/lab_test/${test?.id}/${test?.image}`}
              alt='Package Image'
            />
            <CardActions>
              <div className={classes.flex}>
                <Typography
                  variant='h5'
                  color='primary'
                  sx={{ fontWeight: 600 }}
                >
                  Price :{' '}
                  <span style={{ fontSize: '1.2rem', color: '#7A7289' }}>
                    (incl. of Tax)
                  </span>
                </Typography>
                <Typography
                  variant='h3'
                  color='secondary'
                  sx={{ fontWeight: 700 }}
                >
                  &#8377; {test?.price}
                </Typography>
              </div>
            </CardActions>
          </Card>
        </div>
        <div className={classes.right}>
          <Typography variant='h3' color='primary' sx={{ fontWeight: 600 }}>
            {test?.name}
          </Typography>
          <div className={classes.contentContainer}>
            <Typography
              variant='h6'
              color='secondary'
              sx={{ marginBottom: '0.5rem' }}
            >
              Description :-
            </Typography>
            <div
              style={{ fontSize: '1.1rem' }}
              dangerouslySetInnerHTML={{
                __html: test?.description ? test.description : '',
              }}
            ></div>
            <span className={classes.spacer}></span>
            <Typography
              variant='h6'
              color='secondary'
              sx={{ marginBottom: '0.5rem' }}
            >
              Provided By :-
            </Typography>
            <div className={classes.flex}>
              <Typography variant='body1'>{test?.provided_by}</Typography>
              <Button
                startIcon={<LocationOnIcon />}
                variant='contained'
                color='secondary'
                target='_blank'
                href={`${test?.location}`}
              >
                Get location
              </Button>
            </div>
            <span className={classes.spacer}></span>
            <Button
              className={classes.btn}
              variant='contained'
              fullWidth
              color='secondary'
              onClick={() => setDialog(true)}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
      <Footer />
      <Dialog open={dialog ? true : false} onClose={() => setDialog(false)}>
        <DialogTitle>Choose Timings</DialogTitle>
        <DialogContent dividers className={classes.timingsContainer}>
          <div className={classes.timings}>
            <div className={classes.timingHeading}>
              <div className={classes.timingIcon}>
                <Image src={MorningImg} width='30' height='30' alt='Morning' />
              </div>
              <Typography variant='body1' color='primary'>
                Morning:
              </Typography>
            </div>
            <div className={classes.btnContainer}>
              {dialog ? getTimings('morning') : null}
            </div>
          </div>
          <div className={classes.timings}>
            <div className={classes.timingHeading}>
              <div className={classes.timingIcon}>
                <Image
                  src={AfternoonImg}
                  width='30'
                  height='30'
                  alt='Afternoon'
                />
              </div>
              <Typography variant='body1' color='primary'>
                Afternoon:
              </Typography>
            </div>
            <div className={classes.btnContainer}>
              {dialog ? getTimings('afternoon') : null}
            </div>
          </div>
          <div className={classes.timings}>
            <div className={classes.timingHeading}>
              <div className={classes.timingIcon}>
                <Image src={EveningImg} width='25' height='25' alt='Evening' />
              </div>
              <Typography variant='body1' color='primary'>
                Evening:
              </Typography>
            </div>
            <div className={classes.btnContainer}>
              {dialog ? getTimings('evening') : null}
            </div>
          </div>
          <div className={classes.timings}>
            <div className={classes.timingHeading}>
              <div className={classes.timingIcon}>
                <Image src={NightImg} width='25' height='25' alt='Night' />
              </div>
              <Typography variant='body1' color='primary'>
                Night:
              </Typography>
            </div>
            <div className={classes.btnContainer}>
              {dialog ? getTimings('night') : null}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={dialog2 ? true : false} onClose={() => setDialog2(false)}>
        <DialogTitle>Booking Successful!</DialogTitle>
        <DialogContent dividers className={classes.timingsContainer}>
          <Link
            href={test?.location ? test?.location : ''}
            target='_blank'
            className={classes.direction}
          >
            Get Direction
          </Link>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TestDetails;
