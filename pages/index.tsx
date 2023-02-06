import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Link from '../src/Link';
import ProTip from '../src/ProTip';
import Copyright from '../src/Copyright';

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Container maxWidth='lg'>
      <div className={classes.main}>
        <Typography variant='h4' component='h1' gutterBottom>
          MUI v5 + Next.js with TypeScript example
        </Typography>
        <Link href='/about' color='secondary'>
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
        <Typography variant='h1' color='initial'>
          H1
        </Typography>
        <Typography variant='h2' color='initial'>
          H2
        </Typography>
        <Typography variant='h3' color='initial'>
          H3
        </Typography>
        <Typography variant='h4' color='initial'>
          H4
        </Typography>
        <Typography variant='h5' color='initial'>
          H5
        </Typography>
        <Typography variant='h6' color='initial'>
          H6
        </Typography>
      </div>
    </Container>
  );
}
