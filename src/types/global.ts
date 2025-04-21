import { BaseQueryApi } from '@reduxjs/toolkit/query';

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};


export interface TUserData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id?: any;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  profileImg?: string;
  isBlocked: boolean;
}
