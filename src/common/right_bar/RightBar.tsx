import { Box } from '@mui/material';

export interface IRightBar {}

const RightBar: React.FC<IRightBar> = () => {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      RightBar
    </Box>
  );
};

export default RightBar;
