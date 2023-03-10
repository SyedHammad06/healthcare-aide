import { NextPage } from 'next';
import { Navbar } from '../components/Navbar';
import { Counter } from '../components/Counter';
import { Hero } from '../components/Hero';
import { AppointmentSection } from '../components/AppointmentsSection';
import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

export type AppointmentType = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

const useStyles = makeStyles((theme) => ({
  hr: {
    height: 0,
    borderTop: '1px solid grey',
    margin: '2rem 0',
  },
}));

const HomePage: NextPage = () => {
  const classes = useStyles();
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
      <Hero />
      <Counter />
      <AppointmentSection appointments={appointments} />
      <hr className={classes.hr} />
    </>
  );
};

export default HomePage;
