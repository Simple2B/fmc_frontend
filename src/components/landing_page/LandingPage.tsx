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
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import linkLogo from '../../../public/LOGO(WHITE).svg';
import style from './LandingPage.module.sass';
import SearchInput from './search_box/SearchBox';
import VideoBox from './video_box/VideoBox';

export interface ILandingPage {
  children?: any;
  window?: () => Window;
  wrapperClassName: string;
}

const drawerWidth = 240;

const LandingPage: React.FC<ILandingPage> = ({ window, wrapperClassName }) => {
  // const matches1114 = useMediaQuery('(max-width:1114px)');
  const matches845 = useMediaQuery('(max-width:845px)');
  // const matches445 = useMediaQuery('(max-width:445px)');
  const matches320 = useMediaQuery('(max-width:320px)');
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
    <Box className={`${wrapperClassName}`}>
      <Box className={style.wrapperAppBar}>
        <VideoBox />
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
                  width: '420px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
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
          <Box className={style.title}>Find your perfect coach</Box>
          <Box className={style.description}>
            We make it fast, simple and secure to book a coach that can help
            increase your potential.{' '}
          </Box>
          <Box
            sx={
              matches320
                ? {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                : {}
            }
          >
            <SearchInput />
            <Box
              sx={{
                width: matches845 ? '200px' : '237px',
                height: matches320 ? '30px' : matches845 ? '40px' : '45px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Button className={style.searchBtn}>Soccer</Button>
              <Button className={style.searchBtn}>Rugby</Button>
              <Button className={style.searchBtn}>Golf</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
