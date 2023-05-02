import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import { useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Footer } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Link from '../../src/Link';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '1.5rem',
  },
  avatarSection: {
    display: 'flex',
    gap: '0.25rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  contentSection: {
    display: 'flex',
    gap: '0.25rem',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  number: {
    fontSize: '1.1rem',
  },
  avatarContainer: {
    padding: '0.3rem',
    display: 'grid',
    placeItems: 'center',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
  },
  btn: {
    color: 'white',
    fontSize: '1.2rem',
    padding: '0.5rem 2rem',
  },
  hr: {
    height: 0,
    borderTop: '1px solid rgba(150, 150, 150, 0.5)',
  },
  labelHeading: {
    fontSize: '1.2rem',
    fontWeight: 500,
  },
}));

type UserDetailsType = {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar: string;
  phone: number;
  isDoctor: boolean;
};

interface TabPanelProps {
  index: number;
  value: number;
  children?: ReactNode;
}

interface ScheduleType {
  id: string;
  user_id: string;
  test_id?: string;
  package_id?: string;
  appointment_id?: string;
  date_time: string;
  expand: any;
}

const UserDetails: NextPage = () => {
  const router = useRouter();
  const classes = useStyles();

  //* State variables
  const [userDetails, setUserDetails] = useState<UserDetailsType>();
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [value, setValue] = useState(0);
  const [medicalRecords, setMedicalRecords] = useState('');
  const [packageData, setPacakageData] = useState<ScheduleType[]>([]);
  const [testData, setTestData] = useState<ScheduleType[]>([]);
  const [appointmentData, setAppointmentData] = useState<ScheduleType[]>([]);

  //* Functions
  useEffect(() => {
    if (router.isReady) {
      router.query.id && typeof router.query.id === 'string'
        ? setUserId(router.query.id)
        : null;
    }
  }, [router.isReady]);

  useEffect(() => {
    (async () => {
      if (userId) {
        try {
          const userRes = await axios
            .get(
              'http://127.0.0.1:8090/api/collections/users/records/' + userId
            )
            .then((res) => res.data);
          setUserDetails(userRes);
        } catch (error: any) {
          console.log(error);
          setError(error.message);
        }
        try {
          const medicalRecords = await axios
            .get(
              `http://127.0.0.1:8090/api/collections/medical_records/records?filter=(user_id='${userId}')`
            )
            .then((res) => res.data.items);
          if (medicalRecords)
            setMedicalRecords(medicalRecords[0].medical_record);
        } catch (error: any) {
          console.log(error);
          setError(error.message);
        }
        try {
          const data = await axios
            .get(
              `http://127.0.0.1:8090/api/collections/schedule/records?expand=appointment_id&filter=(user_id='${userId}')`
            )
            .then((res) => res.data.items);
          console.log(data);
          setAppointmentData(data);
        } catch (error: any) {
          setError(error.message);
        }
        try {
          const data = await axios
            .get(
              `http://127.0.0.1:8090/api/collections/test_schedule/records?expand=test_id&filter=(user_id='${userId}')`
            )
            .then((res) => res.data.items);
          setTestData(data);
        } catch (error: any) {
          setError(error.message);
        }
        try {
          const data = await axios
            .get(
              `http://127.0.0.1:8090/api/collections/package_schedule/records?expand=package_id&filter=(user_id='${userId}')`
            )
            .then((res) => res.data.items);
          setPacakageData(data);
        } catch (error: any) {
          setError(error.message);
        }
      }
    })();
  }, [userId]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
    });
  };

  const TabPanel = (props: TabPanelProps) => {
    const { value, index, children } = props;
    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && (
          <Box sx={{ px: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  //* Return
  return (
    <>
      <Navbar />
      <div style={{ minHeight: '57.2vh' }}>
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={3} className={classes.avatarSection}>
            <div className={classes.avatarContainer}>
              {userDetails?.avatar ? (
                <div className={classes.avatarContainer}>
                  <Image
                    src={`http://127.0.0.1:8090/api/files/users/${router.query.id}/${userDetails?.avatar}`}
                    width='150'
                    height='150'
                    alt='user avatar'
                  />
                </div>
              ) : (
                <AccountCircle color='secondary' fontSize='large' />
              )}
            </div>
          </Grid>
          <Grid item xs={6} className={classes.contentSection}>
            <Typography
              variant='h3'
              color='primary'
              component='h2'
              sx={{ fontWeight: 700 }}
            >
              {userDetails?.name}
            </Typography>
            <Typography variant='body1' className={classes.number}>
              {userDetails?.email}
            </Typography>
            <Typography variant='body1' className={classes.number}>
              +91{' '}
              {userDetails?.phone
                .toString()
                .replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
            </Typography>
          </Grid>
          <Grid item xs={3} className={classes.avatarSection}>
            <Typography variant='body1' color='neutral.main'>
              id: {userDetails?.id}
            </Typography>
            <Button
              variant='contained'
              color='secondary'
              className={classes.btn}
              startIcon={<EditIcon />}
            >
              Edit Profile
            </Button>
          </Grid>
        </Grid>
        <hr className={classes.hr} />
        <div className={classes.container}>
          <Box
            sx={{ border: 1, borderColor: 'divider', borderRadius: '0.5rem' }}
          >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={(_, newValue) => setValue(newValue)}
              >
                <Tab
                  label={
                    <Typography
                      variant='body1'
                      color='primary'
                      className={classes.labelHeading}
                    >
                      Medical History
                    </Typography>
                  }
                  id='0'
                  aria-controls='simple-tabpanel-0'
                  sx={{ textTransform: 'capitalize' }}
                />
                <Tab
                  label={
                    <Typography
                      variant='body1'
                      color='primary'
                      className={classes.labelHeading}
                    >
                      Schedule
                    </Typography>
                  }
                  id='1'
                  aria-controls='simple-tabpanel-1'
                  sx={{ textTransform: 'capitalize' }}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <p
                style={{ fontSize: '1.1rem' }}
                dangerouslySetInnerHTML={{
                  __html: medicalRecords,
                }}
              ></p>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <TableContainer component={Paper} sx={{ my: 3 }}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Typography
                          variant='h6'
                          color='secondary'
                          sx={{ fontWeight: 500 }}
                        >
                          Appointment Schedule
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                      <TableCell>
                        <Typography
                          variant='body1'
                          color='primary'
                          sx={{ fontSize: '1.2rem' }}
                        >
                          Appointment Date & Time
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant='body1'
                          color='primary'
                          sx={{ fontSize: '1.2rem' }}
                        >
                          Doctor Name
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant='body1'
                          color='primary'
                          sx={{ fontSize: '1.2rem' }}
                        >
                          Clinic Location
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appointmentData.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell sx={{ fontSize: '1rem' }}>
                          {formatDate(row.date_time)}
                        </TableCell>
                        <TableCell sx={{ fontSize: '1rem' }}>
                          {row.expand.appointment_id.name}
                        </TableCell>
                        <TableCell sx={{ fontSize: '1rem' }}>
                          <Link
                            href={row.expand.appointment_id.direction}
                            target='_blank'
                          >
                            {row.expand.appointment_id.direction}
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer component={Paper} sx={{ my: 3 }}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Typography variant='h6' color='secondary'>
                          Lab Tests Schedule
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                      <TableCell>
                        <Typography
                          variant='body1'
                          color='primary'
                          sx={{ fontSize: '1.2rem' }}
                        >
                          Test Date & Time
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant='body1'
                          color='primary'
                          sx={{ fontSize: '1.2rem' }}
                        >
                          Test Name
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant='body1'
                          color='primary'
                          sx={{ fontSize: '1.2rem' }}
                        >
                          Provided By
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant='body1'
                          color='primary'
                          sx={{ fontSize: '1.2rem' }}
                        >
                          Clinic Location
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {testData.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell sx={{ fontSize: '1rem' }}>
                          {formatDate(row.date_time)}
                        </TableCell>
                        <TableCell sx={{ fontSize: '1rem' }}>
                          {row.expand.test_id.name}
                        </TableCell>
                        <TableCell sx={{ fontSize: '1rem' }}>
                          {row.expand.test_id.provided_by}
                        </TableCell>
                        <TableCell sx={{ fontSize: '1rem' }}>
                          <Link
                            href={row.expand.test_id.location}
                            target='_blank'
                          >
                            {row.expand.test_id.location}
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer component={Paper} sx={{ my: 3 }}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Typography variant='h6' color='secondary'>
                          Package Schedule
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                      <TableCell>
                        <Typography
                          variant='body1'
                          color='primary'
                          sx={{ fontSize: '1.2rem' }}
                        >
                          Package Date & Time
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant='body1'
                          color='primary'
                          sx={{ fontSize: '1.2rem' }}
                        >
                          Package Name
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant='body1'
                          color='primary'
                          sx={{ fontSize: '1.2rem' }}
                        >
                          Provided By
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant='body1'
                          color='primary'
                          sx={{ fontSize: '1.2rem' }}
                        >
                          Clinic Location
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {packageData.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell sx={{ fontSize: '1rem' }}>
                          {formatDate(row.date_time)}
                        </TableCell>
                        <TableCell sx={{ fontSize: '1rem' }}>
                          {row.expand.package_id.name}
                        </TableCell>
                        <TableCell sx={{ fontSize: '1rem' }}>
                          {row.expand.package_id.provided_by}
                        </TableCell>
                        <TableCell sx={{ fontSize: '1rem' }}>
                          <Link
                            href={row.expand.package_id.location}
                            target='_blank'
                          >
                            {row.expand.package_id.location}
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </Box>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDetails;
