import {
  CalendarMonth,
  EmojiEvents,
  ExitToApp,
  Paid,
  Star,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

export interface IForTheCoaches {}

const forTheCoaches = [
  {
    icon: <ExitToApp sx={{ width: '30px', height: '30px' }} />,
    title: 'Sign up',
    description:
      'Sign up to FindMyCoach and create your profile under the ‘settings’ tab of the dashboard to give athletes a glimpse of who you are and what you can offer.',
  },
  {
    icon: <Paid sx={{ width: '30px', height: '30px' }} />,
    title: 'Connect with Stripe Express',
    description:
      'Connect your profile to Stripe for access to the booking and payments system. Stripe are trusted by millions of companies and make transactions fast, easy and secure. Utilise their account analytics to keep track of your businesses’ day-to-day earnings and trends!',
  },
  {
    icon: <CalendarMonth sx={{ width: '30px', height: '30px' }} />,
    title: 'Offer sessions',
    description:
      'Edit your availability under ‘My Appointments’ and then create your sessions in the ‘Packages’ tab. Create multiple 1-2-1 packages or group packages to suit your coaching requirements!',
  },
  {
    icon: <Star sx={{ width: '30px', height: '30px' }} />,
    title: 'Receive rating and reviews ',
    description:
      'Once a client books, pays and completes the session they can provide you with a 5 star rating and a review. These will be visible to potential clients moving forwards so make sure you encourage all of your clients who book through the platform to leave you feedback!',
  },
  {
    icon: <EmojiEvents sx={{ width: '30px', height: '30px' }} />,
    title: 'Earn reward',
    description:
      'Earn points by booking more sessions through our platform. These points can be redeemed in the ‘Rewards’ section of the dashboard for vouchers and cash prizes.',
  },
];

const ForTheCoaches: React.FC<IForTheCoaches> = () => {
  return (
    <>
      {forTheCoaches.map((item, index) => {
        return (
          <Box key={index} sx={{ position: 'relative' }}>
            <Card
              sx={{
                maxWidth: '520px',
                minHeight: '190px',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                borderRadius: '16px',
                p: '20px',
              }}
            >
              <Box
                color="#fff"
                bgcolor="#FFA629"
                sx={{
                  position: 'absolute',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: '-33px',
                  left: '10px',
                  zIndex: 100,
                  width: '62px',
                  height: '62px',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  '&>*:nth-child(2n)': {
                    right: '10px',
                    bottom: 0,
                  },
                }}
              >
                {item.icon}
              </Box>
              <Box>
                <CardContent>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: 'Inter, sense-serif',
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#000',
                        '&>*:nth-child(2n)': {
                          ml: '77px',
                        },
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'Inter, sense-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#333333',
                        '&>*:nth-child(2n)': {
                          ml: '77px',
                        },
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    size="small"
                    sx={{
                      color: '#000',
                      fontFamily: 'Inter, sense-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      p: '8px 20px',
                      borderRadius: '10px',
                      borderBottom: '0.5px solid #000',
                    }}
                  >
                    Read more
                  </Button>
                </CardActions>
              </Box>
            </Card>
          </Box>
        );
      })}
    </>
  );
};

export default ForTheCoaches;
