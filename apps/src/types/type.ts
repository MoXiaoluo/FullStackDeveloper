export interface IUser {
  username: string;
  password: string;
}

export interface IResponse<T> {
  code: number;
  data: T;
  message: string;
}
