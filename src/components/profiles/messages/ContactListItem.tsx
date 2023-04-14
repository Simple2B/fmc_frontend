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

import { coachClientApi } from '@/fast_api_backend/api/usersInstance/coach/coachInstance';
import { studentClientApi } from '@/fast_api_backend/api/usersInstance/student/studentInstance';
import { Contact } from '@/services';
import { UserType } from '@/store/types/user';
import MoreHorizIcon from '@mui/icons-material/MoreHorizOutlined';
import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { MessageContext } from './messageContext';
interface ContactListItemProps {
  contactData: Contact;
  onSelected: (value: string) => void; // eslint-disable-line no-unused-vars
  selected: boolean;
}

export default function ContactListItem({
  contactData,
  onSelected,
  selected,
}: ContactListItemProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const queryClient = useQueryClient();
  const userType = useContext(MessageContext);
  const open = Boolean(anchorEl);

  const date = contactData.message
    ? new Date(contactData.message.created_at)
    : new Date();
  const last_message_date = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;

  const readMessageMutation = useMutation(
    async () => {
      const request =
        userType === UserType.student
          ? studentClientApi.studentReadMessageCoach
          : coachClientApi.coachReadMessageStudent;

      await request(contactData.user.uuid ?? '');
    },
    {
      onSuccess: () => {
        // todo
        queryClient.invalidateQueries('newNotificationsCount');
      },
    }
  );

  const handleSelect = () => {
    onSelected(contactData.user.uuid ?? '');
    readMessageMutation.mutate();
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
            width: ' 0 auto',
            height: '0 auto',
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
              lineHeight={'18px'}
            >
              {contactData && contactData.user
                ? `${contactData.user.first_name} ${contactData.user.last_name}`
                : contactData.user
                ? contactData.user.username
                : ''}
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
              lineHeight={'normal'}
            >
              {contactData.message?.text
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
          {last_message_date ? last_message_date : '...'}
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
