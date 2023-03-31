import AuthenticatedLayout from '@/components/layouts/authenticated/AuthenticatedLayouts';
import GetHelp from '@/components/profiles/get_help/GetHelp';
import Messages from '@/components/profiles/messages/Messages';
import FavoriteCoaches from '@/components/profiles/student/favorite_coaches/FavoriteCoaches';
import MyLessons from '@/components/profiles/student/my_lessons/MyLessons';
import Settings from '@/components/profiles/student/settings/Settings';
import CoachReview from '@/components/review/CoachReview';
import { instance } from '@/fast_api_backend/api/_axiosInstance';
import { studentClientApi } from '@/fast_api_backend/api/usersInstance/student/studentInstance';
import { IUserProfile, UserType } from '@/store/types/user';
import {
  CalendarToday,
  FavoriteBorder,
  Help,
  Message as Mess,
  Mode,
  Settings as Set,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const LoginPage = dynamic(() => import('../../sign_in/student'));

export default function RateCoach() {
  const matches414 = useMediaQuery('(max-width:414px)');
  const [uuidUser, setUUIDUser] = useState('');
  const router = useRouter();
  const [isLogIn, setIsLogIn] = useState<boolean | null>(null);

  const [selectedContact, setSelectedContact] = useState<IUserProfile | null>(
    null
  );
  const [isOpenMobSideBar, setIsOpenMobSideBar] = useState<boolean>(false);
  const [listItemsStudent, setItemsStudent] = useState<
    {
      name: string;
      icon: any;
      href: string;
    }[]
  >([
    {
      name: 'My Appointments ',
      icon: <CalendarToday color={'primary'} />,
      href: '/profiles/student?my_appointments',
    },
    {
      name: 'Reviews',
      icon: <FavoriteBorder color={'primary'} />,
      href: '/profiles/student?reviews',
    },
    {
      name: 'Packages',
      icon: <Mode color={'primary'} />,
      href: '/profiles/student?packages',
    },
    {
      name: 'Messages',
      icon: <Mess color={'primary'} />,
      href: `/profiles/student?message&${uuidUser}`,
    },
    {
      name: 'Settings',
      icon: <Set color={'primary'} />,
      href: '/profiles/student?settings',
    },
    {
      name: 'Get help',
      icon: <Help color={'primary'} />,
      href: '/profiles/student?get_help',
    },
  ]);

  const { data } = useQuery(
    ['contactsStudent'],
    async () => {
      const request = studentClientApi.studentContactsList;
      const result = await request();
      console.log('--------------> contacts', result);
      return result;
    },
    {
      refetchInterval: 10000,
    }
  );

  const [profile, setProfile] = useState<IUserProfile>({
    uuid: '',
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    profile_picture: '',
    is_verified: false,
  });

  const onContactSelected = (contactUUID: string) => {
    const foundContact = data?.find((element) => {
      if (element.user.uuid === contactUUID) {
        setItemsStudent(
          listItemsStudent.map((item) => {
            if (item.name === 'Messages') {
              return {
                ...item,
                href: `/profiles/student?message&${element.user.uuid}`,
              };
            }
            return item;
          })
        );
        router.push(`/profiles/student?message&${element.user.uuid}`);
        setUUIDUser(element.user.uuid);
      }
      return element.user.uuid === contactUUID;
    });
    if (!foundContact) {
      return;
    }
    setSelectedContact(foundContact.user);
  };

  useEffect(() => {
    const whoAmI = async () => {
      try {
        const response = await instance().get('/whoami/student');
        const res = response.data;
        console.log(`[GET] check student -> res data  ${res}`);
        setIsLogIn(true);
        const studentProfile = await studentClientApi.studentGetProfile();
        setProfile(studentProfile);
      } catch (error: any) {
        console.log(
          `[GET] check student -> error message => ${error.response.status}`
        );
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        setIsLogIn(false);
        router.push('/sign_in/student');
      }
    };
    whoAmI();
  }, [router, router.asPath]);

  const [href, setHref] = useState<string>('my_lessons');
  // eslint-disable-next-line no-undef
  const profileComponents: { [key: string]: JSX.Element } = {
    ['my_lessons']: <MyLessons profile={profile} />,
    ['favorite_coaches']: <FavoriteCoaches />,
    ['messages']: (
      <Messages
        userType={UserType.student}
        selectedContact={selectedContact}
        onContactSelected={onContactSelected}
      />
    ),
    ['settings']: <Settings userType={UserType.student} />,
    ['get_help']: <GetHelp userType={UserType.student} email={profile.email} />,
  };

  useEffect(() => {
    setHref(router.asPath.split('?')[1]);
  }, [router.asPath]);

  const closeOpenMobSideBar = () => {
    setIsOpenMobSideBar(!isOpenMobSideBar);
  };

  return (
    <>
      <Head>
        <title>Rate coach</title>
        <meta name="description" content="Profile Athlete" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLogIn ? (
        <AuthenticatedLayout
          userType={UserType.student}
          listItems={listItemsStudent}
          isOpenMobSideBar={isOpenMobSideBar}
          closeOpenMobSideBar={closeOpenMobSideBar}
        >
          <Box flex={matches414 ? 0 : 1} p={matches414 ? 0 : 2}>
            {profileComponents[href]}
            <CoachReview />
          </Box>
        </AuthenticatedLayout>
      ) : (
        <LoginPage />
      )}
    </>
  );
}