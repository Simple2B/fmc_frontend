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
import style from './SignUpSPLayout.module.sass';

export interface ISignUpSPLayout {
  children?: any;
  window?: () => Window;
  wrapperClassName: string;
  linkBackgroundImg: StaticImageData | string | null;
  linkLogo: StaticImageData | string;
  color: string;
}

const drawerWidth = 240;

const SignUpSPLayout: React.FC<ISignUpSPLayout> = ({
  children,
  window,
  linkLogo,
  linkBackgroundImg,
  wrapperClassName,
  color,
}) => {
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ my: 2 }}>
        <Image src={linkLogo} alt="LOGO" width={44} height={34} />
      </Box>
      <Divider />
      <List>
        <Link
          href="#"
          className={`${style.commonTextStyle} ${style.btnText}`}
          style={{
            color: `${color}`,
            borderBottom: `2px solid ${color}`,
            textAlign: 'center',
          }}
        >
          Log in
        </Link>
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
              <Image src={linkLogo} alt="LOGO" width={84} height={64} />
            </Box>
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                className={`${style.commonTextStyle} ${style.infoText}`}
                color={color}
              >
                Already have an account?
              </Box>
              <Link
                href="#"
                className={`${style.commonTextStyle} ${style.btnText}`}
                style={{
                  color: `${color}`,
                  borderBottom: `2px solid ${color}`,
                }}
              >
                Log in
              </Link>
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
    </Box>
  );
};

export default SignUpSPLayout;
