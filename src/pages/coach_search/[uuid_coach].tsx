/* eslint-disable no-undef */
import AboutCoachProfile from '@/components/coach_profile/about_coach_profile/AboutCoachProfile';
import CardCoachProfile from '@/components/coach_profile/CardCoachProfile';
import LessonsOffered from '@/components/coach_profile/lessons_offered/LessonsOffered';
import CoachSearchNavbar from '@/components/coach_search/CoachSearchNavbar';
import Head from 'next/head';
import styles from '../../styles/Home.module.sass';

export default function CoachProfilePage() {
  //   const router = useRouter();
  //   const [isLogIn, setIsLogIn] = useState<boolean | null>(null);
  //   const [userType, setUserType] = useState<string | null>(null);

  //   useEffect(() => {
  //     const whoAmI = async () => {
  //       try {
  //         const response = await instance().get('/whoami/student');
  //         const res = response.data;
  //         console.log(`[GET] check student -> res data  ${res}`);
  //         setIsLogIn(true);
  //         setUserType(localStorage.getItem('userType') ?? '');
  //       } catch (error: any) {
  //         console.log(
  //           `[GET] check student -> error message => ${error.response.status}`
  //         );
  //         localStorage.removeItem('token');
  //         localStorage.removeItem('userType');
  //         setIsLogIn(false);
  //       }
  //     };
  //     whoAmI();
  //   }, [router, router.asPath]);
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
