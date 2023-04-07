import { Contact } from '@/services';
import { Box, List } from '@mui/material';
import React from 'react';
import ContactListItem from './ContactListItem';

export interface IChatContacts {
  contacts: Contact[];
  selectedContactUUID: string;
  onContactSelected: (value: string) => void; // eslint-disable-line no-unused-vars
}

export const ChatContacts: React.FC<IChatContacts> = ({
  contacts,
  selectedContactUUID,
  onContactSelected,
}) => {
  return (
    <>
      <Box
        sx={{
          width: '30%',
          height: '88vh',
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
          <>
            {contacts.map((item) => {
              return (
                <ContactListItem
                  key={item.user.uuid}
                  contactData={item}
                  onSelected={onContactSelected}
                  selected={item.user.uuid === selectedContactUUID}
                />
              );
            })}
          </>
        </List>
      </Box>
    </>
  );
};
