/* eslint-disable no-undef */
import CardCoachProfile from '@/components/coach_profile/CardCoachProfile';
import AboutCoachProfile from '@/components/coach_profile/about_coach_profile/AboutCoachProfile';
import LessonsOffered from '@/components/coach_profile/lessons_offered/LessonsOffered';
import CoachSearchNavbar from '@/components/coach_search/CoachSearchNavbar';
import Reviews from '@/components/profiles/coach/reviews/Reviews';
import { Box } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.sass';

export default function CoachProfilePage() {
  const router = useRouter();

  const coachUuid =
    router.asPath.split('/')[router.asPath.split('/').length - 1];

  console.log('[CoachProfilePage] coachUuid ', coachUuid);

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
          <AboutCoachProfile coachUuid={coachUuid} />
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
