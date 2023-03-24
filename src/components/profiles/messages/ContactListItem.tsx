import { IContact } from '@/store/types/message/messsageType';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

import MoreHorizIcon from '@mui/icons-material/MoreHorizOutlined';
import { useState } from 'react';
interface ContactListItemProps {
  contactData: IContact;
  onSelected: (value: string) => void; // eslint-disable-line no-unused-vars
  selected: boolean;
}

export default function ContactListItem({
  contactData,
  onSelected,
  selected,
}: ContactListItemProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const date = new Date(
    contactData.message ? contactData.message.created_at : ''
  );
  const last_message_date = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
  const handleSelect = () => {
    onSelected(contactData.user.uuid);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    console.log('Deleted');
  };
  return (
    <Box onClick={handleSelect}>
      {' '}
      <ListItem
        sx={{
          backgroundColor: selected ? '#F8F8F8' : 'white',
          padding: '5%',
          position: 'relative',
        }}
        alignItems="flex-start"
      >
        <Avatar
          sx={{
            marginTop: '2.5%',
            marginLeft: '2.5%',
          }}
          alt="Remy Sharp"
          src={contactData.user.profile_picture}
        />
        <ListItemText
          sx={{ marginLeft: '5%' }}
          disableTypography
          primary={
            <Typography
              fontSize={{
                lg: 18,
                md: 14,
                sm: 12,
                xs: 10,
              }}
              fontFamily={'Inter'}
              fontWeight={'600'}
              lineHeight={'24px'}
            >
              {contactData.user.first_name} {contactData.user.last_name}
            </Typography>
          }
          secondary={
            <Typography
              fontSize={{
                lg: 14,
                md: 10,
                sm: 9,
                xs: 7,
              }}
              component="span"
              fontFamily={'Inter'}
              fontWeight={'400'}
              color={'Inter'}
              lineHeight={'18px'}
            >
              {contactData.message
                ? contactData.message.text.replace(/(.{20})..+/, '$1…')
                : 'You have no messages with this user'}
            </Typography>
          }
        />
        <Typography
          fontSize={{
            lg: 12,
            md: 10,
            sm: 8,
            xs: 7,
          }}
          fontFamily={'Inter'}
          fontWeight={'400'}
          color="#9E9E9E"
        >
          {last_message_date ? last_message_date : ''}
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
          // onClick={handleClick}
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
          <MenuItem
            sx={{
              fontFamily: 'Inter',
              fontSize: '1rem',
            }}
            onClick={handleDelete}
          >
            Delete
          </MenuItem>
        </Menu>
      </ListItem>
      <Divider />
    </Box>
  );
}
