import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { TypeSign, UserType } from '../../../store/types/user';
import StudentLinks from './link/StudentLinks';
import style from './SignUpSPLayout.module.sass';

export interface ISignUpSPLayout {
  children?: any;
  window?: () => Window;
  wrapperClassName: string;
  linkBackgroundImg: StaticImageData | string | null;
  linkLogo: StaticImageData | string;
  color: string;
  description?: string;
  userType: string;
  typeSign?: string;
  isGoBack?: boolean;
}

const drawerWidth = 240;

const SignUpSPLayout: React.FC<ISignUpSPLayout> = ({
  children,
  window,
  linkLogo,
  linkBackgroundImg,
  wrapperClassName,
  color,
  description,
  userType,
  typeSign,
  isGoBack,
}) => {
  // const router = useRouter();
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
          <Image src={linkLogo} alt="LOGO" width={120} height={103} />
        </Link>
      </Box>
      <Divider />
      <List>
        <Box>
          {isGoBack && (
            <Link
              className={`${style.goBackMobContainer}`}
              color={'#222222'}
              href={`${
                userType === UserType.coach
                  ? '/sign_in/coach'
                  : '/sign_in/student'
              } `}
            >
              <p>
                <i className={style.arrowLeft}></i>
              </p>
              <span className={style.text}>Go back</span>
            </Link>
          )}
        </Box>
        <Box
          className={`${style.commonTextStyle} ${style.btnText}`}
          style={{
            color: `${color}`,
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {typeSign === TypeSign.up ? (
            <Box>
              <Box sx={{ padding: '10px' }}> Sign in </Box>
              <StudentLinks color={color} />
            </Box>
          ) : (
            <Box sx={{ padding: '10px' }}>
              <Link
                href="/sign_up/coach_student"
                className={`${style.commonTextStyle} ${style.btnText}`}
                style={{
                  color: `${color}`,
                  borderBottom: `2px solid ${color}`,
                }}
              >
                Sign up
              </Link>
            </Box>
          )}
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
        backgroundImage: `url(${linkBackgroundImg})`,
      }}
    >
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
              <MenuIcon sx={{ color: `${color}` }} />
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
                width: `${isGoBack ? '50%' : 'unset'}`,
                display: { xs: 'none', sm: 'flex' },
                justifyContent: `${isGoBack ? 'space-between' : 'none'}`,
                alignItems: 'center',
              }}
            >
              {isGoBack && (
                <Link
                  className={`${style.commonTextStyle} ${style.infoText}`}
                  color={'#222222'}
                  href={`${
                    userType === UserType.coach
                      ? '/sign_in/coach'
                      : '/sign_in/student'
                  } `}
                  style={{ marginLeft: '15px' }}
                >
                  <p>
                    <i className={style.arrowLeft}></i>
                  </p>
                  <span className={style.text}>Go back</span>
                </Link>
              )}

              <Box
                className={`${style.commonTextStyle} ${style.infoText}`}
                color={color}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box style={{ paddingRight: '10px' }}> {description} </Box>
                {typeSign === TypeSign.up ? (
                  <StudentLinks color={color} />
                ) : (
                  <Link
                    href="/sign_up/coach_student"
                    className={`${style.commonTextStyle} ${style.btnText}`}
                    style={{
                      color: `${color}`,
                      borderBottom: `2px solid ${color}`,
                    }}
                  >
                    Sign up
                  </Link>
                )}
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

export default SignUpSPLayout;
