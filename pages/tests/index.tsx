import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import Typography from '@mui/material/Typography';
import { Search } from '../../components/Search';
import { PackagesSection } from '../../components/PackageSection';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '1rem 1.5rem 2rem 1.5rem',
  },
  testsContainer: {},
  item: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    minHeight: '14rem',

    '& div': {
      flex: '1 0',
      padding: '0.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    },

    '& h6': {
      fontWeight: 600,
    },

    '& p': {
      fontSize: '1.2rem',
    },
  },
  price: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0.5rem 1rem',
    borderTop: '1px solid rgba(150, 150, 150, 0.5)',

    '& h4': {
      fontWeight: 600,
    },
  },
  btn: {
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: 500,
    padding: '0 1.5rem',
  },
}));

export type TestsType = {
  id: string;
  name: string;
  description: string;
  price: number;
  provided_by: string;
  location: string;
  image: string;
};

export type PackageType = {
  id: string;
  name: string;
  ideal: string;
  includes: string[];
  description: string;
  price: number;
  provided_by: string;
  location: string;
  image: string;
};

const LabTests: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();

  //* State variables
  const [tests, setTests] = useState<TestsType[]>([]);
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectValue, setSelectValue] = useState('Bengaluru');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  //* Functions
  useEffect(() => {
    if (router.isReady) {
      router.query.id && typeof router.query.id === 'string'
        ? setUserId(router.query.id)
        : null;
    }
  }, [router.isReady]);

  useEffect(() => {
    (async () => {
      try {
        const testsRes = await axios
          .get('http://127.0.0.1:8090/api/collections/lab_test/records')
          .then((res) => res.data.items);
        testsRes && setTests(testsRes);
        const packagesRes = await axios
          .get('http://127.0.0.1:8090/api/collections/packages/records')
          .then((res) => res.data.items);
        packagesRes && setPackages(packagesRes);
      } catch (error: any) {
        setError(error.message);
      }
    })();
  }, []);

  return (
    <>
      <Navbar />
      <Search
        title='lab tests'
        searchValue={searchValue}
        selectValue={selectValue}
        setSearchValue={setSearchValue}
        setSelectValue={setSelectValue}
      />
      <div className={classes.container}>
        <Typography variant='h3' component='h2'>
          Popular Packages
        </Typography>
        <PackagesSection packages={packages} userId={userId} />
        <Typography variant='h3' component='h2' sx={{ marginBottom: 3 }}>
          Book Lab Tests
        </Typography>
        <Grid className={classes.testsContainer} container spacing={3}>
          {tests.map((el) => (
            <Grid item xs={3} key={el.id}>
              <Card className={classes.item} elevation={3}>
                <div>
                  <Typography variant='h6' color='primary'>
                    {el.name}
                  </Typography>
                  <Typography variant='body1'>
                    Provided by: {el.provided_by}
                  </Typography>
                </div>
                <span className={classes.price}>
                  <Button
                    className={classes.btn}
                    variant='contained'
                    color='secondary'
                  >
                    Book
                  </Button>
                  <Typography variant='h4' color='secondary'>
                    &#8377; {el.price}
                  </Typography>
                </span>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Footer />
    </>
  );
};

export default LabTests;
