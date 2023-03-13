import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';

export interface IItem {
  name: string;
  icon?: any;
  href: string;
}

export interface ISideBar {
  listItems: IItem[];
}

const SideBar: React.FC<ISideBar> = ({ listItems }) => {
  const router = useRouter();
  return (
    <Box flex={1} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
      <List>
        {listItems.map((item, index) => {
          return (
            <ListItem disablePadding key={index}>
              <ListItemButton
                component="a"
                onClick={() =>
                  router.push(item.href, undefined, { shallow: true })
                }
                // href={item.href}
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
  );
};

export default SideBar;
