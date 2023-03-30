import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Box as Stack, Typography } from '@mui/material';

export function ChatNotSelected() {
  return (
    <Stack
      display={'flex'}
      flex={1}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <MailOutlineIcon sx={{ fontSize: '4rem', color: '#222CDF' }} />
      <Typography
        textAlign={'center'}
        variant="h5"
        fontFamily={'Inter'}
        fontWeight={'bold'}
      >
        Please select chat to start conversation
      </Typography>
    </Stack>
  );
}
