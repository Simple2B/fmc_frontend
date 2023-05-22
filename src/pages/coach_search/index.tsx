/* eslint-disable no-undef */
import { CoachCardList } from '@/components/coach_search/CoachCardList';
import CoachSearchInput from '@/components/coach_search/CoachSearchInput';
import CoachSearchNavbar from '@/components/coach_search/CoachSearchNavbar';
import { instance } from '@/fast_api_backend/api/_axiosInstance';
import { coachProfileApi } from '@/fast_api_backend/api/usersInstance/coach/profileInstance';
import { ISport } from '@/store/types/users/coach/profileType';
import { Box } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styles from '../../styles/Home.module.sass';

export default function CoachSearchPage() {
  const router = useRouter();
  // const matches950 = useMediaQuery('(max-width:950px)');

  const [isLogIn, setIsLogIn] = useState<boolean>(false);
  const [userType, setUserType] = useState<string>('');

  const [searchName, setName] = useState<string>(
    (router.query.name as string) ?? ''
  );
  const [searchAddress, setAddress] = useState<string>(
    (router.query.address as string) ?? ''
  );
  const onChangeName = (value: string) => {
    setName(value);
  };
  const onChangeAddress = (value: string) => {
    setAddress(value);
  };
  const [sports, setSports] = useState<
    {
      id: number;
      name: string;
      isActive: boolean;
    }[]
  >([
    {
      id: 0,
      name: '',
      isActive: false,
    },
  ]);

  // eslint-disable-next-line no-unused-vars
  const sportsQuery = useQuery<ISport[], ErrorConstructor>(
    ['sports'],
    async () => {
      const request = coachProfileApi.getTypeSports;
      const result = await request();
      if (result) {
        setSports(
          result.map((s) => {
            if (
              router.query.sportsIdes &&
              router.query.sportsIdes.includes(String(s.id))
            ) {
              return {
                id: s.id ? s.id : 0,
                name: s.name,
                isActive: true,
              };
            }
            return {
              id: s.id ? s.id : 0,
              name: s.name,
              isActive: false,
            };
          })
        );
      }
      return result;
    }
  );

  // eslint-disable-next-line no-unused-vars
  const toggleSport = (sport: {
    id: number;
    name: string;
    isActive: boolean;
  }) => {
    setSports(
      sports.map((s) => {
        if (sport.id === s.id) {
          return {
            ...s,
            isActive: !s.isActive,
          };
        }
        return s;
      })
    );
  };

  useEffect(() => {
    const whoAmI = async () => {
      try {
        const response = await instance().get('/whoami/student');
        // const response = await WhoamiService.apiWhoamiStudent();
        const res = response.data;
        console.log(`[GET] check student -> res data  ${res}`);
        setIsLogIn(true);
        setUserType(localStorage.getItem('userType') ?? '');
        // const studentProfile = await studentClientApi.studentGetProfile();
        // setProfile(studentProfile);
      } catch (error: any) {
        console.log(`[GET] check student -> error message => ${error}`);
        setIsLogIn(false);
      }
    };
    whoAmI();
  }, [router, router.asPath]);

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
            {/* {!matches950 && <FilterBtn />} */}

            <CoachSearchInput
              name={searchName as string}
              onChangeName={onChangeName}
              onChangeAddress={onChangeAddress}
              address={searchAddress as string}
            />
            {/* <Btns
              sportsIdes={router.query.sportsIdes}
              sports={sports}
              toggleSport={toggleSport}
            /> */}
          </Box>
          <CoachCardList
            isLogIn={isLogIn}
            userType={userType}
            name={searchName as string}
            sportsIdes={sports.filter((s) => s.isActive).map((s) => s.id)}
            address={searchAddress as string}
          />
        </div>
        {/* {isLoad && (
          <CustomModel isOpen={isLoad}>
            <Loader />
          </CustomModel>
        )} */}
        {/* {error && !isSuccess && (
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
