import { StudentLesson } from '@/services';
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
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

interface IMessageNotificationsProps {
  notificationCount: number;
  notifications: StudentLesson[];
}

export const MessageNotifications = ({
  notificationCount,
  notifications,
}: IMessageNotificationsProps) => {
  // eslint-disable-next-line no-unused-vars
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const router = useRouter();
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const rateCoach = (sessionUUID: string) => {
    router.push(`/profiles/review/${sessionUUID}`);
  };
  return (
    <Box>
      <Badge
        badgeContent={notificationCount}
        sx={{
          display: 'inline-block',
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
          '& .MuiBadge-badge': {
            color: 'white',
            backgroundColor: '#222CDF',
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
            {notifications
              ? notifications.map((notification, index) => {
                  const date = new Date(notification.appointment_time);
                  const appointment_date = `${date.getUTCDate()}/${
                    date.getUTCMonth() + 1
                  }/${date.getUTCFullYear()}`;
                  return (
                    <MenuItem
                      key={index}
                      sx={{
                        backgroundColor: 'white',
                        width: '100%',
                        margin: '0',
                      }}
                      onClick={toggle}
                    >
                      <Card
                        onClick={() => rateCoach(notification.uuid)}
                        sx={{
                          width: '100%',
                          height: '0 auto',
                        }}
                      >
                        <CardHeader
                          sx={{
                            backgroundColor: 'white',
                            borderColor: 'white',
                          }}
                          avatar={
                            <Avatar
                              sx={{
                                width: '0 auto',
                                height: '0 auto',
                              }}
                              src={notification.coach.profile_picture}
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
                          title={`How was your session with coach ${notification.coach.first_name} on ${appointment_date}?`}
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
                  );
                })
              : ''}
          </Menu>
        </Box>

        <Notifications color="action" />
      </Badge>
    </Box>
  );
};
