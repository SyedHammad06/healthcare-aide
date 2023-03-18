import { NextPage } from 'next';
import { Navbar } from '../components/Navbar';
import { Counter } from '../components/Counter';
import { Hero } from '../components/Hero';
import { AppointmentSection } from '../components/AppointmentsSection';
import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Testimonials } from '../components/Testimonials';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Footer } from '../components/Footer';

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
}));

const HomePage: NextPage = () => {
  const classes = useStyles();

  const router = useRouter();

  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    (async () => {
      const data = await axios
        .get('http://127.0.0.1:8090/api/collections/fields/records')
        .then((res) => res.data.items);
      setAppointments(data);
    })();
  }, []);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.id && typeof router.query.id === 'string') {
        setUserId(router.query.id);
      }
    }
  }, [router.isReady]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Counter />
        <AppointmentSection userId={userId} appointments={appointments} />
        <hr className={classes.hr} />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
