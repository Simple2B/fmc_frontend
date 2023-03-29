import MessageBox from '@/common/message_box/MessageBox';
import CustomModel from '@/common/modal/Modal';
import * as React from 'react';

// eslint-disable-next-line no-unused-vars
export interface IMessageSubscription {
  message: string;
  isSubscription: boolean;
  closeSuccessMessage: () => void;
}

const MessageSubscription: React.FC<IMessageSubscription> = ({
  message,
  isSubscription,
  closeSuccessMessage,
}) => {
  return (
    <CustomModel isOpen={isSubscription} handleClick={closeSuccessMessage}>
      <MessageBox message={message} handleClick={closeSuccessMessage} />
    </CustomModel>
  );
};

export default MessageSubscription;
