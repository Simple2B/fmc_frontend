import { Box } from '@mui/material';

export interface ISideBar {}

// eslint-disable-next-line no-empty-pattern
const SideBar: React.FC<ISideBar> = ({}) => {
  //   const theme = useTheme();
  // const router = useRouter();

  return (
    <Box flex={1} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      SideBar
    </Box>
  );
};

export default SideBar;
