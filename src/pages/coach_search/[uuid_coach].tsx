/* eslint-disable no-undef */
import CardCoachProfile from '@/components/coach_profile/CardCoachProfile';
import AboutCoachProfile from '@/components/coach_profile/about_coach_profile/AboutCoachProfile';
import LessonsOffered from '@/components/coach_profile/lessons_offered/LessonsOffered';
import CoachSearchNavbar from '@/components/coach_search/CoachSearchNavbar';
import Reviews from '@/components/profiles/coach/reviews/Reviews';
import { Box } from '@mui/material';
import Head from 'next/head';
import styles from '../../styles/Home.module.sass';

export default function CoachProfilePage() {
  // const router = useRouter();
  // const [isLogIn, setIsLogIn] = useState<boolean | null>(null);
  // const [userType, setUserType] = useState<string | null>(null);

  // useEffect(() => {
  //   const whoAmI = async () => {
  //     try {
  //       // const response = await instance().get('/whoami/student');
  //       const response = await WhoamiService.apiWhoamiCoach();
  //       const res = response.data;
  //       console.log(`[GET] check student -> res data  ${res}`);
  //       setIsLogIn(true);
  //       // setUserType(localStorage.getItem('userType') ?? '');
  //     } catch (error: any) {
  //       console.log(
  //         `[GET] check student -> error message => ${error.response}`
  //       );
  //       localStorage.removeItem('token');
  //       localStorage.removeItem('userType');
  //       setIsLogIn(false);
  //     }
  //   };
  //   whoAmI();
  // }, [router.asPath]);

  return (
    <>
      <Head>
        <title>Coach Profile Page</title>
        <meta name="description" content="Coach Profile Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mainCoachSearch}>
        <CoachSearchNavbar wrapperClassName={styles.boxCoachSearch} />
        <div className={styles.boxCoachSearchContent}>
          <CardCoachProfile />
          <AboutCoachProfile />
          <LessonsOffered />
          <Box
            sx={{
              width: '96%',
              borderBottom: '1px solid #EBF6FF',
            }}
          />
          <Reviews />
        </div>
        {/* {isLoad && (
          <CustomModel isOpen={isLoad}>
            <Loader />
          </CustomModel>
        )}
        {error && !isSuccess && (
          <CustomModel
            isOpen={modalIsOpen}
            handleClick={() => setModalIsOpen(!modalIsOpen)}
          >
            <MessageBox
              message={error}
              handleClick={() => setModalIsOpen(!modalIsOpen)}
            />
          </CustomModel>
        )} */}
      </main>
    </>
  );
}
