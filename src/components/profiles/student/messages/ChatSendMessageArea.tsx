import { Box, Button, TextField, styled } from '@mui/material';
export default function ChatSendMessageArea() {
  const WhiteBorderTextField = styled(TextField)`
    & label.Mui-focused {
      color: white;
    }
    & .MuiOutlinedInput-root {
      &.Mui-focused fieldset {
        border-color: #dbdbdb;
      }
    }
  `;
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          heght: '25%',
        }}
      >
        <Box
          sx={{
            width: '95%',
            heght: '100%',
            marginRight: '2.5%',
            marginLeft: '2.5%',
            marginBottom: '1%',
          }}
        >
          <WhiteBorderTextField
            autoFocus={true}
            multiline
            rows={3}
            fullWidth
            InputProps={{
              endAdornment: (
                <Button
                  sx={{
                    width: '15%',
                    fontFamily: 'Inter',
                    fontSize: '0.7rem',
                    fontWeight: '500',
                    color: 'white',
                    backgroundColor: '#222CDF',
                    borderRadius: '0.5rem',
                    '&:hover': {
                      color: 'white',
                      backgroundColor: '#222CDF',
                      tranparent: '0.8',
                    },
                  }}
                >
                  Send a messsage
                </Button>
              ),

              style: { fontSize: '1rem', fontFamily: 'Inter' },
            }}
          ></WhiteBorderTextField>
        </Box>
      </Box>
    </>
  );
}
