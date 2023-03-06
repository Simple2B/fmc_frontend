import DescriptionIcon from '@mui/icons-material/Description';
import GradingIcon from '@mui/icons-material/Grading';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SensorsIcon from '@mui/icons-material/Sensors';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { Box, IconButton, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { Menu, MenuItem, Sidebar as ProSidebar } from 'react-pro-sidebar';

export interface IItem {
  title: string;
  to: string;
  icon: ReactElement<any, any>;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Item: React.FC<IItem> = ({
  title,
  to = '/',
  icon,
  selected,
  setSelected,
}) => {
  //   const theme = useTheme();

  const router = useRouter();

  return (
    <Box
      onClick={() => {
        setSelected(title);
        router.push(to);
      }}
    >
      <MenuItem
        active={selected === title}
        style={{
          color: selected === title ? 'blue' : 'grey',
        }}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </Box>
  );
};

export interface ISideBar {}

// eslint-disable-next-line no-empty-pattern
const SideBar: React.FC<ISideBar> = ({}) => {
  //   const theme = useTheme();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('Home');

  // TODO: must be refactoring this part of code
  useEffect(() => {
    if (router.asPath === '') {
      // setIsOpenModal(false);
      setSelected('Sensors');
    }
  }, [router.asPath]);

  return (
    <Box
      sx={{
        height: '100%',
        '& .pro-sidebar-inner': {
          //   background: `${colors.primary[400]} !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          // TODO: it will be checking
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
      }}
    >
      <ProSidebar
        defaultCollapsed={isCollapsed}
        backgroundColor={'#1F2A40'}
        style={{ height: '100vh' }}
      >
        <Menu>
          <Box
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
            style={{
              margin: '10px 18px 10px 18px',
              //   color: colors.grey[500],
            }}
          >
            {isCollapsed ? (
              <MenuOutlinedIcon
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '18px 10px 18px 10px',
                  color: '#fff',
                }}
              />
            ) : undefined}
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  sx={{
                    width: '60%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Link
                    href={'/'}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    LOGO
                    {/* <img src={logo} alt="logo" style={{ width: '100%' }} /> */}
                  </Link>
                </Box>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </Box>
          <div style={{ height: '1px', backgroundColor: 'rgba(0, 0, 0, 1)' }} />
          <Box>
            <Item
              title="Home"
              to="/profile"
              icon={<HomeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {!isCollapsed && (
              <Typography
                variant="h6"
                // color={colors.grey[300]}
                sx={{ m: '15px 0 5px 20px' }}
              >
                SensorLogic
              </Typography>
            )}
            <Item
              title="Sensors"
              to="/profile/sensors"
              icon={<SensorsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Groups"
              to="/profile/groups"
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Shared with me"
              to="/profile/shared_with_me"
              icon={<ShareIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="API Documentation"
              to="/profile/documentation"
              icon={<DescriptionIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Other Documentation"
              to="/profile/other_documentation"
              icon={<GradingIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <div
              style={{
                height: !isCollapsed ? '1px' : '0.5px',
                backgroundColor: 'rgba(0, 0, 0, 1)',
                marginTop: '7px',
              }}
            />
            {!isCollapsed && (
              <Typography
                variant="h6"
                // color={colors.grey[300]}
                sx={{ m: '15px 0 15px 20px' }}
              >
                Help and Resources
              </Typography>
            )}
            <div
              style={{
                height: !isCollapsed ? '1px' : '0.5px',
                backgroundColor: 'rgba(0, 0, 0, 1)',
                marginBottom: '7px',
              }}
            />
            <Item
              title="Subscriptions"
              to="/profile/subscriptions"
              icon={<SubscriptionsIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Item
              title="Legacy: Claim a SNOdar"
              to="/profile/claiming_sensor"
              icon={<AddTaskIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="USDA SNOTEL Sites"
              to="/profile/choose_usda_snotel_sites"
              icon={<SettingsInputCompositeIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Purchase a SNOdar"
              to="/profile/purchase_sensor"
              icon={<AddCardIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Support/Feature Request"
              to="/profile/support"
              icon={<InfoIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SideBar;
