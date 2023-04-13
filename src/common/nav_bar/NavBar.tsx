import SearchInput from '@/components/landing_page/search_box/SearchBox';
import { studentClientApi } from '@/fast_api_backend/api/usersInstance/student/studentInstance';
import { logout } from '@/helper/logout/logout';
import { NotificationService, StudentLesson, User } from '@/services';
import { UserType } from '@/store/types/user';
import {
  ArrowDropDown,
  ArrowDropUp,
  CalendarMonth,
  Close,
  Home,
  Menu as IconMenu,
  Logout,
} from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import logoFMC from '../../../public/LOGO.svg';
import MarkedCalendar from '../marked_calendar/MarkedCalendar';
import { MessageNotifications } from './MessageNotifications';
import style from './NavBar.module.sass';

export interface INavBar {
  username: string;
  picture: string;
  userType: string;
  // eslint-disable-next-line no-unused-vars
  setIsLoad: (value: React.SetStateAction<boolean>) => void;
  // eslint-disable-next-line no-unused-vars
  setProfile: (value: React.SetStateAction<User>) => void;
  closeOpenMobSideBar: () => void;
  isOpenMobSideBar: boolean;
}

const NavBar: React.FC<INavBar> = ({
  username,
  picture,
  userType,
  setIsLoad,
  setProfile,
  closeOpenMobSideBar,
  isOpenMobSideBar,
}) => {
  const anchorRef = React.useRef();
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [notificationCount, setNotificationCount] = React.useState<number>(0);
  const [notifications, setNotifications] = React.useState<StudentLesson[]>([]);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const router = useRouter();

  const matches970 = useMediaQuery('(max-width:970px)');

  const [anchorEl, setAnchorEl] = React.useState();
  React.useEffect(() => {
    setTimeout(() => setAnchorEl(anchorRef?.current), 1);
  }, [anchorRef]);

  useQuery(
    ['newNotificationsCount'],
    async () => {
      if (userType === UserType.student) {
        studentClientApi.studentGetReviewNotifications;
        const result = await NotificationService.apiGetReviewNotifications();
        console.log(result);
        setNotificationCount(result.count);
        setNotifications(result.lessons);
        return result.count;
      }
    },
    { refetchInterval: 10000 }
  );

  return (
    <AppBar
      position="sticky"
      sx={{ boxShadow: 'none', border: '0.3px solid #DBDBDB' }}
    >
      <Toolbar className={style.toolBar}>
        <Box
          onClick={() => router.push('/')}
          sx={{ display: matches970 ? 'none' : 'block' }}
        >
          {' '}
          <Image src={logoFMC} alt={'logo'} width={100} height={100} />
        </Box>

        <Typography
          variant="h6"
          color="#000"
          sx={{ display: matches970 ? 'flex' : 'none', cursor: 'pointer' }}
          // sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={closeOpenMobSideBar}
        >
          {!isOpenMobSideBar ? <IconMenu /> : <Close />}
        </Typography>

        {/* TODO: for search use mui Autocomplete */}
        {userType === UserType.student && (
          <div className={style.search}>
            {/* <InputBase placeholder="Search a coach" /> */}
            <SearchInput />
          </div>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {matches970 && router.asPath.split('?')[1] === 'my_lessons' && (
            <Box position={'relative'}>
              <CalendarMonth
                sx={{
                  width: 33,
                  height: 33,
                  color: '#F05547',
                  cursor: 'pointer',
                }}
                onClick={() => setIsOpenCalendar(!isOpenCalendar)}
              />
              {isOpenCalendar && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '38px',
                    right: '-100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '100',
                    borderRadius: '18px',
                    boxShadow: '0px 0px 5px #1664C0',
                  }}
                >
                  <MarkedCalendar />
                </Box>
              )}
            </Box>
          )}
          {userType === UserType.student && (
            <MessageNotifications
              notificationCount={notificationCount}
              notifications={notifications}
            />
          )}

          <Avatar src={picture} onClick={() => setOpen(!isOpen)} />
          <Box
            component="span"
            className={style.avatarName}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onClick={() => setOpen(!isOpen)}
            ref={anchorRef}
          >
            <Box>{username}</Box>
            {isOpen ? <ArrowDropDown /> : <ArrowDropUp />}
            <Menu
              id="basic-menu"
              sx={{
                mt: '25px',
                p: '0 15px',
                boxShadow: '0px 2px 14px rgba(107, 106, 106, 0.12)',
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
              anchorEl={anchorEl}
            >
              <MenuItem
                onClick={() => {
                  router.push('/');
                }}
              >
                <Home sx={{ mr: '7px' }} />
                Home
              </MenuItem>
              <MenuItem onClick={() => logout(setIsLoad, setProfile, router)}>
                <Logout sx={{ mr: '7px' }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
