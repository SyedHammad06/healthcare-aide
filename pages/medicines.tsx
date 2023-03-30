import { NextPage } from 'next';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Search } from '../components/Search';
import { Navbar } from '../components/Navbar';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { Footer } from '../components/Footer';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '0 1.5rem',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    margin: '1rem 0',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardMedia: {
    width: 300,
    height: 200,
  },
  cardContent: {
    '& p': {
      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
    },
  },
  cardActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'space-between',
    borderTop: '1px solid rgba(150, 150, 150, 0.5)',
  },
  cardBtn: {
    fontWeight: 600,
    fontSize: '1.1rem',
    textTransform: 'capitalize',
  },
  count: {},
  countBtn: {
    minWidth: '3rem',
    padding: '0.6rem 0',
  },
}));

export type MedicineDataType = {
  id: string;
  name: string;
  image: string;
  pack_size: string;
  price: number;
  mrp: number;
  rating_count: number;
  rating: number;
};

type CountType = {
  id: string;
  count: number;
};

const MedicinesPage: NextPage = () => {
  const classes = useStyles();

  const [searchValue, setSearchValue] = useState('');
  const [count, setCount] = useState<CountType[]>([]);
  const [medicines, setMedicines] = useState<MedicineDataType[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const medicineData = await axios
          .get('http://127.0.0.1:8090/api/collections/medicines/records')
          .then((res) => res.data.items);
        if (medicineData) {
          setMedicines(medicineData);
        }
      } catch (error: any) {
        setError(error.message);
      }
    })();
  }, []);

  const updateCount = (id: string, type?: boolean) => {
    const medicine = count.filter((el: CountType) => el.id === id);
    if (medicine) {
      console.log(medicine);
      type ? medicine[0].count + 1 : medicine[0].count - 1;
      setCount([...count, medicine[0]]);
    } else {
      setCount([...count, { id: id, count: 1 }]);
      return 1;
    }
  };

  return (
    <>
      <Navbar />
      <Search
        title='medicines'
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div className={classes.container}>
        <Typography
          variant='h3'
          component='h2'
          color='primary'
          sx={{ marginTop: '1rem' }}
        >
          Purchase Medicines
        </Typography>
        <div className={classes.cardContainer}>
          {medicines.map((el) => (
            <Card key={el.id} className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                component='img'
                image={el.image}
                alt={el.name}
              />
              <CardContent className={classes.cardContent}>
                <Typography variant='h6' color='primary' component='p'>
                  {el.name}
                </Typography>
              </CardContent>
              <CardActions className={classes.cardActions}>
                <div className={classes.count}>
                  <Button
                    className={classes.countBtn}
                    variant='outlined'
                    onClick={() => updateCount(el.id, true)}
                  >
                    -
                  </Button>
                  <Button
                    className={classes.countBtn}
                    variant='outlined'
                    sx={{ fontWeight: 900 }}
                  >
                    {count.filter((ele) => ele.id === el.id)[0]
                      ? count.filter((ele) => ele.id === el.id)[0].count
                      : 1}
                  </Button>
                  <Button
                    className={classes.countBtn}
                    variant='outlined'
                    onClick={() => updateCount(el.id, false)}
                  >
                    +
                  </Button>
                </div>
                <Button
                  className={classes.cardBtn}
                  variant='contained'
                  color='primary'
                  size='large'
                  startIcon={<ShoppingCart fontSize='inherit' />}
                >
                  Cart
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MedicinesPage;
