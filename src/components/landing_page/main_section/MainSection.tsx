import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import logo from '../../../../public/LOGO(WHITE).svg';
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

  const year = new Date().getFullYear();

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
      <Box className={styles.mainSectionFooter}>
        <Box className={styles.wrapperFooter}>
          <Box className={styles.cards}>
            <Box className={styles.card1}>
              <Box sx={{ position: 'relative' }}>
                <Image src={logo} alt={'logo'} width={93} height={90} />
              </Box>
              <Box
                sx={{
                  width: '218px',
                  color: '#fff',
                  fontSize: '16px',
                  lineHeight: '20px',
                  pl: '15px',
                }}
              >
                Optimizing your coach experience
              </Box>
            </Box>
            <Box className={styles.card2}>
              <Box className={styles.c2}>Privacy&policy</Box>
              <Box className={styles.c2}>Become an investor</Box>
              <Box className={styles.c2}>Contact us</Box>
            </Box>
            <Box className={styles.card3}>
              <Box className={styles.c3}>Follow us</Box>
              <Box className={styles.boxSocial}>
                <Box sx={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    style={{ fontSize: '16px' }}
                  />
                </Box>
                <Box sx={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon icon={faInstagram} />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className={styles.copyright}>
            Copyright {year}. All rights reserved
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainSection;
