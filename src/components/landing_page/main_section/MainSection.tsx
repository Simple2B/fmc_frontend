import { Box, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import computer from '../../../../public/MacBook-Pro-16.png';
import TitleBox from '../title_box/TitleBox';
import Cards from './cards_sport_types/Cards';
import CardsTypesPayment from './cards_type_payment/CardsTypesPayment';
import InfoBoxSignUp from './info_box_sign_up/InfoBoxSignUp';
import styles from './MainSection.module.sass';
import QuestionsCards from './questions_cards/QuestionsCards';
import WrapperContactForm from './wrapper_contact_form/WrapperContactForm';

export interface IMainSection {}

const MainSection: React.FC<IMainSection> = () => {
  const matches855 = useMediaQuery('(max-width:855px)');
  const matches625 = useMediaQuery('(max-width:625px)');
  const matches385 = useMediaQuery('(max-width:385px)');
  return (
    <Box className={styles.section}>
      <TitleBox
        color={'#000'}
        top={''}
        title={'Explore sport categories'}
        description={'Choose your coach based on your favorite sport'}
      />
      <Box className={styles.wrapperCardTypeSports}>
        <Cards />
      </Box>
      <TitleBox
        color={'#000'}
        top={''}
        title={'How it works'}
        description={
          'We make it fast, simple and secure to book a coach that can help increase your potential.'
        }
      />
      <Box className={styles.wrapperCardTypePayment}>
        {/* <Box className={styles.arrow1}> - </Box> */}
        <CardsTypesPayment />
        {/* <Box className={styles.arrow2}> - </Box> */}
      </Box>
      <Box className={styles.wrapperCardTypePayment}>
        <InfoBoxSignUp />
      </Box>
      <TitleBox
        color={'#000'}
        top={''}
        title={'General FAQs'}
        description={'Everything you have to know about the platform'}
      />
      <Box className={styles.wrapperComputerImg}>
        <Box className={styles.wrapperBackground1} />
        <Box
          className={styles.boxComputerImg}
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: matches385
              ? '320px'
              : matches625
              ? '420px'
              : matches855
              ? '620px'
              : '820px',
            height: matches385
              ? '190px'
              : matches625
              ? '220px'
              : matches855
              ? '280px'
              : '480px',
            '&::after': {
              content: matches855 ? 'url(``)' : 'url(../../../../Design.png)',
              width: '100%',
              height: '100%',
              position: 'absolute',
              zIndex: 100,
              top: matches855 ? '' : '10px',
              left: matches855 ? '' : '72.5px',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderTopRightRadius: '10px',
            },
          }}
        >
          <Image
            className={styles.img}
            src={computer}
            alt={'computer'}
            width={matches385 ? 320 : matches625 ? 420 : matches855 ? 620 : 820}
            height={
              matches385 ? 190 : matches625 ? 220 : matches855 ? 280 : 480
            }
          />
        </Box>
        <Box className={styles.wrapperBackground2} />
      </Box>
      <Box className={styles.wrapperQuestion}>
        <QuestionsCards />
      </Box>
      <Box className={styles.wrapperContactForm}>
        <WrapperContactForm />
      </Box>
    </Box>
  );
};

export default MainSection;
