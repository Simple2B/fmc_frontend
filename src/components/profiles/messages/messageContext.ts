import { UserType } from '@/store/types/user';
import { createContext } from 'react';

type MessageContextType = UserType | null;

export const MessageContext = createContext<MessageContextType>(null);
