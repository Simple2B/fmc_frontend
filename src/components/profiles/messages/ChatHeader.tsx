import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const viewProfile = () => {
    router.push(`/coach_search/${selectedContactUUID}`);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          height: '7.5%',
          backgroundColor: '#F2F2F2',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'sticky',
          padding: '1rem',
        }}
      >
        <Box
          sx={{
            fontFamily: 'Inter',
            fontSize: '1rem',
            lineHeight: '1.25rem',
            fontWeight: 'bold',
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
          onClick={viewProfile}
          sx={{
            paddingX: '1.5rem',

            paddingY: '0.5rem',
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
            View Profile of {selectedContactFirstName}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
