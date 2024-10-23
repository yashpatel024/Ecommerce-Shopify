import { getHostUrl } from '@/lib/utils'

export interface RestClientOptions {
  baseURL?: string
  defaultHeaders?: Record<string, string>
  defaultTimeout?: number
}

export interface RequestOptions {
  method?: string
  data?: any
  headers?: Record<string, string>
  timeout?: number
  params?: Record<string, string>
}

export interface ApiResponse<T = any> {
  data: T
  status: number
  headers: Headers
}

const timeoutPromise = (ms: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Request timeout after ${ms}ms`)), ms)
  })
}

export class RestClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>
  private defaultTimeout: number

  constructor({
    baseURL = getHostUrl(),
    defaultHeaders = {},
    defaultTimeout = 10000,
  }: RestClientOptions = {}) {
    this.baseURL = baseURL
    this.defaultHeaders = defaultHeaders
    this.defaultTimeout = defaultTimeout
  }

  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(`${this.baseURL}${endpoint}`)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })
    }
    return url.toString()
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      data,
      headers = {},
      timeout = this.defaultTimeout,
      params,
    } = options

    const url = this.buildUrl(endpoint, params)
    const requestHeaders = {
      'Content-Type': 'application/json',
      ...this.defaultHeaders,
      ...headers,
    }

    const config: RequestInit = {
      method,
      headers: requestHeaders,
    }

    if (data) {
      config.body = JSON.stringify(data)
    }

    try {
      const response = await Promise.race([
        fetch(url, config),
        timeoutPromise(timeout),
      ])

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(
          `API Error: ${response.status} - ${responseData.message || 'Unknown error'}`,
        )
      }

      return {
        data: responseData,
        status: response.status,
        headers: response.headers,
      }
    } catch (error) {
      console.error(`REST Client Error (${method} ${endpoint}):`, error)
      throw error
    }
  }

  public async get<T>(
    endpoint: string,
    params?: Record<string, string>,
    options?: Omit<RequestOptions, 'method' | 'params'>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET', params })
  }

  public async post<T>(
    endpoint: string,
    data?: any,
    options?: Omit<RequestOptions, 'method' | 'data'>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', data })
  }

  public async put<T>(
    endpoint: string,
    data?: any,
    options?: Omit<RequestOptions, 'method' | 'data'>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', data })
  }

  public async delete<T>(
    endpoint: string,
    options?: Omit<RequestOptions, 'method'>,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

// Create default instance
export const restClient = new RestClient()
