import { ISession } from '@/store/types/session/sessionTypes';
import { Box, Typography } from '@mui/material';
import ReviewForm from './ReviewForm';

interface IReviewBodyProps {
  lessonData: ISession | undefined;
}

const ReviewBody = ({ lessonData }: IReviewBodyProps) => {
  const date = new Date(lessonData ? lessonData.appointment_time : '');
  const appointment_date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '80%',
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
              <Box>
                <Typography
                  fontSize={{
                    lg: 18,
                    md: 16,
                    sm: 12,
                    xs: 8,
                  }}
                  sx={{ fontFamily: 'Inter', fontWeight: 'bold' }}
                >
                  {lessonData?.coach.first_name} {lessonData?.coach.last_name}
                </Typography>
                <Typography
                  fontSize={{
                    lg: 18,
                    md: 16,
                    sm: 12,
                    xs: 8,
                  }}
                >
                  {lessonData?.lesson.sport.name} Coach
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
              {appointment_date}
            </Typography>
          </Box>
          <ReviewForm lessonUUID={lessonData?.uuid ?? ''} />
        </Box>
      </Box>
    </>
  );
};

export default ReviewBody;
