export interface ApiSuccessResponse<T> {
  success: true;
  message?: string;
  data: T;
}

export interface ApiSuccessResponseWithMeta<T, M> extends ApiSuccessResponse<T> {
  meta: M;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message?: string;
    details?: unknown;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export function isApiSuccess<T>(response: ApiResponse<T>): response is ApiSuccessResponse<T> {
  return response.success === true;
}

export function isApiError(response: ApiResponse<unknown>): response is ApiErrorResponse {
  return response.success === false;
}
