import { NextPage } from 'next';
import { Navbar } from '../components/Navbar';
import { Counter } from '../components/Counter';
import { Hero } from '../components/Hero';
import { AppointmentSection } from '../components/AppointmentsSection';
import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Testimonials } from '../components/Testimonials';
import axios from 'axios';
import Image from 'next/image';
import Logo from '../public/images/logo-light.png';
import Typography from '@mui/material/Typography';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { useRouter } from 'next/router';

export type AppointmentType = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

const useStyles = makeStyles((theme) => ({
  hr: {
    height: 0,
    borderTop: '1px solid rgba(150, 150, 150, 0.5)',
  },
  logo: {},
  footer: {
    color: 'white',
    padding: '20px 40px',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,

    '& > div': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem',
      margin: '30px 0',
    },

    '& span': {
      fontSize: '1.2rem',
    },

    '& > div:last-of-type': {
      gap: '0.5rem',
    },
  },
}));

const HomePage: NextPage = () => {
  const classes = useStyles();

  const router = useRouter();

  const [appointments, setAppointments] = useState<AppointmentType[]>([]);

  useEffect(() => {
    (async () => {
      const data = await axios
        .get('http://127.0.0.1:8090/api/collections/fields/records')
        .then((res) => res.data.items);
      setAppointments(data);
    })();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Counter />
        <AppointmentSection appointments={appointments} />
        <hr className={classes.hr} />
        <Testimonials />
      </main>
      <footer className={classes.footer}>
        <div>
          <Image src={Logo} alt='logo' className={classes.logo} />
          <Typography variant='h1'>Healthcare Aide</Typography>
        </div>
        <div>
          <Typography variant='body1' component='span'>
            Copyright
          </Typography>
          <CopyrightIcon />
          <Typography variant='body1' component='span'>
            2023, Healthcare Aide. All rights registered.
          </Typography>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
