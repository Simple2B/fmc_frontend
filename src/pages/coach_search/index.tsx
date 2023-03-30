/* eslint-disable no-undef */
import Btns from '@/components/coach_search/Btns';
import CoachCards from '@/components/coach_search/CoachCards';
import CoachSearchInput from '@/components/coach_search/CoachSearchInput';
import CoachSearchNavbar from '@/components/coach_search/CoachSearchNavbar';
import FilterBtn from '@/components/coach_search/FilterBtn';
import { Box } from '@mui/material';
import Head from 'next/head';
import styles from '../../styles/Home.module.sass';

export default function CoachSearchPage() {
  return (
    <>
      <Head>
        <title>Coach search</title>
        <meta name="description" content="Coach search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mainCoachSearch}>
        <CoachSearchNavbar wrapperClassName={styles.boxCoachSearch} />
        <div className={styles.boxCoachSearchContent}>
          <Box
            sx={{
              maxWidth: '1140px',
              width: '100%',
              p: '0 24px',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            gap={1}
          >
            <FilterBtn />
            <CoachSearchInput />
            <Btns />
          </Box>
          <CoachCards />
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
