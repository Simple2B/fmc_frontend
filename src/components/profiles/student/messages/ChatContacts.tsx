import { IContact } from '@/store/types/message/messsageType';
import { Box, List } from '@mui/material';
import React from 'react';
import ContactListItem from './ContactListItem';

export interface IChatContacts {
  contacts: IContact[];
  selectedContactUUID: string;
  onContactSelected: (contactUUID: string) => void;
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
