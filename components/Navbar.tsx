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
}));

export const Navbar: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();

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
          <IconButton
            aria-label='user profile'
            onClick={() => router.replace('/login')}
          >
            <AccountCircle color='secondary' fontSize='large' />
          </IconButton>
        </div>
      </nav>
    </Box>
  );
};
