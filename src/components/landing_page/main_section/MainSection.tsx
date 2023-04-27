import {
  faInstagram,
  faLinkedin,
  faTiktok,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import logo from '../../../../public/LOGO(WHITE).svg';
import computer from '../../../../public/MacBookPro16.svg';
import line_first from '../../../../public/lines/line_first.png';
import line_second from '../../../../public/lines/line_second.png';
import TitleBox from '../title_box/TitleBox';
import styles from './MainSection.module.sass';
import CardsTypesPayment from './cards_type_payment/CardsTypesPayment';
import ForTheCoaches from './for_the_coaches/ForTheCoaches';
import InfoBoxSignUp from './info_box_sign_up/InfoBoxSignUp';
import QuestionsCards from './questions_cards/QuestionsCards';
import WrapperContactForm from './wrapper_contact_form/WrapperContactForm';

const typeQuestions = [
  {
    question: 'How much does it cost to use FindMyCoach?',
    answer:
      'At this current stage, there is no subscription fee for FindMyCoach! There is a very small charge for bookings (3.9% + 20p) which includes the Stripe payments fee and covers the cost of the Stripe Express accounts which you will have access to. We will have subscription tiers as we include some of our exciting new features but don’t worry - we will always have the option to keep using our platform for no subscription cost.dd',
    isOpen: false,
    isShowArrow: false,
  },
  {
    question: 'What are the benefits to me as a coach?',
    answer:
      'FindMyCoach allows your clients to rate and review you, so that you can show off your quality as a sports coach to future business. As we grow, we will push athletes to the site, so building up good ratings and reviews could help you gain new clients in the future. Our booking and payments system (powered by Stripe) will give you access to your own Stripe Express account which will give you a highly detailed overview of the income your coaching business is generating, as well as giving you access to first class analytics and many other features. We want to become an all-in-one hub for you to run, maintain and organise your business to help you grow quickly and efficiently. We have many exciting features that we can’t wait to share with you - these are just around the corner and will be a welcome addition to the benefits that you already receive!',
    isOpen: false,
    isShowArrow: false,
  },
  {
    question: 'What are the benefits to me as an athlete?',
    answer:
      'For athletes using FindMyCoach, our platform will give you access to your own account from which you can book with and rate your coach. Our built in calendar and booking system will make it easy for you manage your upcoming and past sessions to stay on top of your game and control your routine. By rating and reviewing the sessions you have you are helping to keep coaches accountable, which has a dramatic affect on the quality of coaching across the UK. We have some big updates planned to make your experience with 1-2-1 and group coaching much more immersive. Stay tuned!',
    isOpen: false,
    isShowArrow: false,
  },
  {
    question: 'How can I give feedback on the website?',
    answer:
      'You can give feedback using the feedback form at the bottom of the landing page. Alternatively you can email info@findmycoach.co.uk. We built this platform to help make the coaching experience better for both coaches and athletes. Whilst we’re a relatively new company, we want to hear your thoughts so we can tailor this website to the people who actually use it. If you have suggestions about something that would make the site better for you please send it in asap!',
    isOpen: false,
    isShowArrow: false,
  },
  {
    question: 'Is there a FindMyCoach app?',
    answer:
      'Unfortunately not! Having said that, the platform is functional on both laptop and mobile so you can still use us on the go. We do plan to launch a fully featured app in the future.',
    isOpen: false,
    isShowArrow: false,
  },
  {
    question: 'What sports does FindMyCoach support?',
    answer:
      'Our mission is to improve the sporting environment in the UK no matter what you coach and play! If you are a coach and your sport isn’t listed, then send us an email at info@findmycoach.co.uk with the subject ‘Adding Sport’ and let us know what it is you would like us to bring in.',
    isOpen: false,
    isShowArrow: false,
  },
];

export interface IMainSection {}

const MainSection: React.FC<IMainSection> = () => {
  const router = useRouter();

  const matches1111 = useMediaQuery('(max-width:1111px)');
  const matches855 = useMediaQuery('(max-width:855px)');
  const matches625 = useMediaQuery('(max-width:625px)');
  const matches385 = useMediaQuery('(max-width:385px)');

  const handleRedirectToPrivacy = () => {
    router.push('/sign_up/privacy');
  };
  const year = new Date().getFullYear();

  return (
    <Box className={styles.section}>
      <Box className={styles.wrapperCardTypePayment}>
        <InfoBoxSignUp />
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
      <TitleBox
        color={'#000'}
        top={''}
        title={'For the coaches'}
        description={''}
      />
      <Box
        className={styles.wrapperCardTypeSports}
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: matches1111 ? 'center' : 'space-between',
          alignItems: matches1111 ? 'center' : 'self-start',
          flexWrap: 'wrap',
          gap: matches1111 ? 5 : 3,
        }}
      >
        <ForTheCoaches />
        <Box
          sx={{
            display: matches1111 ? 'none' : 'block',
            position: 'absolute',
            top: '105px',
            right: '175px',
            zIndex: 0,
          }}
        >
          <Image src={line_first} alt={'logo'} width={400} height={45} />
        </Box>
        <Box
          sx={{
            display: matches1111 ? 'none' : 'block',
            position: 'absolute',
            top: '363px',
            left: '160px',
            zIndex: 0,
          }}
        >
          <Image src={line_second} alt={'logo'} width={410} height={65} />
        </Box>
        <Box
          sx={{
            display: matches1111 ? 'none' : 'block',
            position: 'absolute',
            top: '480px',
            right: '175px',
            zIndex: 0,
          }}
        >
          <Image src={line_first} alt={'logo'} width={400} height={45} />
        </Box>
      </Box>
      {/*TODO: categories of sports */}
      {/* <TitleBox
        color={'#000'}
        top={''}
        title={'Explore sport categories'}
        description={'Choose your coach based on your favorite sport'}
      /> */}
      {/* <Box className={styles.wrapperCardTypeSports}>
        <Cards />
      </Box> */}

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
          {/* TODO: add background blue */}
          {/* <Box
            sx={{
              position: 'absolute',
              top: '-100px',
              backgroundImage: 'url(../../../../bg/Ellipse_blue.png)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          /> */}
          <Image
            className={styles.img}
            src={computer}
            alt={'computer'}
            width={matches385 ? 320 : matches625 ? 420 : matches855 ? 620 : 820}
            height={
              matches385 ? 190 : matches625 ? 220 : matches855 ? 280 : 480
            }
          />
          {/* TODO: add background */}
          {/* <Box
            sx={{
              backgroundImage: 'url()',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          /> */}
        </Box>
        <Box className={styles.wrapperBackground2} />
      </Box>
      <Box className={styles.wrapperQuestion}>
        <QuestionsCards typeQuestions={typeQuestions} width={'1140px'} />
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
              <Box className={styles.c2} onClick={handleRedirectToPrivacy}>
                Privacy & Policy
              </Box>
              <Box className={styles.c2}>Become an investor</Box>
              <Box component={'a'} href={'#contact_us'} className={styles.c2}>
                Contact us
              </Box>
            </Box>
            <Box className={styles.card3}>
              <Box className={styles.c3}>Follow us</Box>
              <Box className={styles.boxSocial}>
                <Box
                  sx={{ cursor: 'pointer' }}
                  onClick={() =>
                    (window.location.href = 'https://twitter.com/FindMyCoachUK')
                  }
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </Box>
                <Box
                  onClick={() =>
                    (window.location.href =
                      'https://instagram.com/findmycoachuk')
                  }
                  sx={{ cursor: 'pointer' }}
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </Box>
                <Box
                  sx={{ cursor: 'pointer' }}
                  onClick={() =>
                    (window.location.href =
                      'https://www.linkedin.com/company/findmycoachuk/')
                  }
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Box>
                <Box
                  sx={{ cursor: 'pointer' }}
                  onClick={() =>
                    (window.location.href =
                      'https://www.tiktok.com/@findmycoach')
                  }
                >
                  <FontAwesomeIcon icon={faTiktok} />
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
