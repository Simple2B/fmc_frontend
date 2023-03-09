import { Box } from '@mui/material';
import TitleBox from '../title_box/TitleBox';
import Cards from './cards_sport_types/Cards';
import CardsTypesPayment from './cards_type_payment/CardsTypesPayment';
import InfoBoxSignUp from './info_box_sign_up/InfoBoxSignUp';
import styles from './MainSection.module.sass';
import QuestionsCards from './questions_cards/QuestionsCards';

export interface IMainSection {}

const MainSection: React.FC<IMainSection> = () => {
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
        <Box className={styles.wrapperBackground} />
        {/* TODO: add img computer */}
        <Box></Box>
      </Box>
      <Box className={styles.wrapperQuestion}>
        <QuestionsCards />
      </Box>
    </Box>
  );
};

export default MainSection;
