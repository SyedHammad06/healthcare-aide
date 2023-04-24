import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Payment method
      </Typography>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id='cardName'
              label='Name on card'
              fullWidth
              autoComplete='cc-name'
              variant='standard'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id='cardNumber'
              label='Card number'
              fullWidth
              autoComplete='cc-number'
              variant='standard'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id='expDate'
              label='Expiry date'
              fullWidth
              autoComplete='cc-exp'
              variant='standard'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id='cvv'
              label='CVV'
              helperText='Last three digits on signature strip'
              fullWidth
              autoComplete='cc-csc'
              variant='standard'
            />
          </Grid>
          {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid> */}
        </Grid>
        <Box sx={{ display: 'flex', margin: '2rem 0 0.5rem 0' }}>
          <span style={{ width: '100%' }}>
            <hr />
          </span>
          <Typography variant='body1' sx={{ margin: '0 0.5rem' }}>
            OR
          </Typography>
          <span style={{ width: '100%' }}>
            <hr />
          </span>
        </Box>

        <TextField
          required
          id='upiId'
          label='UPI ID'
          fullWidth
          autoComplete='cc-exp'
          variant='standard'
        />
      </Box>
    </React.Fragment>
  );
}
