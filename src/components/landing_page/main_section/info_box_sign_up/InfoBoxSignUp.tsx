import {
  faCalendarDays,
  faFileInvoiceDollar,
  faMagnifyingGlass,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import styles from './InfoBoxSignUp.module.sass';

const infoItems = [
  {
    icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
    text: 'Get new students',
  },
  {
    icon: <FontAwesomeIcon icon={faCalendarDays} />,
    text: 'Grow your business',
  },
  {
    icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />,
    text: 'Get paid securely',
  },
  {
    icon: <FontAwesomeIcon icon={faStar} />,
    text: 'Get ratings',
  },
];

export interface IInfoBoxSignUp {}

const InfoBoxSignUp: React.FC<IInfoBoxSignUp> = () => {
  const router = useRouter();
  return (
    <Box className={styles.wrapperCards}>
      <Box
        className={`${styles.wrapperCard} ${styles.wrapperCard1}`}
        sx={{
          height: '550px',
          backgroundImage: 'url(../../../../pexels-andrea-piacquadio.png)',
        }}
      />
      <Box
        className={`${styles.wrapperCard} ${styles.wrapperCard2} ${styles.wrapperText}`}
      >
        <Box className={styles.title}>Sign up with FindMyCoach</Box>

        <Box className={styles.description}>
          FMC includes a complete booking and payments system, client ratings
          and reviews as well as comprehensive analytics powered by Stripe. Sign
          up to start coaching with FindMyCoach.
        </Box>

        <Box className={styles.infoCards}>
          {infoItems.map((item, index) => {
            return (
              <Box key={index} className={styles.infoCard}>
                <Box className={styles.infoIcon}>
                  <Box sx={{ width: 20, height: 20 }}>{item.icon}</Box>
                </Box>
                <Box className={styles.infoText}>{item.text}</Box>
              </Box>
            );
          })}
        </Box>

        <Box className={styles.Btns}>
          {/* <Box className={styles.Btn1}>Become a coach</Box> */}
          <Button
            className={styles.Btn1}
            onClick={() => router.push('/sign_up/coach')}
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
          >
            Become a coach
          </Button>
          <Box className={styles.Btn2}>Learn more</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoBoxSignUp;
