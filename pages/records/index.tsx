import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import TagIcon from '@mui/icons-material/Tag';
import Button from '@mui/material/Button';
import dynamic from 'next/dynamic';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '1.5rem',
  },
  heading: {
    marginBottom: '1.5rem',
  },
  form: {
    position: 'relative',
    width: '100%',
    padding: '0 5rem',
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
  field2: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    marginTop: '1.5rem',
  },
}));

const RecordsPage: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();

  //* State variables & useRefs
  const [records, setRecords] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [recordData, setRecordData] = useState('');

  const patientIdRef = useRef<HTMLInputElement>(null);

  //* useEffect & user-defined functions
  useEffect(() => {
    if (router.isReady) {
      router.query.id && typeof router.query.id === 'string'
        ? setUserId(router.query.id)
        : null;
    }
  }, [router.isReady]);

  useEffect(() => {
    (async () => {
      try {
        const medicalRecords = await axios
          .get(
            `http://127.0.0.1:8090/api/collections/medical_records/records?filter=(user_id='${userId}')`
          )
          .then((res) => res.data.items);
        if (medicalRecords) setRecords(medicalRecords[0].medical_record);
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      }
    })();
  }, [userId]);

  const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  });

  //* Return / Render
  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <Typography
          className={classes.heading}
          variant='h3'
          component='h2'
          color='primary'
        >
          Create / Update Medical Records
        </Typography>
        <form className={classes.form}>
          <FormControl className={classes.field}>
            <FormLabel className={classes.label} htmlFor='patient-id'>
              Patient ID :
            </FormLabel>
            <Input
              id='patient-id'
              type='text'
              color='primary'
              className={classes.input}
              startAdornment={
                <InputAdornment position='start'>
                  <TagIcon fontSize='large' color='primary' />
                </InputAdornment>
              }
              inputRef={patientIdRef}
              placeholder='xxxx23osy3qxxxx'
              required
              fullWidth
            />
          </FormControl>
          <FormControl className={classes.field2}>
            <FormLabel className={classes.label} htmlFor='record-details'>
              Record Details :
            </FormLabel>
            <QuillNoSSRWrapper
              theme='snow'
              value={recordData}
              style={{ height: '20rem' }}
            />
          </FormControl>
          <Button
            className={classes.button}
            variant='contained'
            type='submit'
            fullWidth
          >
            Create / Update
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default RecordsPage;
