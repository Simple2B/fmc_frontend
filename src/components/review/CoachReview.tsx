import { LessonService } from '@/services/services/LessonService';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import ReviewBody from './ReviewBody';

const CoachReview = () => {
  const router = useRouter();

  const { data } = useQuery(['getLesson'], async () => {
    const lessonUUID = router.query ? router.query.id : '';
    const request = LessonService.apiGetLesson(lessonUUID);
    const result = await request;
    return result;
  });
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
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <ReviewBody lessonData={data} />
      </Box>
    </>
  );
};
export default CoachReview;
