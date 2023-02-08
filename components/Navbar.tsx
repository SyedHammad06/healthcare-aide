import { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Logo } from '../public/logo';
import Link from '../src/Link';
import Notifications from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',

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
      gap: '2rem',
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
    },
  },

  navIcon: {
    display: 'flex',
    gap: '1rem',
  },
}));

export const Navbar: NextPage = () => {
  const classes = useStyles();

  return (
    <Container
      maxWidth='xl'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'primary.light',
        paddingY: 2,
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
          <Notifications color='secondary' fontSize='large' />
          <AccountCircle color='secondary' fontSize='large' />
        </div>
      </nav>
    </Container>
  );
};
