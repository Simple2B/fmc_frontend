/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StudentLesson } from '../models/StudentLesson';
import type { UpcomingLessonList } from '../models/UpcomingLessonList';

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
     * Get Upcoming Lessons
     * @returns UpcomingLessonList Successful Response
     * @throws ApiError
     */
    public static apiGetUpcomingLessons(): CancelablePromise<UpcomingLessonList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/lesson/lessons/student/upcoming',
        });
    }

    /**
     * Get Upcoming Appointments
     * @returns UpcomingLessonList Successful Response
     * @throws ApiError
     */
    public static apiGetUpcomingAppointments(): CancelablePromise<UpcomingLessonList> {
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
    public static apiGetLesson(
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
