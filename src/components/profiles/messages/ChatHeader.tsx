import { Box, Typography } from '@mui/material';

interface ChatHeaderProps {
  selectedContactUUID: string;
  selectedContactFirstName: string;
  selectedContactLastName: string;
}

export function ChatHeader({
  selectedContactFirstName,
  selectedContactLastName,
  selectedContactUUID,
}: ChatHeaderProps) {
  const handleClick = () => {
    alert('Navigate to ' + selectedContactUUID);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '7.5%',
          backgroundColor: '#F2F2F2',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'sticky',
        }}
      >
        <Box
          sx={{
            fontFamily: 'Inter',
            fontSize: '1rem',
            lineHeight: '1.25rem',
            fontWeight: 'bold',
            marginLeft: '5%',
          }}
        >
          <Typography
            fontSize={{
              lg: 18,
              md: 14,
              sm: 12,
              xs: 8,
            }}
            fontFamily={'Inter'}
            fontWeight={'bold'}
          >
            {selectedContactFirstName} {selectedContactLastName}
          </Typography>
        </Box>

        <Box
          onClick={handleClick}
          sx={{
            marginRight: '5%',
            padding: '0.75%',
            backgroundColor: '#222CDF',
            borderRadius: '10px',
            '&:hover': {
              color: 'white',
              backgroundColor: '#636ae9',
              tranparent: '0.5',
            },
          }}
        >
          <Typography
            fontSize={{
              lg: 14,
              md: 10,
              sm: 10,
              xs: 8,
            }}
            sx={{
              fontFamily: 'Inter',
              lineHeight: '1.25rem',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            View Profile - {selectedContactUUID}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
