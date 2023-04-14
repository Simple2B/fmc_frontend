/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WhoamiService {
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
}
