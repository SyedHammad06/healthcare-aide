import { NextPage } from 'next';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import HeroImg from '../public/images/hero.png';
import Feature1 from '../public/images/feature1.png';
import Feature2 from '../public/images/feature2.png';
import Feature3 from '../public/images/feature3.png';
import Feature4 from '../public/images/feature4.png';

const useStyles = makeStyles((theme) => ({
  bgColor: {
    backgroundColor: theme.palette.primary.light,
  },
  hero: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 4rem',
  },
  left: {
    flex: '55%',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  right: {
    flex: '45%',
    height: '80vh',
  },
  rightImg: {
    position: 'relative',
    width: '100%',
    height: '80vh',
  },
  featuresContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  features: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    '& > *': {
      flex: '50%',
    },
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  featureIcon: {
    width: '3.5rem',
    height: '3.5rem',
    marginTop: '0.5rem',
  },
  featureContent: {
    marginRight: '10%',
    '& p': {
      color: theme.palette.primary.dark,
    },
  },
}));

export const Hero: NextPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.bgColor}>
      <Container className={classes.hero} maxWidth='xl'>
        <div className={classes.left}>
          <Typography
            variant='h1'
            component='h1'
            color='secondary'
            sx={{ fontWeight: 700 }}
          >
            Protect Your Life And Take Care Of Your Health
          </Typography>
          <div className={classes.featuresContainer}>
            <div className={classes.features}>
              <div className={classes.row}>
                <div className={classes.featureIcon}>
                  <Image src={Feature1} alt='feature 1' layout='responsive' />
                </div>
                <div className={classes.featureContent}>
                  <Typography variant='h6' color='primary'>
                    Book an appointment
                  </Typography>
                  <Typography variant='body2'>
                    Book an appointment with a doctor to discuss health concerns
                    and receive treatment.
                  </Typography>
                </div>
              </div>
              <div className={classes.row}>
                <div className={classes.featureIcon}>
                  <Image src={Feature3} alt='feature 2' layout='responsive' />
                </div>
                <div className={classes.featureContent}>
                  <Typography variant='h6' color='primary'>
                    Track your medical records
                  </Typography>
                  <Typography variant='body2'>
                    Your medical records are managed in a digital format and
                    shared only with authorized healthcare with your consent.
                  </Typography>
                </div>
              </div>
            </div>
            <div className={classes.features}>
              <div className={classes.row}>
                <div className={classes.featureIcon}>
                  <Image src={Feature2} alt='feature 1' layout='responsive' />
                </div>
                <div className={classes.featureContent}>
                  <Typography variant='h6' color='primary'>
                    Buy medicines
                  </Typography>
                  <Typography variant='body2'>
                    We ensure our customers get 100% genuine medicines with the
                    highest savings in the shortest time possible.
                  </Typography>
                </div>
              </div>
              <div className={classes.row}>
                <div className={classes.featureIcon}>
                  <Image src={Feature4} alt='feature 2' layout='responsive' />
                </div>
                <div className={classes.featureContent}>
                  <Typography variant='h6' color='primary'>
                    Book lab tests
                  </Typography>
                  <Typography variant='body2'>
                    Book lab tests with certified lab practitioner and get
                    yourself tested for various diseases.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.right}>
          <div className={classes.rightImg}>
            <Image
              src={HeroImg}
              alt='Hero image'
              layout='fill'
              objectFit='contain'
            />
          </div>
        </div>
      </Container>
    </div>
  );
};
