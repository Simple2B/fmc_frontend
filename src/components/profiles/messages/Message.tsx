import { Box, Typography } from '@mui/material';

interface IMessageProps {
  text: string;
  isOutgoing: boolean;
  date: string;
}

export function Message({ text, isOutgoing, date }: IMessageProps) {
  const messageDateObj = new Date(date);
  const messageDate = `${messageDateObj.getDay()}/${messageDateObj.getMonth()}/${messageDateObj.getFullYear()}`;
  const messageTime = `${messageDateObj.getHours()}:${
    (messageDateObj.getMinutes() < 10 ? '0' : '') + messageDateObj.getMinutes()
  }`;
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isOutgoing ? 'flex-end' : 'flex-start',
        margin: '0.25rem 1rem ',
      }}
    >
      <Box
        sx={{
          height: 'auto',
          padding: '0.75rem',
          color: 'black',
          backgroundColor: '#d2d4f9',
          borderRadius: '0.5rem ',
          minWidth: '10rem',
          maxWidth: '60%',
        }}
      >
        <Typography
          fontFamily={'Inter'}
          fontSize={{
            lg: 16,
            md: 10,
            sm: 10,
            xs: 8,
          }}
          lineHeight={'normal'}
          style={{ wordWrap: 'break-word' }}
        >
          {text}
        </Typography>
        <Box>
          <Typography
            fontFamily={'Inter'}
            fontWeight={'600'}
            color={'#9E9E9E'}
            fontSize={{
              lg: 10,
              md: 8,
              sm: 7,
              xs: 6,
            }}
            marginTop={'2.5%'}
          >
            {messageDate}
            <br />
            {messageTime}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
