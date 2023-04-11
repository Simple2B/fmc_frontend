/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseLesson } from '../models/BaseLesson';
import type { BaseReview } from '../models/BaseReview';
import type { BaseSchedule } from '../models/BaseSchedule';
import type { BaseUser } from '../models/BaseUser';
import type { Body_API_coach_login } from '../models/Body_API_coach_login';
import type { Body_API_student_login } from '../models/Body_API_student_login';
import type { Body_API_update_coach_personal_info } from '../models/Body_API_update_coach_personal_info';
import type { Body_API_update_coach_profile } from '../models/Body_API_update_coach_profile';
import type { Body_API_update_student_personal_info } from '../models/Body_API_update_student_personal_info';
import type { CheckoutSession } from '../models/CheckoutSession';
import type { Coach } from '../models/Coach';
import type { CoachList } from '../models/CoachList';
import type { ContactDataIn } from '../models/ContactDataIn';
import type { ContactList } from '../models/ContactList';
import type { GAPIKeysSchema } from '../models/GAPIKeysSchema';
import type { Lesson } from '../models/Lesson';
import type { LessonList } from '../models/LessonList';
import type { ListSportType } from '../models/ListSportType';
import type { LocationList } from '../models/LocationList';
import type { Message } from '../models/Message';
import type { MessageData } from '../models/MessageData';
import type { MessageList } from '../models/MessageList';
import type { NewsletterSubscription } from '../models/NewsletterSubscription';
import type { Product } from '../models/Product';
import type { ProfileChangePasswordIn } from '../models/ProfileChangePasswordIn';
import type { ReviewList } from '../models/ReviewList';
import type { Schedule } from '../models/Schedule';
import type { ScheduleList } from '../models/ScheduleList';
import type { StudentLesson } from '../models/StudentLesson';
import type { StudentLessonList } from '../models/StudentLessonList';
import type { Subscription } from '../models/Subscription';
import type { Token } from '../models/Token';
import type { UnreviewedLessonsList } from '../models/UnreviewedLessonsList';
import type { User } from '../models/User';
import type { UserGoogleLogin } from '../models/UserGoogleLogin';
import type { UserResetPasswordIn } from '../models/UserResetPasswordIn';
import type { UserSignUp } from '../models/UserSignUp';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ApiService {

    /**
     * Student Login
     * @param formData
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static apiStudentLogin(
        formData: Body_API_student_login,
    ): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/student/login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Student Sign Up
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiStudentSignUp(
        requestBody: UserSignUp,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/student/sign-up',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Student Account Confirmation
     * @param token
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiStudentAccountConfirmation(
        token: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/student/account-confirmation/{token}',
            path: {
                'token': token,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Forgot Password Student
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiForgotPasswordStudent(
        requestBody: BaseUser,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/student/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Student Reset Password
     * @param verificationToken
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiStudentResetPassword(
        verificationToken: string,
        requestBody: UserResetPasswordIn,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/student/reset-password/{verification_token}',
            path: {
                'verification_token': verificationToken,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Student Google Auth
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiStudentGoogleAuth(
        requestBody: UserGoogleLogin,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/student/google-oauth',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Coach Login
     * @param formData
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static apiCoachLogin(
        formData: Body_API_coach_login,
    ): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/coach/login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Coach Sign Up
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiCoachSignUp(
        requestBody: UserSignUp,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/coach/sign-up',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Coach Account Confirmation
     * @param token
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiCoachAccountConfirmation(
        token: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/coach/account-confirmation/{token}',
            path: {
                'token': token,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Forgot Password
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiForgotPassword(
        requestBody: BaseUser,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/coach/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Coach Reset Password
     * @param verificationToken
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiCoachResetPassword(
        verificationToken: string,
        requestBody: UserResetPasswordIn,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/coach/reset-password/{verification_token}',
            path: {
                'verification_token': verificationToken,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Coach Google Auth
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiCoachGoogleAuth(
        requestBody: UserGoogleLogin,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/coach/google-oauth',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Whoami Student
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiWhoamiStudent(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/whoami/student',
        });
    }

    /**
     * Whoami Coach
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiWhoamiCoach(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/whoami/coach',
        });
    }

    /**
     * Get Info Coach Profile
     * @returns Coach Successful Response
     * @throws ApiError
     */
    public static apiGetInfoCoachProfile(): CancelablePromise<Coach> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/info/coach',
        });
    }

    /**
     * Get Coach Profile
     * @returns User Successful Response
     * @throws ApiError
     */
    public static apiGetCoachProfile(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/coach',
        });
    }

    /**
     * Get Coach By Uuid
     * @param coachUuid
     * @returns Coach Successful Response
     * @throws ApiError
     */
    public static apiGetCoachByUuid(
        coachUuid: string,
    ): CancelablePromise<Coach> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/coach/{coach_uuid}',
            path: {
                'coach_uuid': coachUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Student Profile
     * @returns User Successful Response
     * @throws ApiError
     */
    public static apiGetStudentProfile(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/student',
        });
    }

    /**
     * Get Coach Subscription
     * @returns Subscription Successful Response
     * @throws ApiError
     */
    public static apiGetCoachSubscription(): CancelablePromise<Subscription> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/coach/subscription/info',
        });
    }

    /**
     * Update Coach Personal Info
     * @param formData
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiUpdateCoachPersonalInfo(
        formData: Body_API_update_coach_personal_info,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/profile/coach/personal-info',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Student Personal Info
     * @param formData
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiUpdateStudentPersonalInfo(
        formData: Body_API_update_student_personal_info,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/profile/student/personal-info',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Coach Profile
     * @param formData
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiUpdateCoachProfile(
        formData?: Body_API_update_coach_profile,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/profile/coach/profile-info',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Coach Change Password
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiCoachChangePassword(
        requestBody: ProfileChangePasswordIn,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/profile/coach/change-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Student Change Password
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiStudentChangePassword(
        requestBody: ProfileChangePasswordIn,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/profile/student/change-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Coach Cards
     * Returns all cards for UNauthorized user
     * @param name
     * @param sportIds
     * @param address
     * @returns CoachList Successful Response
     * @throws ApiError
     */
    public static apiGetCoachCards(
        name?: string,
        sportIds?: Array<number>,
        address?: string,
    ): CancelablePromise<CoachList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/profiles/search/cards',
            query: {
                'name': name,
                'sport_ids': sportIds,
                'address': address,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Coach Locations
     * @returns LocationList Successful Response
     * @throws ApiError
     */
    public static apiCoachLocations(): CancelablePromise<LocationList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/coach/locations/info',
        });
    }

    /**
     * Coach Sports
     * @returns ListSportType Successful Response
     * @throws ApiError
     */
    public static apiCoachSports(): CancelablePromise<ListSportType> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/profile/coach/sports/info',
        });
    }

    /**
     * Get Gapi Keys
     * @returns GAPIKeysSchema Successful Response
     * @throws ApiError
     */
    public static apiGetGapiKeys(): CancelablePromise<GAPIKeysSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/keys/google',
        });
    }

    /**
     * Send Contact Request
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiSendContactRequest(
        requestBody: ContactDataIn,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contact/question',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Sports
     * @returns ListSportType Successful Response
     * @throws ApiError
     */
    public static apiGetSports(): CancelablePromise<ListSportType> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/sports/types',
        });
    }

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
     * @returns StudentLessonList Successful Response
     * @throws ApiError
     */
    public static apiGetUpcomingLessons(): CancelablePromise<StudentLessonList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/lesson/lessons/student/upcoming',
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

    /**
     * Send Contact Request
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiSendContactRequest1(
        requestBody: NewsletterSubscription,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/newsletter/subscribe',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Coach Stripe Product
     * @returns Product Successful Response
     * @throws ApiError
     */
    public static apiGetCoachStripeProduct(): CancelablePromise<Product> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/stripe/coach/products',
        });
    }

    /**
     * Reserve Booking
     * @param scheduleUuids
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiReserveBooking(
        scheduleUuids?: Array<string>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/stripe/student/reserve',
            query: {
                'schedule_uuids': scheduleUuids,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Stripe Webhook
     * @param stripeSignature
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiStripeWebhook(
        stripeSignature?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/stripe/webhook',
            headers: {
                'stripe-signature': stripeSignature,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Coach Subscription
     * @returns CheckoutSession Successful Response
     * @throws ApiError
     */
    public static apiCreateCoachSubscription(): CancelablePromise<CheckoutSession> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/subscription/coach/create',
        });
    }

    /**
     * Get Review Notifications
     * @returns UnreviewedLessonsList Successful Response
     * @throws ApiError
     */
    public static apiGetReviewNotifications(): CancelablePromise<UnreviewedLessonsList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/notification/student/reviews',
        });
    }

    /**
     * Create Review
     * @param lessonUuid
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiCreateReview(
        lessonUuid: string,
        requestBody: BaseReview,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/review/{lesson_uuid}',
            path: {
                'lesson_uuid': lessonUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Coach Reviews List
     * @returns ReviewList Successful Response
     * @throws ApiError
     */
    public static apiCoachReviewsList(): CancelablePromise<ReviewList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/review/reviews',
        });
    }

    /**
     * Like Coach
     * @param coachUuid
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiLikeCoach(
        coachUuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/like/coach/{coach_uuid}',
            path: {
                'coach_uuid': coachUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Unlike Coach
     * @param coachUuid
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiUnlikeCoach(
        coachUuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/like/coach/unlike/{coach_uuid}',
            path: {
                'coach_uuid': coachUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * List Liked Coached
     * @returns CoachList Successful Response
     * @throws ApiError
     */
    public static apiListLikedCoached(): CancelablePromise<CoachList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/like/student/favourites',
        });
    }

    /**
     * Get Coach Schedules By Uuid
     * @param coachUuid
     * @param scheduleDate
     * @returns ScheduleList Successful Response
     * @throws ApiError
     */
    public static apiGetCoachSchedulesByUuid(
        coachUuid: string,
        scheduleDate?: string,
    ): CancelablePromise<ScheduleList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schedule/schedules/{coach_uuid}',
            path: {
                'coach_uuid': coachUuid,
            },
            query: {
                'schedule_date': scheduleDate,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Coach Schedule
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiCreateCoachSchedule(
        requestBody: BaseSchedule,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/schedule/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Schedule By Uuid
     * @param scheduleUuid
     * @returns Schedule Successful Response
     * @throws ApiError
     */
    public static apiGetScheduleByUuid(
        scheduleUuid: string,
    ): CancelablePromise<Schedule> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schedule/{schedule_uuid}',
            path: {
                'schedule_uuid': scheduleUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Edit Schedule
     * @param scheduleUuid
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiEditSchedule(
        scheduleUuid: string,
        requestBody: BaseSchedule,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/schedule/{schedule_uuid}',
            path: {
                'schedule_uuid': scheduleUuid,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Schedule By Uuid
     * @param scheduleUuid
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiDeleteScheduleByUuid(
        scheduleUuid: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/schedule/{schedule_uuid}',
            path: {
                'schedule_uuid': scheduleUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Package
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiCreatePackage(
        requestBody: BaseLesson,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/package/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Packages
     * @returns LessonList Successful Response
     * @throws ApiError
     */
    public static apiGetPackages(): CancelablePromise<LessonList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/package/packages',
        });
    }

    /**
     * Get Package
     * @param packageUuid
     * @returns Lesson Successful Response
     * @throws ApiError
     */
    public static apiGetPackage(
        packageUuid: string,
    ): CancelablePromise<Lesson> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/package/{package_uuid}',
            path: {
                'package_uuid': packageUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * List Endpoints
     * @returns any Successful Response
     * @throws ApiError
     */
    public static apiListEndpoints(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/list-endpoints/',
        });
    }

}
