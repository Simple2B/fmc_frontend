/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MessageType } from './MessageType';

export type BaseMessage = {
    uuid: string;
    text?: string;
    created_at: string;
    is_read: boolean;
    message_type: (string | MessageType);
};

