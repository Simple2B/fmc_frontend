import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';
import style from './SideBar.module.sass';

export interface IItem {
  name: string;
  icon?: any;
  href: string;
}

export interface ISideBar {
  listItems: IItem[];
  closeOpenMobSideBar?: () => void;
}

const SideBar: React.FC<ISideBar> = ({ listItems, closeOpenMobSideBar }) => {
  // const matches970 = useMediaQuery('(max-width:970px)');

  const router = useRouter();
  return (
    <Box flex={1} p={2}>
      <Box className={style.fixedBox} position={'fixed'}>
        <List
          sx={{
            // boxShadow: '0px 0px 5px rgba(142, 142, 142, 0.25)',
            // selected and (selected + hover) states
            '&& .Mui-selected, && .Mui-selected:hover': {
              width: '100%',
              bgcolor: 'rgba(24, 118, 209, 0.3)',
              '&, & .MuiListItemIcon-root': {
                color: '#fff',
                fontWeight: 600,
              },
            },
            // hover states
            '& .MuiListItemButton-root:hover': {
              width: '100%',
              bgcolor: 'rgba(24, 118, 209, 0.3)',
              '&, & .MuiListItemIcon-root': {
                color: '#fff',
                fontWeight: 600,
              },
            },
          }}
        >
          {listItems.map((item, index) => {
            return (
              <ListItem
                disablePadding
                key={index}
                sx={{
                  '&:hover': {
                    backgroundColor: '#fff',
                  },
                }}
              >
                <ListItemButton
                  component="a"
                  onClick={() => {
                    if (closeOpenMobSideBar) closeOpenMobSideBar();
                    console.log('====================================');
                    console.log(' item.href ', item.href);
                    console.log('====================================');
                    router.push(item.href, undefined, { shallow: true });
                  }}
                >
                  <ListItemIcon>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        background:
                          'linear-gradient(0deg, #FFFFFF, #FFFFFF), #FFFFFF',
                        border: '1 solid rgba(0, 0, 0, 0.4)',
                        borderRadius: '54px ',
                        '&:hover': {
                          backgroundColor: '#1876D1',
                        },
                      }}
                    >
                      {item.icon}
                    </Box>
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default SideBar;
