import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import styles from './WrapperContactForm.module.sass';

export interface IWrapperContactForm {}

const WrapperContactForm: React.FC<IWrapperContactForm> = () => {
  // const router = useRouter();
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');

  const sendQuestion = () => {
    console.log(' question => ', {
      email: email,
      question: question,
    });
  };
  return (
    <Box className={styles.wrapperCards}>
      <Box
        className={`${styles.wrapperCard} ${styles.wrapperCard1}`}
        sx={{
          height: '550px',
          backgroundImage: 'url(../../../../pexels-shvets-production.png)',
        }}
      />
      <Box
        className={`${styles.wrapperCard} ${styles.wrapperCard2} ${styles.wrapperText}`}
      >
        <Box className={styles.title}>Still have questions?</Box>

        <Box className={styles.description}>
          Fill the form below and we’ll contact you shortly
        </Box>

        <Box className={styles.infoCards}>
          <Box sx={{ width: '100%' }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Email"
              multiline
              maxRows={4}
              sx={{ width: '100%', mb: '48px' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <TextField
              sx={{ width: '100%' }}
              id="outlined-multiline-static"
              label="Your question"
              multiline
              rows={4}
              defaultValue=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Box>
        </Box>
        <Box className={styles.Btns}>
          <Button
            className={styles.Btn}
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#EB5757',
              borderRadius: '8px',
              textTransform: 'capitalize',
              fontSize: '',
              width: '187px',
              height: '52px',
              textAlign: 'center',
            }}
            onClick={sendQuestion}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default WrapperContactForm;
