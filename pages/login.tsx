import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import { NextPage } from 'next';
import { FormEvent, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Email from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import Password from '@mui/icons-material/Password';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import Link from '../src/Link';
import FormHelperText from '@mui/material/FormHelperText';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const useStyles = makeStyles((theme) => ({
  top: {
    width: '100%',
    padding: '7rem 5rem',
    backgroundImage: `url(images/login.jpg)`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  heading: {
    fontSize: '5rem',
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
  },
  form: {
    position: 'relative',
    width: '100%',
    padding: '5rem 5rem 0 5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  field: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',

    '& > label': {
      flex: '10rem',
    },

    '& > div': {
      flex: 'calc(100% - 13rem)',
      marginTop: 'unset',
    },
  },
  label: {
    display: 'inline-block',
    fontSize: '1.6rem',
    color: theme.palette.primary.main,
  },
  input: {
    fontSize: '1.6rem',

    '&::after': {
      borderBottom: `4px solid ${theme.palette.primary.main}`,
    },
  },
  button: {
    fontSize: '1.4rem',
  },
  forgot: {
    fontSize: '1.2rem',
    marginLeft: 'auto',
    marginTop: '-1rem',

    '& a': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
    },
  },
  alt: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: theme.palette.secondary.main,
    textDecoration: 'none',
  },
  error: {
    position: 'absolute',
    bottom: '-3rem',
    left: '1rem',

    '& > div': {
      fontSize: '1.1rem',
    },
  },
}));

const LoginPage: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();

  //* State variable
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  //* Ref variables
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //* Login Submit method
  const loginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailRef.current && passwordRef.current) {
      try {
        const users = await axios
          .get(
            `http://127.0.0.1:8090/api/collections/users/records?filter=(email='${emailRef.current.value}')`
          )
          .then((res) => res.data.items[0]);

        if (users) {
          const password = await axios.post(
            'http://127.0.0.1:8090/api/collections/users/auth-with-password',
            {
              identity: emailRef.current.value,
              password: passwordRef.current.value,
            }
          );

          if (password) {
            router.replace(`/?id=${users.id}`);
          } else {
            setError('Password incorrect!');
          }
        }
      } catch (error) {
        setError('Email or Password incorrect!');
      }
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className={classes.top}>
        <Typography variant='h1' className={classes.heading}>
          Login
        </Typography>
      </div>
      <form className={classes.form} onSubmit={loginSubmit}>
        <FormControl className={classes.field}>
          <FormLabel className={classes.label} htmlFor='email'>
            Email Address :
          </FormLabel>
          <Input
            id='email'
            type='email'
            color='primary'
            className={classes.input}
            startAdornment={
              <InputAdornment position='start'>
                <Email fontSize='large' color='primary' />
              </InputAdornment>
            }
            inputRef={emailRef}
            placeholder='johndoe@example.com'
            required
            fullWidth
          />
        </FormControl>
        <FormControl className={classes.field}>
          <FormLabel className={classes.label} htmlFor='password'>
            Password :
          </FormLabel>
          <Input
            id='password'
            type={showPassword ? 'text' : 'password'}
            color='primary'
            className={classes.input}
            startAdornment={
              <InputAdornment position='start'>
                <Password fontSize='large' color='primary' />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='show password'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <VisibilityOff fontSize='medium' color='primary' />
                  ) : (
                    <Visibility fontSize='medium' color='primary' />
                  )}
                </IconButton>
              </InputAdornment>
            }
            inputRef={passwordRef}
            placeholder='*******'
            required
            fullWidth
          />
        </FormControl>
        <FormHelperText className={classes.forgot}>
          <Link href='/forgotpassword'>Forgot Password?</Link>
        </FormHelperText>
        <Button
          className={classes.button}
          variant='contained'
          type='submit'
          fullWidth
        >
          Login
        </Button>
        <Link className={classes.alt} href='/signup'>
          New User? Sign Up
        </Link>
      </form>
      {error ? (
        <Snackbar
          className={classes.error}
          open={error ? true : false}
          autoHideDuration={5000}
          onClose={() => setError('')}
        >
          <Alert variant='filled' severity='error' onClose={() => setError('')}>
            {error}
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
};

export default LoginPage;
