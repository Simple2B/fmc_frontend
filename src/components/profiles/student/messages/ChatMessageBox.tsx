import { Box, Typography } from '@mui/material';

export default function ChatMessageBox() {
  return (
    <>
      <Box
        sx={{
          marginTop: '1%',
          marginBottom: '1%',
          width: '100%',
          height: 'auto',
          minHeight: '80%',
        }}
      >
        {/* MESSAGE */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start', //
            width: '100%',
            height: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '60%',
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
                Message itself Message itself Message itself Message itself
                Message asdsadsad asitself Message itself Message itself Message
                itself Message itself Message itself Message itself Message
                itselfasdasdasd Messageddsaas itself Messagedsaitself Message
                itselfasdsadage itselfsad Message itself Message itself
                Mesadssage itsadlf Messasdage itself Message itself Message
                itself Message itself Message itself Message asdsadsad asitself
                Message itself Message itself Message itself Message itself
                Message itself Message itself Message itselfasdasdasd
                Messageddsaas itself Messagedsaitself Message itselfasdsadage
                itselfsad Message itself Message itself Mesadssage itsadlf
                Messasdage itself
              </Typography>
            </Box>
          </Box>

          {/* MESSAGE */}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end', //
            width: '100%',
            height: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '60%',
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
                marginRight: '2%', //
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
                Message itself Message itself Message itself Message itself
                Message asdsadsad asitself Message itself Message itself Message
                itself Message itself Message itself Message itself Message
                itselfasdasdasd Messageddsaas itself Messagedsaitself Message
                itselfasdsadage itselfsad Message itself Message itself
                Mesadssage itsadlf Messasdage itself Message itself Message
                itself Message itself Message itself Message asdsadsad asitself
                Message itself Message itself Message itself Message itself
                Message itself Message itself Message itselfasdasdasd
                Messageddsaas itself Messagedsaitself Message itselfasdsadage
                itselfsad Message itself Message itself Mesadssage itsadlf
                Messasdage itself
              </Typography>
            </Box>
          </Box>

          {/* MESSAGE */}
        </Box>
      </Box>
    </>
  );
}
