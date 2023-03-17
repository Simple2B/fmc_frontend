import { Box } from '@mui/material';
import MarkedCalendar from '../marked_calendar/MarkedCalendar';

export interface IRightBar {}

const RightBar: React.FC<IRightBar> = () => {
  return (
    <Box
      flex={1}
      p={2}
      sx={{ display: { xs: 'none', sm: 'block' }, maxWidth: 593 }}
    >
      <MarkedCalendar />
    </Box>
  );
};

export default RightBar;
