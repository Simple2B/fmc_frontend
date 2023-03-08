import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  Toolbar,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import linkLogo from '../../../public/LOGO(WHITE).svg';
import style from './LandingPage.module.sass';

export interface ILandingPage {
  children?: any;
  window?: () => Window;
  wrapperClassName: string;
}

const drawerWidth = 240;

const LandingPage: React.FC<ILandingPage> = ({
  children,
  window,
  wrapperClassName,
}) => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          my: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link href={'/'}>
          <Image src={linkLogo} alt="LOGO" width={65} height={48} />
        </Link>
      </Box>
      <Divider />
      <List>
        <Box
          className={`${style.commonTextStyle} ${style.btnText}`}
          style={{
            // color: `${color}`,
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Box sx={{ padding: '10px' }}>
            <Link
              href="/sign_up/coach_student"
              className={`${style.commonTextStyle} ${style.btnText}`}
              style={
                {
                  // color: `${color}`,
                  // borderBottom: `2px solid ${color}`,
                }
              }
            >
              Sign up
            </Link>
          </Box>
        </Box>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      className={`${wrapperClassName}`}
      sx={{
        display: 'flex',
        backgroundColor: 'grey',
        margin: '0 auto',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '932px',
          top: 0,
          right: 0,
          left: 0,
        }}
      >
        <video autoPlay muted loop id="myVideo">
          <source
            src={
              'https://find-my-coach.s3.amazonaws.com/assets/pexels-cottonbro-10340715.mp4'
            }
            type="video/mp4"
          />
        </video>
      </Box>
      <Box className={style.wrapperAppBar}>
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
              }}
            >
              <Link href={'/'}>
                <Image src={linkLogo} alt="LOGO" width={104} height={84} />
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
                  width: '420px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  className={style.signInText}
                  sx={{ color: '#1876D1', mr: '15px', textAlign: 'center' }}
                >
                  Sign in
                </Box>
                <Box
                  onClick={() => router.push('/sign_in/coach')}
                  className={`${style.commonTextStyle} ${style.btnText}`}
                  style={{
                    color: '#fff',
                    borderBottom: '2px solid #fff',
                    marginRight: '15px',
                    textAlign: 'center',
                  }}
                >
                  Coach
                </Box>
                <Box sx={{ color: '#1876D1', mr: '15px', textAlign: 'center' }}>
                  {' '}
                  or{' '}
                </Box>
                <Box
                  onClick={() => router.push('/sign_in/student')}
                  className={`${style.commonTextStyle} ${style.btnText}`}
                  style={{
                    color: '#fff',
                    borderBottom: '2px solid #fff',
                    marginRight: '15px',
                    textAlign: 'center',
                  }}
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
                    width: '199px',
                    height: '56px',
                    textAlign: 'center',
                  }}
                >
                  Create account
                </Button>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
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
          {children}
        </Box>
      </Box>

      {/* {isLoad && (
        <CustomModel isOpen={isLoad}>
          <Loader />
        </CustomModel>
      )} */}
    </Box>
  );
};

export default LandingPage;
