import { env } from '../env';
import type { ApiErrorResponse, ApiResponse, ApiSuccessResponse } from '@repo/contract';

export type { ApiResponse, ApiSuccessResponse, ApiErrorResponse } from '@repo/contract';

export class ApiError extends Error {
  constructor(
    public status: number,
    public response: ApiErrorResponse | null,
  ) {
    const message =
      response?.error?.message ??
      (response as unknown as { message?: string })?.message ??
      'Something went wrong';
    super(message);
    this.name = 'ApiError';
  }
}

export class APIClient {
  constructor(private readonly baseUrl: string) {}

  private async request<T>(url: string, options: RequestInit = {}): Promise<ApiSuccessResponse<T>> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });

    const body = await response.json();

    if (!response.ok) {
      throw new ApiError(response.status, body);
    }

    return body as ApiSuccessResponse<T>;
  }

  get<T>(url: string, options?: RequestInit) {
    return this.request<T>(url, {
      ...options,
      method: 'GET',
    });
  }

  post<T>(url: string, body?: unknown, options?: RequestInit) {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  put<T>(url: string, body?: unknown, options?: RequestInit) {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  delete<T>(url: string, options?: RequestInit) {
    return this.request<T>(url, {
      ...options,
      method: 'DELETE',
    });
  }
}

export const api = new APIClient(env.NEXT_PUBLIC_API_URL);
