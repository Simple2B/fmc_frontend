import { Notifications } from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  useMediaQuery,
} from '@mui/material';
import { red } from '@mui/material/colors';
import React from 'react';

interface IMessageNotificationsProps {
  notificationCount: number;
}

export const MessageNotifications = ({
  notificationCount,
}: IMessageNotificationsProps) => {
  // eslint-disable-next-line no-unused-vars
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  // const open = Boolean(anchorEl);

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const matches970 = useMediaQuery('(max-width:970px)');
  return (
    <Box sx={{ postion: 'relative' }}>
      <Badge
        badgeContent={notificationCount}
        color="primary"
        sx={{
          display: matches970 ? 'none' : 'inline-block',
          position: 'relative',
          // display: { xs: 'none', sm: 'inline-block' },
          boxShadow: '0px 0px 5px rgba(142, 142, 142, 0.25)',
          border: '1px solid',
          p: '7px 9px',
          borderRadius: '50%',
          '&:hover': {
            boxShadow: '0px 0px 5px #1876D1',
            border: '1px solid',
            p: '7px 9px',
            borderRadius: '50%',
          },
        }}
        onClick={toggle}
      >
        <Box sx={{ position: 'absolute' }}>
          <Menu
            sx={{
              top: '2.5vw',
            }}
            id="basic-menu"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            anchorEl={anchorEl}
            open={isOpen}
            onClose={toggle}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem
              sx={{
                backgroundColor: 'white',
                width: '100%',
                margin: '0',
              }}
              onClick={toggle}
            >
              <Card sx={{ width: '100%', height: '0 auto' }}>
                <CardHeader
                  sx={{ backgroundColor: 'white', borderColor: 'white' }}
                  avatar={
                    <Avatar
                      sx={{
                        width: '0 auto',
                        height: '0 auto',
                        bgcolor: red[500],
                      }}
                      aria-label="recipe"
                    ></Avatar>
                  }
                  titleTypographyProps={{
                    color: 'black',
                    fontSize: '12px',
                    fontWeight: '400',
                    lineHeight: '16px',
                    fontFamily: 'Inter',
                  }}
                  title="How was your session with coach John on 16.08.2022?"
                />
                <Box
                  sx={{
                    width: '30%',
                    padding: '2%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                  }}
                >
                  <Box>
                    <Button
                      sx={{
                        fontSize: '12px',
                        fontFamily: 'Inter',
                        color: '#0814EF',
                        fontWeight: 'bold',
                      }}
                    >
                      Rate coach
                    </Button>
                  </Box>
                </Box>
              </Card>
            </MenuItem>
            <MenuItem
              sx={{
                backgroundColor: 'white',
                width: '100%',
                margin: '0',
              }}
              onClick={toggle}
            >
              <Card sx={{ width: '100%', height: '0 auto' }}>
                <CardHeader
                  sx={{ backgroundColor: 'white', borderColor: 'white' }}
                  avatar={
                    <Avatar
                      sx={{
                        width: '0 auto',
                        height: '0 auto',
                        bgcolor: red[500],
                      }}
                      aria-label="recipe"
                    ></Avatar>
                  }
                  titleTypographyProps={{
                    color: 'black',
                    fontSize: '12px',
                    fontWeight: '400',
                    lineHeight: '16px',
                    fontFamily: 'Inter',
                  }}
                  title="How was your session with coach John on 16.08.2022?"
                />
                <Box
                  sx={{
                    width: '30%',
                    padding: '2%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                  }}
                >
                  <Box>
                    <Button
                      sx={{
                        fontSize: '12px',
                        fontFamily: 'Inter',
                        color: '#0814EF',
                        fontWeight: 'bold',
                      }}
                    >
                      Rate coach
                    </Button>
                  </Box>
                </Box>
              </Card>
            </MenuItem>
          </Menu>
        </Box>

        <Notifications color="action" />
      </Badge>
    </Box>
  );
};
