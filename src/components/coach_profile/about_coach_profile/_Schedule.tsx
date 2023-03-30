import { Box, useMediaQuery } from '@mui/material';
import * as React from 'react';

export interface ISchedule {}

const Schedule: React.FC<ISchedule> = () => {
  const matches950 = useMediaQuery('(max-width:950px)');
  // const [isOpenFilterForm, setIsOpenFilterForm] = useState<boolean>(false);
  // const toggleFilterForm = () => {
  //   setIsOpenFilterForm(!isOpenFilterForm);
  // };
  return (
    <Box
      flex={1}
      sx={{
        alignSelf: matches950 ? 'center' : 'flex-start',
        maxWidth: 515,
        width: '100%',
        height: 435,
        boxShadow: '0px 0px 17px rgba(160, 160, 160, 0.25)',
        borderRadius: '16px',
        p: '24px 37px',
      }}
    >
      <Box
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '20px',
          fontWeight: '600',
          color: '#333333',
          mb: '16px',
        }}
      >
        Schedule
      </Box>
      <Box></Box>
      <Box></Box>
    </Box>
  );
};

export default Schedule;
