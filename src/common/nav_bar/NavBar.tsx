import { logout } from '@/helper/logout/logout';
import { UserType } from '@/store/types/user';
import { IStudentProfile } from '@/store/types/users/student/studentType';
import {
  ArrowDropDown,
  ArrowDropUp,
  Logout,
  Menu as IconMenu,
  Notifications,
} from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';
import style from './NavBar.module.sass';

export interface INavBar {
  username: string;
  picture: string;
  userType: string;
  // eslint-disable-next-line no-unused-vars
  setIsLoad: (value: React.SetStateAction<boolean>) => void;
  // eslint-disable-next-line no-unused-vars
  setProfile: (value: React.SetStateAction<IStudentProfile>) => void;
}

const NavBar: React.FC<INavBar> = ({
  username,
  picture,
  userType,
  setIsLoad,
  setProfile,
}) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const router = useRouter();
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  return (
    <AppBar
      position="sticky"
      sx={{ boxShadow: 'none', border: '0.3px solid #DBDBDB' }}
    >
      <Toolbar className={style.toolBar}>
        <Typography
          variant="h6"
          color=""
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          Logo
        </Typography>
        <IconMenu sx={{ display: { xs: 'block', sm: 'none' } }} />
        {userType === UserType.student && (
          <div className={style.search}>
            <InputBase placeholder="Search a coach" />
          </div>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Badge
            badgeContent={3}
            color="primary"
            sx={{
              display: { xs: 'none', sm: 'inline-block' },
              boxShadow: '0px 0px 5px rgba(142, 142, 142, 0.25)',
              border: '1px solid',
              p: '7px 9px',
              borderRadius: '50%',
            }}
          >
            <Notifications color="action" />
          </Badge>
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
            >
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
