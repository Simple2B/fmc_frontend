import { Box, Button } from '@mui/material';

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
          {selectedContactFirstName} {selectedContactLastName}
        </Box>

        <Button
          onClick={handleClick}
          sx={{
            fontFamily: 'Inter',
            fontSize: '0.75rem',
            lineHeight: '1.25rem',
            fontWeight: 'bold',
            marginRight: '5%',
            padding: '1%',
            color: 'white',
            backgroundColor: '#222CDF',
            borderRadius: '10px',
            '&:hover': {
              color: 'white',
              backgroundColor: '#636ae9',
              tranparent: '0.5',
            },
          }}
        >
          View Profile - {selectedContactUUID}
        </Button>
      </Box>
    </>
  );
}
