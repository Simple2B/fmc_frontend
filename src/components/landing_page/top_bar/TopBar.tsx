import { logout } from '@/helper/logout/logout';
import { IUserProfile, TypeTheme, UserType } from '@/store/types/user';
import {
  ArrowDropDown,
  ArrowDropUp,
  Logout,
  Person,
} from '@mui/icons-material';
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
import linkLogoDark from '../../../../public/LOGO.svg';

import style from '../LandingPage.module.sass';

export interface ITopBar {
  handleDrawerToggle: () => void;
  profile: IUserProfile;
  // eslint-disable-next-line no-unused-vars
  setIsLoad: (value: React.SetStateAction<boolean>) => void;
  // eslint-disable-next-line no-unused-vars
  setUserType: (value: React.SetStateAction<string | null | undefined>) => void;
  // eslint-disable-next-line no-unused-vars
  setProfile: (value: React.SetStateAction<IUserProfile>) => void;
  userType: string | null | undefined;
  theme?: string;
}

const TopBar: React.FC<ITopBar> = ({
  handleDrawerToggle,
  profile,
  setIsLoad,
  setUserType,
  setProfile,
  userType,
  theme,
}) => {
  const matches1920 = useMediaQuery('(max-width:1920px)');
  const matches845 = useMediaQuery('(max-width:845px)');
  const router = useRouter();
  // const [isOpen, setOpen] = React.useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      component="nav"
      color={'transparent'}
      className={style.appBar}
      sx={{
        maxWidth: TypeTheme.dark === theme ? '1140px' : '100% ',
        left: 'auto',
        right: 'auto',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <IconButton
          id="basic-button"
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon
            sx={{ color: TypeTheme.dark === theme ? '#000' : '#fff' }}
          />
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
              src={TypeTheme.dark === theme ? linkLogoDark : linkLogo}
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
                <Button
                  id="basic-button"
                  aria-controls={isOpen ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={isOpen ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                    }}
                  >
                    <Avatar src={profile.profile_picture} />
                    <Box
                      component="span"
                      className={style.avatarName}
                      sx={{
                        display: { xs: 'none', sm: 'flex' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        position: 'relative',
                      }}
                    >
                      <Box sx={{ color: 'white' }}>
                        {profile.first_name.length > 0
                          ? `${profile.first_name} ${profile.last_name}`
                          : profile.username}
                      </Box>
                      {isOpen ? (
                        <ArrowDropDown sx={{ color: 'white' }} />
                      ) : (
                        <ArrowDropUp sx={{ color: 'white' }} />
                      )}
                    </Box>
                  </Box>
                </Button>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={isOpen}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  sx={{
                    boxShadow: '0px 2px 14px rgba(107, 106, 106, 0.12)',
                    ml: '8%',
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      userType && userType === UserType.student
                        ? router.push('/profiles/student?my_lessons')
                        : router.push('/profiles/coach?my_appointments');
                    }}
                  >
                    <Person sx={{ mr: '7px' }} />
                    Profile
                  </MenuItem>
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
                </Menu>
              </Box>
            ) : (
              <>
                {/* color: $color-text */}
                <Box
                  className={style.signInText}
                  sx={{ color: TypeTheme.dark === theme ? '#000' : '#ffffff' }}
                >
                  Sign in
                </Box>
                <Box
                  onClick={() => router.push('/sign_in/coach')}
                  className={`${style.commonTextStyle} ${style.btnText} ${style.btnLanding}`}
                  sx={{
                    color: TypeTheme.dark === theme ? '#000' : '#ffffff',
                    borderBottom:
                      TypeTheme.dark === theme
                        ? '2px solid #000'
                        : '2px solid #ffffff',
                  }}
                >
                  Coach
                </Box>
                <Box className={style.signInText}> or </Box>
                <Box
                  onClick={() => router.push('/sign_in/student')}
                  className={`${style.commonTextStyle} ${style.btnText} ${style.btnLanding}`}
                  sx={{
                    color: TypeTheme.dark === theme ? '#000' : '#ffffff',
                    borderBottom:
                      TypeTheme.dark === theme
                        ? '2px solid #000'
                        : '2px solid #ffffff',
                  }}
                >
                  Athlete
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
