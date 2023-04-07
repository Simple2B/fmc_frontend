import { CalendarMonth, ExitToApp, Paid, Star } from '@mui/icons-material';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/router';

export interface IForTheCoaches {}

const forTheCoaches = [
  {
    icon: <ExitToApp sx={{ width: '30px', height: '30px' }} />,
    title: 'Sign up',
    description:
      'Sign up to FindMyCoach and create your profile under the ‘settings’ tab of the dashboard to give athletes a glimpse of who you are and what you can offer.',
    type: 'left',
    href: '/sign_up/coach',
  },
  {
    icon: <Paid sx={{ width: '30px', height: '30px' }} />,
    title: 'Connect with Stripe Express',
    description:
      'Connect your profile to Stripe for access to the booking and payments system. Stripe are trusted by millions of companies and make transactions fast, easy and secure. Utilise their account analytics to keep track of your businesses’ day-to-day earnings and trends!',
    type: 'right',
    href: '#',
  },
  {
    icon: <CalendarMonth sx={{ width: '30px', height: '30px' }} />,
    title: 'Offer sessions',
    description:
      'Edit your availability under ‘My Appointments’ and then create your sessions in the ‘Packages’ tab. Create multiple 1-2-1 packages or group packages to suit your coaching requirements!',
    type: 'left',
    href: '#',
  },
  {
    icon: <Star sx={{ width: '30px', height: '30px' }} />,
    title: 'Receive rating and reviews ',
    description:
      'Once a client books, pays and completes the session they can provide you with a 5 star rating and a review. These will be visible to potential clients moving forwards so make sure you encourage all of your clients who book through the platform to leave you feedback!',
    type: 'right',
    href: '#',
  },
  // {
  //   icon: <EmojiEvents sx={{ width: '30px', height: '30px' }} />,
  //   title: 'Earn reward',
  //   description:
  //     'Earn points by booking more sessions through our platform. These points can be redeemed in the ‘Rewards’ section of the dashboard for vouchers and cash prizes.',
  //   type: 'left',
  //   href: '#',
  // },
];

const ForTheCoaches: React.FC<IForTheCoaches> = () => {
  const router = useRouter();
  const matches1111 = useMediaQuery('(max-width:1111px)');

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
                mt: matches1111 ? 0 : item.type === 'right' ? '95px' : 'none',
              }}
            >
              <Box
                color="#fff"
                bgcolor="#FFA629"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  right: item.type === 'right' ? '10px' : '',
                  left: item.type === 'left' ? '10px' : '',
                  top: matches1111
                    ? '-33px'
                    : item.type === 'right'
                    ? '64px'
                    : '-33px',
                  zIndex: 100,
                  width: '62px',
                  height: '62px',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  '&:hover': {
                    boxShadow: '0px 0px 5px #FFA629',
                  },
                }}
                onClick={() => router.push(item.href)}
              >
                {item.icon}
              </Box>
              <Box>
                <CardContent>
                  <Box
                    sx={{
                      ml: item.type === 'left' ? '45px' : '',
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Inter, sense-serif',
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#000',
                        mb: '10px',
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
                  <Box
                    sx={{
                      color: '#000',
                      fontFamily: 'Inter, sense-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      p: '5px 3px',
                      borderBottom: '0.5px solid #000',
                      cursor: 'pointer',
                      '&:hover': {
                        color: '#FFA629',
                        borderBottom: '0.5px solid #FFA629',
                      },
                    }}
                  >
                    Read more
                  </Box>
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
