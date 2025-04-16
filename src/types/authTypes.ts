
export type TUser = {
  userId: string;
  userEmail: string;
  role: string;
  iat: number;
  exp: number;
};


export type TAuthState = {
  user: null | TUser;
  token: null | string;
}
