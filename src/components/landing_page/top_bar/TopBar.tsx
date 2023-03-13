import { logout } from '@/helper/logout/logout';
import { UserType } from '@/store/types/user';
import { IStudentProfile } from '@/store/types/users/student/studentType';
import { ArrowDropDown, ArrowDropUp, Logout } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import linkLogo from '../../../../public/LOGO(WHITE).svg';
import style from '../LandingPage.module.sass';

export interface ITopBar {
  handleDrawerToggle: () => void;
  profile: IStudentProfile;
  // eslint-disable-next-line no-unused-vars
  setIsLoad: (value: React.SetStateAction<boolean>) => void;
  // eslint-disable-next-line no-unused-vars
  setUserType: (value: React.SetStateAction<string | null | undefined>) => void;
  // eslint-disable-next-line no-unused-vars
  setProfile: (value: React.SetStateAction<IStudentProfile>) => void;
  userType: string | null | undefined;
}

const TopBar: React.FC<ITopBar> = ({
  handleDrawerToggle,
  profile,
  setIsLoad,
  setUserType,
  setProfile,
  userType,
}) => {
  const matches1920 = useMediaQuery('(max-width:1920px)');
  const matches845 = useMediaQuery('(max-width:845px)');
  const router = useRouter();
  const [isOpen, setOpen] = React.useState<boolean>(false);
  return (
    <AppBar component="nav" color={'transparent'} className={style.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon sx={{ color: '#fff' }} />
        </IconButton>
        <Box
          component="div"
          sx={{
            flexGrow: 1,
            pt: '15px',
            pb: '15px',
            display: { xs: 'none', sm: 'block' },
            position: 'relative',
          }}
        >
          <Link
            href={'/'}
            style={{
              position: 'absolute',
              top: matches845 ? '-25px' : '-34px',
              left: matches845 ? '-14.5px' : '-15.5px',
            }}
          >
            <Image
              src={linkLogo}
              alt="LOGO"
              width={matches845 ? 100 : 124}
              height={matches845 ? 80 : 104}
            />
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            width: 'unset',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            className={`${style.commonTextStyle} ${style.infoText}`}
            sx={{
              width: matches1920 ? '100%' : '420px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {profile.is_verified ? (
              <Box
                sx={{
                  mt: 3,
                  mb: 2,
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: matches845 ? '40px' : '56px',
                  fontSize: matches845 ? '13px' : '16px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                  }}
                >
                  <Avatar
                    src={profile.profile_picture}
                    onClick={() => setOpen(!isOpen)}
                  />
                  <Box
                    component="span"
                    className={style.avatarName}
                    sx={{
                      display: { xs: 'none', sm: 'flex' },
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      position: 'relative',
                    }}
                    onClick={() => setOpen(!isOpen)}
                  >
                    <Box sx={{ color: 'white' }}>{profile.username}</Box>
                    {isOpen ? (
                      <ArrowDropDown sx={{ color: 'white' }} />
                    ) : (
                      <ArrowDropUp sx={{ color: 'white' }} />
                    )}
                    <Menu
                      id="basic-menu"
                      sx={{
                        mt: '25px',
                        p: '0 15px',
                        boxShadow: '0px 2px 14px rgba(107, 106, 106, 0.12)',
                        position: 'absolute',
                        left: 0,
                      }}
                      open={isOpen}
                      onClose={() => setOpen(false)}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem
                        onClick={() =>
                          logout(
                            setIsLoad,
                            setProfile,
                            router,
                            undefined,
                            setUserType
                          )
                        }
                      >
                        <Logout sx={{ mr: '7px' }} />
                        Logout
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          userType && userType === UserType.student
                            ? router.push('/profiles/student#my_lessons')
                            : router.push('/profiles/coach#my_appointments');
                        }}
                      >
                        {/* <UserProfile sx={{ mr: '7px' }} /> */}
                        Profile
                      </MenuItem>
                    </Menu>
                    {/*  */}
                  </Box>
                </Box>
              </Box>
            ) : (
              <>
                <Box className={style.signInText}>Sign in</Box>
                <Box
                  onClick={() => router.push('/sign_in/coach')}
                  className={`${style.commonTextStyle} ${style.btnText} ${style.btnLanding}`}
                >
                  Coach
                </Box>
                <Box className={style.signInText}> or </Box>
                <Box
                  onClick={() => router.push('/sign_in/student')}
                  className={`${style.commonTextStyle} ${style.btnText} ${style.btnLanding}`}
                >
                  Student
                </Box>
                <Button
                  onClick={() => router.push('/sign_up/coach_student')}
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    borderRadius: '8px',
                    textTransform: 'capitalize',
                    fontSize: matches845 ? '13px' : '16px',
                    width: matches845 ? '152px' : '199px',
                    height: matches845 ? '40px' : '56px',
                    textAlign: 'center',
                  }}
                >
                  Create account
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
