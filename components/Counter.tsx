import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { NextPage } from 'next';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  counter: {
    position: 'relative',
    width: 'clamp(20rem, 50%, 50rem)',
    marginLeft: 'auto',
    marginTop: '-3.5rem',
    zIndex: '1',
  },
  paper: {
    borderRadius: '0.5rem 0 0 0.5rem',
    padding: '1rem 0',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

type CounterData = {
  title: string;
  count: number;
};

export const Counter: NextPage = () => {
  const classes = useStyles();

  const counterData: CounterData[] = [
    { title: 'Doctors', count: 100 },
    { title: 'Patients', count: 750 },
    { title: 'Lab Tests', count: 250 },
    { title: 'Medicines Sold', count: 800 },
  ];

  return (
    <div className={classes.counter}>
      <Paper className={classes.paper} elevation={4}>
        {counterData.map((el, i) => (
          <div key={i} className={classes.stats}>
            <Typography variant='h4' color='secondary' sx={{ fontWeight: 600 }}>
              {el.count}
            </Typography>
            <Typography variant='body1' sx={{ fontSize: '1.2rem' }}>
              {el.title}
            </Typography>
          </div>
        ))}
      </Paper>
    </div>
  );
};
