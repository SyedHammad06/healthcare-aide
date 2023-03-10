import { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Logo } from '../public/logo';
import Link from '../src/Link';
import Notifications from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    marginLeft: '0.5rem',

    '& svg': {
      width: '2.5rem',
      height: 'auto',
    },

    '& h2': {
      fontWeight: 700,
    },
  },

  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',

    '& ul': {
      display: 'flex',
      gap: '1rem',
    },

    '& li': {
      listStyle: 'none',
    },

    '& li a': {
      color: theme.palette.neutral.main,
      fontWeight: '600',
      opacity: '50%',
      textDecoration: 'none',
      fontSize: '1.2rem',
      padding: '0.5rem',
    },
  },
  navIcon: {
    display: 'flex',
    gap: '0.5rem',
  },
  avatarContainer: {
    padding: '0.3rem',
    display: 'grid',
    placeItems: 'center',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
  },
}));

export const Navbar: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();

  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    console.log(router.query.id);
    (async () => {
      if (router.query.id) {
        const user = await axios
          .get(
            `http://127.0.0.1:8090/api/collections/users/records/${router.query.id}`
          )
          .then((res) => res.data);
        console.log(user);
        if (user.avatar) {
          setAvatar(user.avatar);
        }
      }
    })();
  }, []);

  const onUserIconClick = () => {
    if (!router.query.id) {
      router.push('/login');
    } else {
      router.push(`/user?id=${router.query.id}`);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'primary.light',
        padding: 2,
      }}
    >
      <header className={classes.header}>
        <Logo />
        <Typography variant='h6' component='h2' color='secondary'>
          Healthcare Aide
        </Typography>
      </header>
      <nav className={classes.nav}>
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/medicines'>Purchase Medicines</Link>
          </li>
          <li>
            <Link href='/tests'>Lab Tests</Link>
          </li>
        </ul>
        <div className={classes.navIcon}>
          <IconButton aria-label='notifications'>
            <Notifications color='secondary' fontSize='large' />
          </IconButton>
          <IconButton aria-label='user profile' onClick={onUserIconClick}>
            {avatar ? (
              <div className={classes.avatarContainer}>
                <Image
                  src={`http://127.0.0.1:8090/api/files/users/${router.query.id}/${avatar}`}
                  width='40'
                  height='40'
                  alt='user avatar'
                />
              </div>
            ) : (
              <AccountCircle color='secondary' fontSize='large' />
            )}
          </IconButton>
        </div>
      </nav>
    </Box>
  );
};
