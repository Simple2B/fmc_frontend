/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContactList } from '../models/ContactList';
import type { Message } from '../models/Message';
import type { MessageData } from '../models/MessageData';
import type { MessageList } from '../models/MessageList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MessagesService {

    /**
     * Coach Create Message
     * @param requestBody
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static apiCoachCreateMessage(
        requestBody: MessageData,
    ): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/message/coach/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Coach List Of Contacts
     * @returns ContactList Successful Response
     * @throws ApiError
     */
    public static apiGetCoachListOfContacts(): CancelablePromise<ContactList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/message/coach/list-of-contacts',
        });
    }

    /**
     * Get Coach Student Messages
     * @param studentUuid
     * @returns MessageList Successful Response
     * @throws ApiError
     */
    public static apiGetCoachStudentMessages(
        studentUuid: string,
    ): CancelablePromise<MessageList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/message/coach/messages/{student_uuid}',
            path: {
                'student_uuid': studentUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Coach Student Messages
     * @param studentUuid
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiReadCoachStudentMessages(
        studentUuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/message/coach/messages/{student_uuid}/read',
            path: {
                'student_uuid': studentUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Student Create Message
     * @param requestBody
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static apiStudentCreateMessage(
        requestBody: MessageData,
    ): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/message/student/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Student List Of Contacts
     * @returns ContactList Successful Response
     * @throws ApiError
     */
    public static apiGetStudentListOfContacts(): CancelablePromise<ContactList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/message/student/list-of-contacts',
        });
    }

    /**
     * Get Student Coach Messages
     * @param coachUuid
     * @returns MessageList Successful Response
     * @throws ApiError
     */
    public static apiGetStudentCoachMessages(
        coachUuid: string,
    ): CancelablePromise<MessageList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/message/student/messages/{coach_uuid}',
            path: {
                'coach_uuid': coachUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Student Coach Messages
     * @param coachUuid
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiReadStudentCoachMessages(
        coachUuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/message/student/messages/{coach_uuid}/read',
            path: {
                'coach_uuid': coachUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
