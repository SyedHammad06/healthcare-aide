import { makeStyles } from '@mui/styles';
import { NextPage } from 'next';
import Image, { StaticImageData } from 'next/image';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import Person1 from '../public/images/person1.png';
import Person2 from '../public/images/person2.png';
import Person3 from '../public/images/person3.png';
import { useRef } from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '2rem 4rem',
    textAlign: 'center',
  },
  testimonialsContainer: {
    width: '100%',
    padding: '2rem 4rem 0 4rem',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  reviewsContainer: {
    display: 'flex',
    gap: '2rem',
    height: '27rem',
    overflow: 'hidden',

    '& > div': {
      minWidth: '100%',
    },
  },
  icon: {
    width: '4rem',
    height: '4rem',
  },
  testimonials: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
  },
  name: {
    margin: '0',
    marginTop: '1rem',
  },
  designation: {
    color: 'gray',
    margin: '0.5rem',
  },
  review: {
    margin: '0 4rem',
    fontSize: '1.4rem',
    position: 'relative',

    '&:before': {
      content: '"“"',
      fontSize: '6rem',
      color: 'gray',
      position: 'absolute',
      top: '-3rem',
      left: '-1.8rem',
    },
    '&:after': {
      content: '"„"',
      fontSize: '6rem',
      color: 'gray',
      position: 'absolute',
      bottom: '-2rem',
      right: '-2rem',
    },
  },
}));

type TestimonialType = {
  img: StaticImageData;
  name: string;
  designation: string;
  review: string;
};

export const Testimonials: NextPage = () => {
  const classes = useStyles();
  const reviewRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: boolean) => {
    if (reviewRef.current) {
      direction
        ? reviewRef.current.scroll({
            left:
              reviewRef.current.scrollLeft + reviewRef.current.offsetWidth + 40,
            behavior: 'smooth',
          })
        : reviewRef.current.scroll({
            left:
              reviewRef.current.scrollLeft - reviewRef.current.offsetWidth - 40,
            behavior: 'smooth',
          });
    }
  };

  const reviews: TestimonialType[] = [
    {
      img: Person1,
      name: 'Ankit Choudary',
      designation: 'Managing Director, XYZ Company',
      review:
        'Very easy to book, maintain history. Hassle free from older versions of booking appointments via telephone. Thanks Healthcare Aide for making it simple.',
    },
    {
      img: Person2,
      name: 'Lokesh Panchal',
      designation: 'Senior Project Manager, HealthifyMe Company',
      review:
        'Healthcare Aide is exceptional, offering comprehensive and accurate information, interactive tools, and easy navigation for individuals seeking medical resources.',
    },
    {
      img: Person3,
      name: 'Aditi Krishnamurthy',
      designation: 'Junior Analyst, Acme Industries',
      review:
        'This website is well-designed and informative, providing valuable resources and easy navigation for users seeking medical information and services.',
    },
  ];

  return (
    <div className={classes.container}>
      <Typography variant='h2' color='primary'>
        What our users have to say
      </Typography>
      <div className={classes.testimonialsContainer}>
        <div>
          <IconButton
            aria-label='previous'
            size='large'
            onClick={() => scroll(false)}
          >
            <ChevronLeftIcon
              className={classes.icon}
              color='secondary'
              fontSize='inherit'
            />
          </IconButton>
        </div>
        <div className={classes.testimonials}>
          <div className={classes.reviewsContainer} ref={reviewRef}>
            {reviews.map((el, i) => (
              <div key={i}>
                <Image src={el.img} alt='person img' placeholder='empty' />
                <Typography
                  variant='h4'
                  className={classes.name}
                  color='secondary'
                >
                  {el.name}
                </Typography>
                <Typography variant='subtitle1' className={classes.designation}>
                  - {el.designation}
                </Typography>
                <Typography variant='body2' className={classes.review}>
                  {el.review}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <div>
          <IconButton
            aria-label='next'
            size='large'
            onClick={() => scroll(true)}
          >
            <ChevronRightIcon
              className={classes.icon}
              color='secondary'
              fontSize='inherit'
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
