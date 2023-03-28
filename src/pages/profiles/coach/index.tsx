import AuthenticatedLayout from '@/components/layouts/authenticated/AuthenticatedLayouts';
import MessageSubscription from '@/components/message_subscription/MessageSubscription';
import LessonRequestsCalendar from '@/components/profiles/coach/my_appointments/lesson_requests_calendar/LessonRequestsCalendar';
import MyAppointments from '@/components/profiles/coach/my_appointments/MyAppointments';
import Packages from '@/components/profiles/coach/packages/Packages';
import Reviews from '@/components/profiles/coach/reviews/Reviews';
import Settings from '@/components/profiles/coach/settings/Settings';
import GetHelp from '@/components/profiles/get_help/GetHelp';
import Messages from '@/components/profiles/messages/Messages';
import { coachSubscriptionApi } from '@/fast_api_backend/api/authApi/coach/subscription';
import { coachClientApi } from '@/fast_api_backend/api/usersInstance/coach/coachInstance';
import { instance } from '@/fast_api_backend/api/_axiosInstance';
import { IUserProfile, UserType } from '@/store/types/user';
import { ICoachSubscription } from '@/store/types/users/coach/profileType';
import {
  CalendarToday,
  FavoriteBorder,
  Help,
  Message as Mess,
  Mode,
  Settings as Set,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const LoginPage = dynamic(() => import('../../sign_in/coach'));

export default function ProfileCoach() {
  const router = useRouter();
  const [coachDetailProfile, setCoachDetailProfile] =
    useState<ICoachSubscription | null>(null);

  console.log('====================================');
  console.log('[ProfileCoach] coachDetailProfile => ', coachDetailProfile);
  console.log('====================================');

  const [isSubscription, setIsSubscription] = useState<boolean>(false);

  useQuery<ICoachSubscription, ErrorConstructor>(
    ['coachSubscription'],
    async () => {
      const request = coachSubscriptionApi.getSubscription();
      const result = await request;
      console.log('[coach subscription] coach result', result);
      if (result.is_active) {
        setIsSubscription(true);
      } else {
        setIsSubscription(false);
      }
      setCoachDetailProfile(result);
      return result;
    },
    {}
  );

  const [isSubscriptionSuccess, setIsSubscriptionSuccess] =
    useState<boolean>(false);

  const [isSubscriptionCancel, setIsSubscriptionCancel] =
    useState<boolean>(false);

  useEffect(() => {
    const success = router.asPath.includes('success');
    const cancel = router.asPath.includes('cancel');
    if (success) {
      setIsSubscriptionSuccess(true);
    }
    if (cancel) {
      setIsSubscriptionCancel(true);
    }
  }, [router.asPath]);

  useEffect(() => {
    if (isSubscriptionSuccess) {
      setTimeout(() => {
        setIsSubscriptionSuccess(false);
        router.push('/profiles/coach?my_appointments#lesson_requests');
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubscriptionSuccess]);

  const closeSuccessMessage = () => {
    setIsSubscriptionSuccess(false);
    router.push('/profiles/coach?my_appointments#lesson_requests');
  };

  const closeCancelMessage = () => {
    setIsSubscriptionCancel(false);
    router.push('/profiles/coach?my_appointments');
  };

  const [isLogIn, setIsLogIn] = useState<boolean | null>(null);
  const [isOpenMobSideBar, setIsOpenMobSideBar] = useState<boolean>(false);
  const [href, setHref] = useState<string>('my_appointments');

  const [profile, setProfile] = useState<IUserProfile>({
    uuid: '',
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    profile_picture: '',
    is_verified: false,
  });

  useEffect(() => {
    const whoAmI = async () => {
      try {
        const response = await instance().get('/whoami/coach');
        const res = response.data;
        console.log(`[GET] check coach -> res data  ${res}`);
        setIsLogIn(true);
        const coachProfile = await coachClientApi.coachGetProfile();
        setProfile(coachProfile);
      } catch (error: any) {
        console.log(
          `[GET] check coach -> error message => ${error.response.status}`
        );
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        setIsLogIn(false);
        router.push('/sign_in/coach');
      }
    };
    whoAmI();
  }, [router, router.asPath]);

  const [uuidUser, setUUIDUser] = useState('');

  const [listItemsCoach, setItemsCoach] = useState<
    {
      name: string;
      icon: any;
      href: string;
    }[]
  >([
    {
      name: 'My Appointments ',
      icon: <CalendarToday color={'primary'} />,
      href: '/profiles/coach?my_appointments',
    },
    {
      name: 'Reviews',
      icon: <FavoriteBorder color={'primary'} />,
      href: '/profiles/coach?reviews',
    },
    {
      name: 'Packages',
      icon: <Mode color={'primary'} />,
      href: '/profiles/coach?packages',
    },
    {
      name: 'Messages',
      icon: <Mess color={'primary'} />,
      href: `/profiles/coach?message&${uuidUser}`,
    },
    {
      name: 'Settings',
      icon: <Set color={'primary'} />,
      href: '/profiles/coach?settings',
    },
    {
      name: 'Get help',
      icon: <Help color={'primary'} />,
      href: '/profiles/coach?get_help',
    },
  ]);

  const [selectedContact, setSelectedContact] = useState<IUserProfile | null>(
    null
  );

  const { data } = useQuery(
    ['contactsCoach'],
    async () => {
      const request = coachClientApi.coachContactList;
      const result = await request();
      console.log('--------------> contacts', result);
      return result;
    },
    {
      refetchInterval: 10000,
    }
  );

  const onContactSelected = (contactUUID: string) => {
    const foundContact = data?.find((element) => {
      if (element.user.uuid === contactUUID) {
        setItemsCoach(
          listItemsCoach.map((item) => {
            if (item.name === 'Messages') {
              return {
                ...item,
                href: `/profiles/coach?message&${element.user.uuid}`,
              };
            }
            return item;
          })
        );
        router.push(`/profiles/coach?message&${element.user.uuid}`);
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
    setHref(router.asPath.split('?')[1]);
  }, [router.asPath]);

  const closeOpenMobSideBar = () => {
    setIsOpenMobSideBar(!isOpenMobSideBar);
  };

  // eslint-disable-next-line no-undef
  const profileComponents: { [key: string]: JSX.Element | null } = {
    ['my_appointments']: !isSubscription ? (
      <MyAppointments profile={profile} />
    ) : (
      <LessonRequestsCalendar />
    ),
    ['my_appointments#lesson_requests']: isSubscription ? (
      <LessonRequestsCalendar />
    ) : null,
    ['reviews']: <Reviews />,
    ['packages']: <Packages />,
    [`message&${uuidUser}`]: (
      <Messages
        userType={UserType.coach}
        data={data}
        selectedContact={selectedContact}
        onContactSelected={onContactSelected}
      />
    ),
    ['settings']: <Settings userType={UserType.coach} />,
    ['get_help']: <GetHelp userType={UserType.coach} email={profile.email} />,
  };

  return (
    <>
      <Head>
        <title>Profile Coach</title>
        <meta name="description" content="Profile Coach" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLogIn ? (
        // <CoachProfileContextProvider>
        <AuthenticatedLayout
          userType={UserType.coach}
          listItems={listItemsCoach}
          isOpenMobSideBar={isOpenMobSideBar}
          closeOpenMobSideBar={closeOpenMobSideBar}
        >
          <Box flex={1} p={2}>
            {profileComponents[href]}
          </Box>
          {isSubscriptionSuccess && (
            <MessageSubscription
              message={'You have successfully subscribed'}
              isSubscription={isSubscriptionSuccess}
              closeSuccessMessage={closeSuccessMessage}
            />
          )}
          {isSubscriptionCancel && (
            <MessageSubscription
              message={'Subscription was not completed'}
              isSubscription={isSubscriptionCancel}
              closeSuccessMessage={closeCancelMessage}
            />
          )}
        </AuthenticatedLayout>
      ) : (
        // </CoachProfileContextProvider>
        <LoginPage />
      )}
    </>
  );
}
