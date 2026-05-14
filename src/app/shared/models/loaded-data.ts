export interface LoadedData<T> {
  value: T | null;
  isLoading: boolean;
  error: Error | null;
}

export interface Error {
  code: number;
}
