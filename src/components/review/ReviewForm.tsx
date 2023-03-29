import { Box, Rating, TextField, Typography } from '@mui/material';
import { useState } from 'react';

function ReviewForm() {
  const [ratingValue, setRatingValue] = useState<number | null>(0);

  const handleClick = () => {
    console.log('Leaving a review');
  };
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignContents: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '2.5%',
        }}
      >
        <Rating
          sx={{ fontSize: '4vw' }}
          name="simple-controlled"
          value={ratingValue}
          size="large"
          onChange={(e, newValue) => {
            setRatingValue(newValue);
          }}
        />
        <TextField
          sx={{ width: '60%', marginTop: '2.5%' }}
          placeholder="Share your experience about coach"
          autoFocus={true}
          multiline
          rows={4}
          fullWidth
          inputProps={{
            maxLength: 1024,
            pattern: '[0-9]*',
            style: { fontSize: '16px', fontFamily: 'Inter' },
          }}
        />

        <Box
          sx={{
            backgroundColor: '#222CDF',
            marginTop: '2.5%',
            width: '60%',
            height: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignContents: 'center',
            alignItems: 'center',
            padding: '2%',
            gap: '10px',
            borderRadius: '8px',
          }}
          onClick={handleClick}
        >
          <Typography
            fontSize={{
              lg: 16,
              md: 14,
              sm: 12,
              xs: 10,
            }}
            sx={{ fontFamily: 'Inter', color: 'white', fontWeight: '600' }}
          >
            Leave review
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default ReviewForm;
