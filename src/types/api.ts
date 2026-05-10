export interface ApiResponse<T> {
  success: boolean;
  total?: number;
  data: T;
  message?: string;
}