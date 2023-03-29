import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import ReviewBody from './ReviewBody';

const CoachReview = () => {
  const router = useRouter();
  console.log(router.query.id);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="img"
          sx={{
            width: '100%',
            height: '0 auto',
            padding: '',
            maxHeight: { xs: 233, md: 100 },
            maxWidth: { xs: 150, md: 150 },
          }}
          alt="Medal"
          src="https://find-my-coach-eu.s3.eu-west-2.amazonaws.com/assets/medal.png"
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          fontSize={{
            lg: 40,
            md: 32,
            sm: 24,
            xs: 16,
          }}
          sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}
        >
          Rate your coach
        </Typography>
      </Box>
      <ReviewBody />
    </>
  );
};
export default CoachReview;
