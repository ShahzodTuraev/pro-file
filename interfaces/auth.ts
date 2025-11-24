export interface SignUpReqBody {
  email: string;
  password: string;
  username: string;
  type: string;
}
export interface SignInReqBody {
  email: string;
  password: string;
}
