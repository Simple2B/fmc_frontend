import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React from 'react';

export default function ChatContacts() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box
        sx={{
          width: '30%',
          height: 900,
          border: '0.5px solid #DBDBDB',
          borderRight: '1px solid #DBDBDB',
          overflow: 'hidden',
          overflowY: 'scroll',
        }}
      >
        <List
          sx={{
            width: '100%',
            maxWidth: '100%',
            bgcolor: 'background.paper',
            padding: 0,
          }}
        >
          {/* Contact number one */}
          <ListItem
            sx={{
              backgroundColor: '#F8F8F8',
              padding: '5%',
              position: 'relative',
            }}
            alignItems="flex-start"
          >
            <Avatar
              sx={{
                width: '15%',
                height: '15%',
                backgroundColor: '#F8F8F8',
              }}
              alt="Remy Sharp"
              src="https://find-my-coach-eu.s3.eu-west-2.amazonaws.com/assets/test_coach_avatar.png"
            />
            <ListItemText
              sx={{ margin: 1 }}
              disableTypography
              primary={
                <Typography
                  sx={{ display: 'block' }}
                  variant="body2"
                  fontFamily={'Inter'}
                  fontSize={'1rem'}
                  fontWeight={'600'}
                  lineHeight={'24px'}
                >
                  John Lee
                </Typography>
              }
              secondary={
                <Typography
                  component="span"
                  fontFamily={'Inter'}
                  fontSize={'0.75rem'}
                  fontWeight={'400'}
                  color={'Inter'}
                  lineHeight={'18px'}
                >
                  Hello,we have a session tomorrow
                </Typography>
              }
            />
            <Typography
              fontFamily={'Inter'}
              fontSize={'0.65rem'}
              fontWeight={'400'}
              color="#9E9E9E"
            >
              12/08/2023
            </Typography>

            <IconButton
              sx={{
                color: '#222CDF',
                position: 'absolute',
                top: '60%',
                right: '5%',
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreHorizIcon />
            </IconButton>

            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
          </ListItem>
          <Divider />

          {/* Contact number 2 */}
          <ListItem
            sx={{
              padding: '5%',
              position: 'relative',
            }}
            alignItems="flex-start"
          >
            <Avatar
              sx={{
                width: '15%',
                height: '15%',
                backgroundColor: '#F8F8F8',
              }}
              alt="Remy Sharp"
              src="https://find-my-coach-eu.s3.eu-west-2.amazonaws.com/assets/test_coach_avatar.png"
            />
            <ListItemText
              sx={{ margin: 1 }}
              disableTypography
              primary={
                <Typography
                  sx={{ display: 'block' }}
                  variant="body2"
                  fontFamily={'Inter'}
                  fontSize={'1rem'}
                  fontWeight={'600'}
                  lineHeight={'24px'}
                >
                  John Lee
                </Typography>
              }
              secondary={
                <Typography
                  component="span"
                  fontFamily={'Inter'}
                  fontSize={'0.8rem'}
                  fontWeight={'400'}
                  color={'Inter'}
                  lineHeight={'18px'}
                >
                  Hello,we have a session tomorrow
                </Typography>
              }
            />
            <Typography
              fontFamily={'Inter'}
              fontSize={'0.65rem'}
              fontWeight={'400'}
              color="#9E9E9E"
            >
              12/08/2023
            </Typography>

            <IconButton
              sx={{
                color: '#222CDF',
                position: 'absolute',
                top: '50%',
                right: '5%',
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreHorizIcon />
            </IconButton>

            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Delete </MenuItem>
            </Menu>
          </ListItem>
        </List>
      </Box>
    </>
  );
}
