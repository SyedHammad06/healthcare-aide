import { NextPage } from 'next';
import { makeStyles } from '@mui/styles';
import { Navbar } from '../../components/Navbar';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FormControl from '@mui/material/FormControl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Image from 'next/image';
import Button from '@mui/material/Button';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Box from '@mui/material/Box';
import { Footer } from '../../components/Footer';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import MorningImg from '../../public/images/morning.png';
import AfternoonImg from '../../public/images/afternoon.png';
import EveningImg from '../../public/images/evening.png';
import NightImg from '../../public/images/night.png';
import Link from '../../src/Link';
import { Search } from '../../components/Search';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '0.5rem 1.5rem 1rem 1.5rem',
  },
  heading: {
    '& span': {
      textTransform: 'capitalize',
    },
  },
  cardContainer: {
    margin: '0.5rem 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',

    '& > div': {
      width: '100%',
    },
  },
  card: {
    width: '100%',
    marginTop: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '0.6rem',
  },
  imgContainer: {
    position: 'relative',
    width: '10rem',
    height: '10rem',
    borderRadius: '50%',
    overflow: 'hidden',
    margin: '0 auto',
  },
  btn: {
    padding: '0.8rem 2rem',
    fontSize: '1.2rem',
  },
  name: {
    fontWeight: 500,
  },
  fieldText: {
    fontWeight: 600,
  },
  fee: {
    fontWeight: 700,

    '& span': {
      color: 'black',
      fontSize: '1.1rem',
    },
  },
  address: {
    fontSize: '1.1rem',
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
  hr: {
    height: 0,
    borderTop: '1px solid rgba(150, 150, 150, 0.5)',
  },
}));

type DayType = {
  start: number;
  end: number;
};

export type TimingsType = {
  morning?: DayType;
  afternoon?: DayType;
  evening?: DayType;
  night?: DayType;
};

type AppointmentDoctorType = {
  id: number;
  name: string;
  address: string;
  fee: number;
  img: string;
  field: string;
  timings: TimingsType | any;
  direction: string;
};

const AppointmentPage: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();

  //* State variables
  const [field, setField] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const [dialog, setDialog] = useState<number>();
  const [dialog2, setDialog2] = useState('');
  const [appointments, setAppointments] = useState<AppointmentDoctorType[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectValue, setSelectValue] = useState('Bengaluru');

  useEffect(() => {
    (async () => {
      try {
        const titleRes = await axios
          .get(`http://127.0.0.1:8090/api/collections/fields/records/${field}`)
          .then((res) => res.data);
        setTitle(titleRes.title);
      } catch (error: any) {
        setError(error.message);
      }
    })();
  }, [field]);

  useEffect(() => {
    (async () => {
      try {
        const appointmentRes = await axios
          .get(
            `http://127.0.0.1:8090/api/collections/appointments/records?filter=(field='${field}')`
          )
          .then((res) => res.data);
        setAppointments(appointmentRes.items);
      } catch (error: any) {
        setError(error.message);
      }
    })();
  }, [field]);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.field) {
        setField(router.query.field[0]);
        router.query.id && typeof router.query.id === 'string'
          ? setUserId(router.query.id)
          : null;
      }
    }
  }, [router.isReady]);

  const makeAppointment = async (id: number, time: number) => {
    if (userId) {
      const currentDate = new Date();
      currentDate.setHours(time);
      currentDate.setMinutes(0);
      currentDate.setSeconds(0);
      const body = {
        user_id: userId,
        appointment_id: id,
        date_time: new Date(currentDate),
      };
      console.log(body);
      try {
        const appointmentRes = await axios.post(
          'http://127.0.0.1:8090/api/collections/schedule/records',
          body
        );
        if (appointmentRes) {
          setDialog2(appointments.filter((el) => el.id === id)[0].direction);
        }
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  const getTimings = (id: number, dayType: any) => {
    const timings = appointments.filter((el) => el.id === id);
    if (timings && timings[0].timings[dayType]) {
      const hours: number[] = [];
      for (
        let i = timings[0].timings[dayType].start;
        i <= timings[0].timings[dayType].end;
        i++
      ) {
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
              onClick={() => makeAppointment(id, el)}
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
      <Search
        title={title}
        searchValue={searchValue}
        selectValue={selectValue}
        setSearchValue={setSearchValue}
        setSelectValue={setSelectValue}
      />
      <div className={classes.container}>
        <Typography variant='h4' component='h2' className={classes.heading}>
          <span>{title}</span>'s available in {selectValue}
        </Typography>
        <div className={classes.cardContainer}>
          {appointments.map((el) => (
            <div key={el.id}>
              <hr className={classes.hr} />
              <div className={classes.card}>
                <Box className={classes.col} sx={{ flex: '20%' }}>
                  <div className={classes.imgContainer}>
                    <Image
                      src={`http://127.0.0.1:8090/api/files/appointments/${el.id}/${el.img}`}
                      alt='doctor img'
                      layout='fill'
                      objectFit='cover'
                    />
                  </div>
                </Box>
                <Box
                  className={classes.col}
                  sx={{
                    flex: '60%',
                  }}
                >
                  <div>
                    <Typography
                      variant='h5'
                      component='h3'
                      className={classes.name}
                    >
                      Dr. {el.name}
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      color='secondary'
                      className={classes.fieldText}
                    >
                      {title}
                    </Typography>
                  </div>
                  <Typography variant='body1' className={classes.address}>
                    Address: {el.address}
                  </Typography>
                  <Typography
                    variant='h6'
                    className={classes.fee}
                    color='secondary'
                  >
                    &#8377; {el.fee} <span>Consultation Fees</span>
                  </Typography>
                </Box>
                <Box className={classes.col} sx={{ flex: '20%' }}>
                  <Button
                    startIcon={<LocalHospitalIcon fontSize='inherit' />}
                    variant='contained'
                    color='primary'
                    size='large'
                    className={classes.btn}
                    onClick={() => setDialog(el.id)}
                  >
                    Book Clinic Visit
                  </Button>
                </Box>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <Dialog open={dialog ? true : false} onClose={() => setDialog(undefined)}>
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
              {dialog ? getTimings(dialog, 'morning') : null}
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
              {dialog ? getTimings(dialog, 'afternoon') : null}
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
              {dialog ? getTimings(dialog, 'evening') : null}
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
              {dialog ? getTimings(dialog, 'night') : null}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={dialog2 ? true : false} onClose={() => setDialog2('')}>
        <DialogTitle>Booking Successful!</DialogTitle>
        <DialogContent dividers className={classes.timingsContainer}>
          <Link href={dialog2} target='_blank' className={classes.direction}>
            Get Direction
          </Link>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentPage;
