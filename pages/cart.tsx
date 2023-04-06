import { NextPage } from 'next';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import PaymentsIcon from '@mui/icons-material/Payments';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    padding: '0.5rem 1.5rem',
  },
  flex: {
    display: 'flex',
    gap: '1.5rem',
  },
  itemContainer: {
    flex: '70%',
    display: 'grid',
    gap: '1rem',
    margin: '0.5rem 0',
  },
  items: {
    borderRadius: 0,
    padding: '1rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    borderTop: `1px solid ${theme.palette.neutral.main}`,
    borderBottom: `1px solid ${theme.palette.neutral.main}`,
  },
  img: {
    width: '8rem',
    height: 'auto',
  },
  title: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '15ch',
  },
  vertical: {
    display: 'grid',
    placeItems: 'center',

    '& p': {
      fontSize: '1.1rem',
    },
  },
  summary: {
    flex: '30%',
  },
  prices: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0.5rem 0',
  },
  hr: {
    height: 0,
    borderTop: '1px solid rgba(150, 150, 150, 0.5)',
  },
  btn: {
    padding: '0.6rem 0',
    fontSize: '1.2rem',
  },
}));

type ItemType = {
  id: string;
  name: string;
  user_id: string;
  quantity: number;
  price: number;
  total: number;
  image: string;
};

const CartPage: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();

  //* State variables
  const [items, setItems] = useState<ItemType[]>([]);
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  //* useEffect
  useEffect(() => {
    getItems();
  }, [userId]);

  useEffect(() => {
    if (router.isReady) {
      router.query.id && typeof router.query.id === 'string'
        ? setUserId(router.query.id)
        : null;
    }
  }, [router.isReady]);

  //* User Defined functions
  const getItems = async () => {
    if (userId) {
      try {
        const cartItems = await axios
          .get(
            `http://127.0.0.1:8090/api/collections/cart/records?filter=(user_id='${userId}')`
          )
          .then((res) => res.data);
        if (cartItems) {
          setItems(cartItems.items);
        }
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  const deleteCartItem = async (id: string) => {
    try {
      const deleteItem = await axios.delete(
        `http://127.0.0.1:8090/api/collections/cart/records/${id}`
      );
      if (deleteItem) {
        getItems();
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className={classes.container}>
      <Navbar />
      <div className={classes.content}>
        <Typography variant='h3' component='h2' color='primary'>
          Cart
        </Typography>
        <div className={classes.flex}>
          <div className={classes.itemContainer}>
            {items.map((el) => (
              <Card className={classes.items} key={el.id} elevation={0}>
                <CardMedia
                  className={classes.img}
                  component='img'
                  image={el.image}
                  alt={el.name}
                />
                <CardContent
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography className={classes.title} variant='h5'>
                    {el.name}
                  </Typography>
                  <div className={classes.vertical}>
                    <Typography variant='body1'>Quantity :-</Typography>
                    <Typography variant='h5'>{el.quantity}</Typography>
                  </div>
                  <div className={classes.vertical}>
                    <Typography variant='body1'>Price :-</Typography>
                    <Typography variant='h5'>{el.price}</Typography>
                  </div>
                  <div className={classes.vertical}>
                    <Typography variant='body1'>Total :-</Typography>
                    <Typography
                      variant='h4'
                      color='secondary'
                      sx={{ fontWeight: 700 }}
                    >
                      {el.total}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <IconButton
                    size='large'
                    aria-label='Delete'
                    onClick={() => deleteCartItem(el.id)}
                  >
                    <Delete fontSize='inherit' />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </div>
          <div className={classes.summary}>
            <Typography variant='h4' color='primary' sx={{ fontWeight: 600 }}>
              Price Summary :-
            </Typography>
            <hr className={classes.hr} />
            <div className={classes.prices}>
              <Typography variant='h6'>Total :</Typography>
              <Typography
                variant='h6'
                color='secondary'
                sx={{ fontWeight: 700 }}
              >
                {items?.reduce((acc, el) => acc + el.total, 0).toFixed(2)}
              </Typography>
            </div>
            <hr className={classes.hr} />
            <div className={classes.prices}>
              <Typography variant='h6'>Discount :</Typography>
              <Typography
                variant='h6'
                color='secondary'
                sx={{ fontWeight: 700 }}
              >
                -{' '}
                {(items?.reduce((acc, el) => acc + el.total, 0) * 0.15).toFixed(
                  2
                )}
              </Typography>
            </div>
            <hr className={classes.hr} />
            <div className={classes.prices}>
              <Typography variant='h6'>GST :</Typography>
              <Typography
                variant='h6'
                color='secondary'
                sx={{ fontWeight: 700 }}
              >
                +{' '}
                {(
                  items?.reduce((acc, el) => acc + el.total, 0) *
                  0.18 *
                  2
                ).toFixed(2)}
              </Typography>
            </div>
            <hr className={classes.hr} />
            <div className={classes.prices}>
              <Typography variant='h5' sx={{ fontWeight: 500 }}>
                Grand Total :
              </Typography>
              <Typography
                variant='h6'
                color='secondary'
                sx={{ fontWeight: 800 }}
              >
                ={' '}
                {Number(
                  items?.reduce((acc, el) => acc + el.total, 0).toFixed(2)
                ) -
                  Number(
                    (
                      items?.reduce((acc, el) => acc + el.total, 0) * 0.15
                    ).toFixed(2)
                  ) +
                  Number(
                    (
                      items?.reduce((acc, el) => acc + el.total, 0) *
                      0.18 *
                      2
                    ).toFixed(2)
                  )}
              </Typography>
            </div>
            <hr className={classes.hr} />
            <Button
              className={classes.btn}
              variant='contained'
              color='primary'
              startIcon={<PaymentsIcon fontSize='large' />}
              fullWidth
            >
              Pay Now
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
