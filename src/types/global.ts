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

  // -------optional profile fields
  bio?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  website?: string;
  occupation?: string;
  company?: string;
  timezone?: string;
  language?: string;
}


export type TOrder = {
  _id: string;
  user: string;
  carId: string;
  customerInfo: {
    name: string;
    address: string;
    email: string;
    phone: string;
    city: string;
    userIP: string;
  };
  quantity: number;
  totalPrice: number;
  status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
  transaction?: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
};


interface MenuItem {
  label: string;
  href: string;
  description: string;
}

export type MegaMenuItems = Record<string, MenuItem[]>;


export type Testimonial = {
  name: string;
  feedback: string;
  image: string;
  designation: string;
  rating: number;
};