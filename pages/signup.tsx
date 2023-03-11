import Person from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Email from '@mui/icons-material/Email';
import Password from '@mui/icons-material/Password';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { NextPage } from 'next';
import { FormEvent, useRef, useState } from 'react';
import Link from '../src/Link';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import { useRouter } from 'next/router';

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
    padding: '5rem 5rem 2rem 5rem',
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
      flex: '13.5rem',
    },

    '& > div': {
      flex: 'calc(100% - 15rem)',
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
  alt: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: theme.palette.secondary.main,
    textDecoration: 'none',
  },
  switch: {
    marginLeft: '13.5rem',

    '& span:last-of-type': {
      fontSize: '1.4rem',
      fontWeight: '600',
      color: theme.palette.primary.main,
    },
  },
  error: {
    position: 'absolute',
    bottom: '1rem',
    left: '1rem',

    '& > div': {
      fontSize: '1.1rem',
    },
  },
}));

const SignUpPage: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();

  //* State variables
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  //* Ref variables
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const isDoctorRef = useRef<HTMLInputElement>(null);

  //* Submit function
  const signUpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      nameRef.current &&
      emailRef.current &&
      phoneRef.current &&
      passwordRef.current &&
      confirmPasswordRef.current &&
      isDoctorRef.current
    ) {
      if (passwordRef.current.value === confirmPasswordRef.current.value) {
        const body = {
          name: nameRef.current.value,
          email: emailRef.current.value,
          phoneRef: phoneRef.current.value,
          password: passwordRef.current.value,
          passwordConfirm: confirmPasswordRef.current.value,
          isDoctor: isDoctorRef.current.checked,
          emailVisibility: true,
        };

        try {
          const user = await axios
            .get(
              `http://127.0.0.1:8090/api/collections/users/records?filter=(email='${emailRef.current.value}')`
            )
            .then((res) => res.data);
          if (user.items.length > 0) {
            throw new Error('User already present!');
          }
          const data = await axios
            .post('http://127.0.0.1:8090/api/collections/users/records', body)
            .then((res) => res.data);
          if (data) {
            router.replace('/');
          }
        } catch (error: any) {
          setError(error.message);
        }
      } else {
        setError("Passwords don't match");
      }
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className={classes.top}>
        <Typography variant='h1' className={classes.heading}>
          Sign up
        </Typography>
      </div>
      <form className={classes.form} onSubmit={signUpSubmit}>
        <FormControl className={classes.field}>
          <FormLabel className={classes.label} htmlFor='name'>
            Name :
          </FormLabel>
          <Input
            id='name'
            type='text'
            color='primary'
            className={classes.input}
            startAdornment={
              <InputAdornment position='start'>
                <Person fontSize='large' color='primary' />
              </InputAdornment>
            }
            inputRef={nameRef}
            required
            fullWidth
          />
        </FormControl>
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
            required
            fullWidth
          />
        </FormControl>
        <FormControl className={classes.field}>
          <FormLabel className={classes.label} htmlFor='phone'>
            Phone number :
          </FormLabel>
          <Input
            id='phone'
            type='number'
            color='primary'
            className={classes.input}
            startAdornment={
              <InputAdornment position='start'>
                <LocalPhoneIcon fontSize='large' color='primary' />
              </InputAdornment>
            }
            inputProps={{
              minLength: 10,
              maxLength: 12,
            }}
            inputRef={phoneRef}
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
            inputProps={{
              minLength: 7,
            }}
            inputRef={passwordRef}
            required
            fullWidth
          />
        </FormControl>
        <FormControl className={classes.field}>
          <FormLabel className={classes.label} htmlFor='passwordConfirm'>
            Confirm Password :
          </FormLabel>
          <Input
            id='passwordConfirm'
            type={showConfirmPassword ? 'text' : 'password'}
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
                  onClick={() => setConfirmShowPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <VisibilityOff fontSize='medium' color='primary' />
                  ) : (
                    <Visibility fontSize='medium' color='primary' />
                  )}
                </IconButton>
              </InputAdornment>
            }
            inputProps={{
              minLength: 7,
            }}
            inputRef={confirmPasswordRef}
            required
            fullWidth
          />
        </FormControl>
        <FormControl className={classes.field}>
          <FormControlLabel
            control={<Switch inputRef={isDoctorRef} />}
            label='Are you a doctor?'
            className={classes.switch}
          />
        </FormControl>
        <Button
          className={classes.button}
          variant='contained'
          type='submit'
          fullWidth
        >
          Sign up
        </Button>
        <Link className={classes.alt} href='/login'>
          Already have an account? Login
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

export default SignUpPage;
