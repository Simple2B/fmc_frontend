import Loader from '@/common/loader/Loader';
import MessageBox from '@/common/message_box/MessageBox';
import CustomModel from '@/common/modal/Modal';
import { getCurrentUser } from '@/helper/get_current_user';
import { logout } from '@/helper/logout/logout';
import { User } from '@/services';
import { UserType } from '@/store/types/user';
import { Logout } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Link,
  List,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import linkLogo from '../../../public/LOGO(WHITE).svg';
import style from './LandingPage.module.sass';
import SearchInput from './search_box/SearchBox';
import TopBar from './top_bar/TopBar';
import VideoBox from './video_box/VideoBox';

export interface ILandingPage {
  children?: any;
  window?: () => Window;
  wrapperClassName: string;
}

const drawerWidth = 240;

const LandingPage: React.FC<ILandingPage> = ({ window, wrapperClassName }) => {
  // const matches1920 = useMediaQuery('(max-width:1920px)');
  // const matches845 = useMediaQuery('(max-width:845px)');
  // const matches414 = useMediaQuery('(max-width:414px)');
  const matches320 = useMediaQuery('(max-width:320px)');

  const [isLoad, setIsLoad] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isSuccess, setSuccess] = React.useState<boolean>(false);

  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
  const [userType, setUserType] = React.useState<string | null>();

  console.log({ userType });

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [profile, setProfile] = React.useState<User>({
    uuid: '',
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    profile_picture: '',
    is_verified: false,
    stripe_account_id: null,
  });

  React.useEffect(() => {
    setUserType(localStorage.getItem('userType') ?? '');
  }, [isLoad]);

  React.useEffect(() => {
    if (userType)
      getCurrentUser(
        userType,
        setProfile,
        setIsLoad,
        setSuccess,
        setError
        // error
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  // bar for mobile version app
  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          my: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link href={'/'}>
          <Image src={linkLogo} alt="LOGO" width={120} height={103} />
        </Link>
      </Box>
      <Divider />
      <List>
        <Box
          className={`${style.commonTextStyle} ${style.btnText}`}
          style={{
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Box
            className={`${style.commonTextStyleMob}`}
            sx={{
              width: '98%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {profile.is_verified ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <Avatar
                  src={profile.profile_picture}
                  sx={{
                    color: 'rgba(0, 0, 0, 0.6)',
                    border: '0.3px solid rgba(0, 0, 0, 0.6)',
                  }}
                  onClick={() => {
                    userType && userType === UserType.student
                      ? router.push('/profiles/student?my_lessons')
                      : router.push('/profiles/coach?my_appointments');
                  }}
                />
                <Box
                  component="span"
                  className={style.avatarName}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                  }}
                >
                  <Box
                    sx={{ color: 'rgba(0, 0, 0, 0.6)' }}
                    onClick={() => {
                      userType && userType === UserType.student
                        ? router.push('/profiles/student?my_lessons')
                        : router.push('/profiles/coach?my_appointments');
                    }}
                  >
                    {profile.first_name.length > 0
                      ? `${profile.first_name} ${profile.last_name}`
                      : profile.username}
                  </Box>
                  <Box
                    onClick={() =>
                      logout(
                        setIsLoad,
                        setProfile,
                        router,
                        setMobileOpen,
                        setUserType
                      )
                    }
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '5px',
                      color: 'rgba(0, 0, 0, 0.6)',
                      cursor: 'pointer',
                    }}
                  >
                    <Logout />
                    <Typography>Logout</Typography>
                  </Box>
                </Box>
              </Box>
            ) : (
              <>
                <Box className={style.signInTextMob}>Sign in</Box>
                <Box
                  onClick={() => router.push('/sign_in/coach')}
                  className={`${style.textMob} ${style.btnLanding}`}
                >
                  Coach
                </Box>
                <Box className={style.signInTextMob}> or </Box>
                <Box
                  onClick={() => router.push('/sign_in/student')}
                  className={`${style.textMob} ${style.btnLanding}`}
                >
                  Athlete
                </Box>
                <Button
                  onClick={() => router.push('/sign_up/coach_student')}
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 5,
                    mb: 2,
                    borderRadius: '8px',
                    textTransform: 'capitalize',
                    fontSize: '18px',
                    width: '199px',
                    height: '50px',
                    textAlign: 'center',
                  }}
                >
                  Create account
                </Button>
              </>
            )}
          </Box>
        </Box>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!modalIsOpen) {
      setTimeout(() => {
        setModalIsOpen(true);
        setError(null);
      }, 1000);
    }
  }, [modalIsOpen, error]);

  // eslint-disable-next-line no-unused-vars
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

  // const sportsQuery = useQuery<ISport[], ErrorConstructor>(
  //   ['sports'],
  //   async () => {
  //     const request = coachProfileApi.getTypeSports;
  //     const result = await request();
  //     if (result) {
  //       setSports(
  //         result.map((s) => ({
  //           id: s.id ? s.id : 0,
  //           name: s.name,
  //           isActive: false,
  //         }))
  //       );
  //     }

  //     return result;
  //   }
  // );

  // const toggleSport = (sport: {
  //   id: number;
  //   name: string;
  //   isActive: boolean;
  // }) => {
  //   setSports(
  //     sports.map((s) => {
  //       if (sport.id === s.id) {
  //         return {
  //           ...s,
  //           isActive: !s.isActive,
  //         };
  //       }
  //       return s;
  //     })
  //   );
  // };

  return (
    <Box className={`${wrapperClassName}`}>
      <Box className={style.wrapperAppBar}>
        <VideoBox />
        <TopBar
          handleDrawerToggle={handleDrawerToggle}
          profile={profile}
          setIsLoad={setIsLoad}
          setUserType={setUserType}
          setProfile={setProfile}
          userType={userType}
        />
        <Box
          component="nav"
          sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                bgcolor: '#B8B8B8',
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" className={style.mainBox}>
          <Toolbar />
          <Box className={style.title}>Find your perfect coach</Box>
          <Box className={style.description}>
            We make it fast, simple and secure to book a coach that can help
            increase your potential.{' '}
          </Box>
          <Box
            sx={
              matches320
                ? {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                : {}
            }
          >
            <SearchInput sports={sports} />
            {/* <Box
              sx={{
                width: matches414
                  ? '142px'
                  : matches845
                  ? '200px'
                  : matches1920
                  ? '225px'
                  : '237px',
                height: matches320 ? '30px' : matches845 ? '40px' : '45px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                // flexWrap: 'wrap',
              }}
              gap={0.3}
            >
              {sportsQuery.data &&
                sports.length > 0 &&
                sports.map((sport, index) => {
                  if (
                    sport.name === 'Football' ||
                    sport.name === 'Rugby' ||
                    sport.name === 'Golf'
                  ) {
                    return (
                      <Box
                        key={index}
                        className={style.searchBtn}
                        sx={{
                          color: sport.isActive ? '#fff' : '#1A1B4B',
                          backgroundColor: sport.isActive ? 'grey' : '#fff',
                          '&:hover': {
                            // color: '#fff',
                            // backgroundColor: 'grey',
                            // fontSize: '16px',
                            // padding: '9px 17px',
                          },
                        }}
                        onClick={() => toggleSport(sport)}
                      >
                        {sport.name}
                      </Box>
                    );
                  }
                })}
            </Box> */}
          </Box>
        </Box>
      </Box>
      {isLoad && (
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
      )}
    </Box>
  );
};

export default LandingPage;
