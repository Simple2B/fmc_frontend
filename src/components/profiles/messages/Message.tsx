import { Box, Typography } from '@mui/material';

interface IMessageProps {
  text: string;
  isOutgoing: boolean;
}

export function Message({ text, isOutgoing }: IMessageProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isOutgoing ? 'flex-end' : 'flex-start',
        width: '100%',
        height: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          minWidth: '10%',
          maxWidth: '70%',
          width: 'auto',
          height: 'auto',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: 'auto',
            padding: '1rem',
            color: 'black',
            backgroundColor: '#d2d4f9',
            borderRadius: '0.5rem / 3rem 3rem',
            marginLeft: '2%',
            marginTop: '2%',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontSize: '0.75rem',
              lineHeight: '1rem',
            }}
          >
            {text}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
