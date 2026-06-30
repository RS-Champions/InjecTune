export interface User {
  id: `${string}-${string}-${string}-${string}-${string}`;
  email: string;
  token: string;
  password?: string;
}
