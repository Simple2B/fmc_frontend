import { coachClientApi } from '@/fast_api_backend/api/usersInstance/coach/coachInstance';
import { studentClientApi } from '@/fast_api_backend/api/usersInstance/student/studentInstance';
import { UserType } from '@/store/types/user';
import { ICoachProfile } from '@/store/types/users/coach/coachType';
import { IStudentProfile } from '@/store/types/users/student/studentType';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ChatContacts } from './ChatContacts';
import { ChatMessages } from './ChatMessages';
import styles from './Messages.module.sass';
import { MessageContext } from './messageContext';

export interface IMessagesProps {
  userType: UserType;
}

const Messages: React.FC<IMessagesProps> = ({ userType }) => {
  const [selectedContact, setSelectedContact] = useState<
    ICoachProfile | IStudentProfile | null
  >(null);
  const { data } = useQuery(['contacts'], async () => {
    const request =
      userType === UserType.student
        ? studentClientApi.studentContactsList
        : coachClientApi.coachContactList;
    const result = await request();

    console.log('--------------> contacts', result);
    return result.contacts;
  });

  const onContactSelected = (contactUUID: string) => {
    const foundContact = data?.find((element) => {
      return element.user.uuid === contactUUID;
    });
    if (!foundContact) {
      return;
    }
    setSelectedContact(foundContact.user);
  };

  return (
    <MessageContext.Provider value={userType}>
      <Box alignItems={'center'} className={styles.wrapper}>
        {data && data.length > 0 ? (
          <>
            <ChatContacts
              contacts={data}
              selectedContactUUID={selectedContact?.uuid ?? ''}
              onContactSelected={onContactSelected}
            />
            <ChatMessages selectedContact={selectedContact} />
          </>
        ) : (
          <div className="">No chats</div>
        )}
      </Box>
    </MessageContext.Provider>
  );
};

export default Messages;
