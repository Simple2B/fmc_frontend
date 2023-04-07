/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MessageType } from './MessageType';
import type { User } from './User';

export type Message = {
    uuid: string;
    text?: string;
    created_at: string;
    is_read: boolean;
    message_type: (string | MessageType);
    author?: User;
    receiver: User;
};

