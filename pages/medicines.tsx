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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/router';
import Badge from '@mui/material/Badge';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& p': {
      display: '-webkit-box',
      '-webkit-line-clamp': 1,
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
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pagination: {
    width: '100%',
    margin: '2rem 0',
    display: 'grid',
    placeItems: 'center',
  },
  price: {
    width: '100%',
    fontWeight: 600,
    marginTop: '0.5rem',
    textAlign: 'end',
    color: theme.palette.primary.main,
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
  const router = useRouter();

  //* State variables
  const [searchValue, setSearchValue] = useState('');
  const [count, setCount] = useState<CountType[]>([]);
  const [medicines, setMedicines] = useState<MedicineDataType[]>([]);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);
  const [userId, setUserId] = useState('');

  //* useEffects
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

  useEffect(() => {
    if (router.isReady) {
      router.query.id && typeof router.query.id === 'string'
        ? setUserId(router.query.id)
        : null;
    }
  }, [router.isReady]);

  //* User Defined Functions
  const updateCount = (id: string, type?: boolean) => {
    const medicine = count.find((el: CountType) => el.id === id);
    if (medicine) {
      medicine.count = type
        ? medicine.count + 1
        : medicine.count > 1
        ? medicine.count - 1
        : 1;
      setCount([...count.filter((el) => el.id !== id), medicine]);
    } else {
      setCount([...count, { id: id, count: 2 }]);
    }
  };

  const addToCart = async (id: string) => {
    const item = medicines.find((el) => el.id === id);
    const quantity = count.find((el) => el.id === id);
    if (item && quantity && userId) {
      const cartDetails = {
        name: item.name,
        user_id: userId,
        quantity: quantity.count,
        price: item.price,
        image: item.image,
        total: (item.price * quantity.count).toFixed(2),
      };
      try {
        const cartRes = await axios.post(
          'http://127.0.0.1:8090/api/collections/cart/records',
          cartDetails
        );
        if (cartRes) {
          setAdded(true);
          window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        }
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      }
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
        <div className={classes.flex}>
          <Typography
            variant='h3'
            component='h2'
            color='primary'
            sx={{ marginTop: '1rem' }}
          >
            Purchase Medicines
          </Typography>
          <Badge
            color='secondary'
            badgeContent={'.'}
            invisible={!added}
            sx={{ fontSize: '1.5rem' }}
          >
            <Button
              variant='contained'
              endIcon={<ShoppingCartIcon fontSize='inherit' />}
              size='large'
              aria-label='Cart Icon'
              color='primary'
              onClick={() => router.push(`/cart?id=${userId}`)}
            >
              View Cart
            </Button>
          </Badge>
        </div>
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
                <Typography variant='body1' color='primary' component='p'>
                  Pack Size: {el.pack_size}
                </Typography>
                <Typography
                  className={classes.price}
                  variant='h5'
                  color='primary'
                  component='p'
                >
                  &#8377; {el.price}
                </Typography>
              </CardContent>
              <CardActions className={classes.cardActions}>
                <div className={classes.count}>
                  <Button
                    className={classes.countBtn}
                    variant='outlined'
                    onClick={() => updateCount(el.id, false)}
                  >
                    -
                  </Button>
                  <Button
                    className={classes.countBtn}
                    variant='outlined'
                    sx={{ fontWeight: 900 }}
                  >
                    {count.find((ele) => ele.id === el.id)
                      ? count.find((ele) => ele.id === el.id)?.count
                      : 1}
                  </Button>
                  <Button
                    className={classes.countBtn}
                    variant='outlined'
                    onClick={() => updateCount(el.id, true)}
                  >
                    +
                  </Button>
                </div>
                <Button
                  className={classes.cardBtn}
                  variant='contained'
                  color='secondary'
                  size='large'
                  startIcon={<ShoppingCart fontSize='inherit' />}
                  sx={{ color: 'white' }}
                  onClick={() => addToCart(el.id)}
                >
                  Add
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
        <div className={classes.pagination}>
          <Pagination count={10} color='secondary' size='large' />
        </div>
      </div>
      <Footer />
      {added ? (
        <Snackbar
          open={added ? true : false}
          autoHideDuration={5000}
          onClose={() => setAdded(false)}
        >
          <Alert
            variant='filled'
            severity='success'
            onClose={() => setAdded(false)}
            sx={{ fontSize: '1.1rem' }}
          >
            Added to cart
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
};

export default MedicinesPage;
