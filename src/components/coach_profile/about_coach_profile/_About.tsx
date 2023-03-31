import { Box } from '@mui/material';
import * as React from 'react';

export interface IAbout {}

const About: React.FC<IAbout> = () => {
  // const [isOpenFilterForm, setIsOpenFilterForm] = useState<boolean>(false);
  // const toggleFilterForm = () => {
  //   setIsOpenFilterForm(!isOpenFilterForm);
  // };
  return (
    <Box flex={1}>
      <Box
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '24px',
          fontWeight: '500',
          color: '#394454',
          mb: '16px',
        }}
      >
        About me
      </Box>
      <Box
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontWeight: '400',
          color: '#394454',
          lineHeight: '24px',
          mb: '56px',
        }}
      >
        Hi! I’m Adam one of the West Coast's most respected tennis teachers.
        Since 1970 over 25,000 students have attended my camps and clinics. With
        a limited enrollment policy, the student-staff ratio is 4-1. Since 1970
        over 25,000 students have attended my camps and clinics.{' '}
      </Box>
      <Box
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '24px',
          fontWeight: '500',
          color: '#394454',
          mb: '26px',
        }}
      >
        Credentials and Experience
      </Box>
      <Box
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontWeight: '400',
          color: '#5D6D6F',
          mb: '16px',
        }}
      >
        Extensive coaching experience
      </Box>
      <Box
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontWeight: '400',
          color: '#394454',
          lineHeight: '27px',
          mb: '32px',
        }}
      >
        Ed was the former coach of University of San Diego (’78—’96), and has
        coached over 25,000 students in the past 50 years
      </Box>
      <Box
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontWeight: '400',
          color: '#5D6D6F',
          mb: '16px',
        }}
      >
        Industry recognition
      </Box>
      <Box
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontWeight: '400',
          color: '#394454',
          lineHeight: '27px',
          mb: '32px',
        }}
      >
        Ed is a Four-time San Diego USPTA Coach-of-the-Year, inditeed to the USD
        Athletic Hall of Fame (2001), and his camp is awarded Tennis Magazine's
        Top-25 Adult Tennis Camps in 2006
      </Box>
      <Box
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontWeight: '400',
          color: '#5D6D6F',
          mb: '16px',
        }}
      >
        Speicalized in Forehand and backhand
      </Box>
      <Box
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontWeight: '400',
          color: '#394454',
          lineHeight: '27px',
          mb: '32px',
        }}
      >
        Consectetur adipiscing elit. Neque pharetra tempor turpis ut quis risus.
      </Box>
    </Box>
  );
};

export default About;
