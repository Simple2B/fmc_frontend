import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import * as React from 'react';
import star from '../../../public/star.png';
import picture from '../../../public/test_coach_profile.png';

export interface ICardCoachProfile {}

const CardCoachProfile: React.FC<ICardCoachProfile> = () => {
  const matches650 = useMediaQuery('(max-width:650px)');
  // const [isOpenFilterForm, setIsOpenFilterForm] = useState<boolean>(false);
  // const toggleFilterForm = () => {
  //   setIsOpenFilterForm(!isOpenFilterForm);
  // };
  return (
    <Box
      sx={{
        width: '100%',
        p: '0 24px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          boxShadow: '0px 0px 13px -2px rgba(75, 75, 75, 0.25)',
          p: '40px 40px 32px',
          borderRadius: '8px',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: matches650 ? 'column' : 'row',
          }}
        >
          <Box sx={{ mr: '43px' }}>
            <Image src={picture} alt={'picture'} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontSize: '40px',
                fontWeight: '500',
                color: '#000000',
              }}
            >
              John Johnson
            </Typography>
            <hr
              style={{
                width: '100%',
                border: '1px solid #222CDF',
                marginBottom: '32px',
              }}
            />
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontSize: '18px',
                fontWeight: '600',
                color: '#394454',
                mb: '10px',
              }}
            >
              Offers Tennis Lessons
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontSize: '18px',
                fontWeight: '400',
                color: '#394454',
                mb: '10px',
              }}
            >
              Tennis coach with experience training over 25,000 students
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              gap={1}
            >
              <Box>
                <Image src={star} alt={'star'} />
              </Box>
              <Typography variant="body2" color="text.secondary">
                5 (8 Reviews)
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardCoachProfile;
