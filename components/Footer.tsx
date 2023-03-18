import { makeStyles } from '@mui/styles';
import { NextPage } from 'next';
import Image from 'next/image';
import Logo from '../public/images/logo-light.png';
import Typography from '@mui/material/Typography';
import CopyrightIcon from '@mui/icons-material/Copyright';

const useStyles = makeStyles((theme) => ({
  footer: {
    color: 'white',
    padding: '20px 40px',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,

    '& > div': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem',
      margin: '30px 0',
    },

    '& span': {
      fontSize: '1.2rem',
    },

    '& > div:last-of-type': {
      gap: '0.5rem',
    },
  },
}));

export const Footer: NextPage = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div>
        <Image src={Logo} alt='logo' />
        <Typography variant='h1'>Healthcare Aide</Typography>
      </div>
      <div>
        <Typography variant='body1' component='span'>
          Copyright
        </Typography>
        <CopyrightIcon />
        <Typography variant='body1' component='span'>
          2023, Healthcare Aide. All rights registered.
        </Typography>
      </div>
    </footer>
  );
};
