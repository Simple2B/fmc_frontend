import { Box, Typography } from '@mui/material';
import ReviewForm from './ReviewForm';

function ReviewBody() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '0 auto',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ width: '100%', height: '0 auto', padding: '5%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}
          >
            <Box
              component="img"
              sx={{
                maxHeight: { xs: 233, md: 100 },
                maxWidth: { xs: 100, md: 100 },
              }}
              alt="The house from the offer."
              src="https://find-my-coach-eu.s3.eu-west-2.amazonaws.com/assets/test_coach_avatar.png"
            />
            <Box
              sx={{
                width: '100%',
                height: '0 auto',
                padding: '2.5%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ marginLeft: '5%' }}>
                <Typography
                  fontSize={{
                    lg: 18,
                    md: 16,
                    sm: 12,
                    xs: 8,
                  }}
                  sx={{ fontFamily: 'Inter', fontWeight: 'bold' }}
                >
                  John Johnson
                </Typography>
                <Typography
                  fontSize={{
                    lg: 18,
                    md: 16,
                    sm: 12,
                    xs: 8,
                  }}
                >
                  Tennis coach
                </Typography>
              </Box>
            </Box>
            <Typography
              fontSize={{
                lg: 16,
                md: 14,
                sm: 12,
                xs: 10,
              }}
              sx={{ color: '#969696', fontWeight: '400', fontFamily: 'Inter' }}
            >
              12.03.2023
            </Typography>
          </Box>
          <ReviewForm />
        </Box>
      </Box>
    </>
  );
}

export default ReviewBody;
