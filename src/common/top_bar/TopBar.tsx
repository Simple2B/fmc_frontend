import { Box, IconButton } from '@mui/material';
import * as React from 'react';
// import { tokens } from '../../../theme';
// import SearchIcon from '@mui/icons-material/Search';
// import LogoutTopBar from '../components/LogoutTopBar/LogoutTopBar';
// import { Popup } from '../components/Popup/Popup';

export interface ITopBar {}

// eslint-disable-next-line no-empty-pattern
const TopBar: React.FC<ITopBar> = ({}) => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        sx={{
          // backgroundColor: colors.primary[400],
          backgroundColor: 'transparent',

          width: '70%',
        }}
        borderRadius="3px"
      >
        {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
      </Box>
      <Box display="flex">
        <IconButton>
          {/* TODO: add href */}
          {/* <Link
            href={'/profile/alert_setup_page'}
            style={{
              display: 'inline-flex',
              textDecoration: 'none',
              color: '#fff',
              verticalAlign: 'middle',
              fontSize: '1.2857142857142856rem',
              padding: '8px',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              outline: 0,
              border: 0,
              margin: 0,
            }}
          >
            <NotificationsOutlinedIcon />
          </Link> */}
        </IconButton>
        <IconButton>
          {/* <Popup
            menu={[
              { item: 'Settings', path: '/profile/settings' },
              // { item: 'Account', path: '/profile/account' },
            ]}
            // eslint-disable-next-line react/no-children-prop
            children={<SettingsOutlinedIcon />}
          /> */}
        </IconButton>
        <IconButton>{/* <LogoutTopBar /> */}</IconButton>
      </Box>
    </Box>
  );
};

export default TopBar;
