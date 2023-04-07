/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StudentLesson } from '../models/StudentLesson';
import type { StudentLessonList } from '../models/StudentLessonList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LessonService {

    /**
     * Get Lessons For Student
     * @returns StudentLesson Successful Response
     * @throws ApiError
     */
    public static apiGetLessonsForStudent(): CancelablePromise<Array<StudentLesson>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/lesson/lessons/student',
        });
    }

    /**
     * Get Lesson
     * @param lessonUuid
     * @returns StudentLessonList Successful Response
     * @throws ApiError
     */
    public static apiGetLesson(
        lessonUuid: string,
    ): CancelablePromise<StudentLessonList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/lesson/lessons/student/upcoming',
            query: {
                'lesson_uuid': lessonUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Upcoming Appointments
     * @returns StudentLessonList Successful Response
     * @throws ApiError
     */
    public static apiGetUpcomingAppointments(): CancelablePromise<StudentLessonList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/lesson/lessons/coach/upcoming',
        });
    }

    /**
     * Get Lesson
     * @param lessonUuid
     * @returns StudentLesson Successful Response
     * @throws ApiError
     */
    public static apiGetLesson1(
        lessonUuid: string,
    ): CancelablePromise<StudentLesson> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/lesson/{lesson_uuid}',
            path: {
                'lesson_uuid': lessonUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
