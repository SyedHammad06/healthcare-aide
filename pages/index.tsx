import { NextPage } from 'next';
import { makeStyles } from '@mui/styles';
import { Navbar } from '../components/Navbar';

const useStyles = makeStyles((theme) => ({}));

const HomePage: NextPage = () => {
  const classes = useStyles();

  return (
    <>
      <Navbar />
    </>
  );
};

export default HomePage;
