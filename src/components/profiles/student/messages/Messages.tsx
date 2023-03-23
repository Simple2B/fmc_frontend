import { studentClientApi } from '@/fast_api_backend/api/usersInstance/student/studentInstance';
import { ICoachProfile } from '@/store/types/users/coach/coachType';
import { IStudentProfile } from '@/store/types/users/student/studentType';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ChatContacts } from './ChatContacts';
import { ChatMessages } from './ChatMessages';
import styles from './Messages.module.sass';
export interface IMessages {}

const Messages: React.FC<IMessages> = () => {
  const [selectedContact, setSelectedContact] = useState<
    ICoachProfile | IStudentProfile | null
  >(null);
  const { data } = useQuery(['contacts'], async () => {
    const result = await studentClientApi.studentContactList();

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
  );
};

export default Messages;
