export type State = {
  email: string;
  password: string;
  name: string;
  showPassword: boolean;
  otp: string;
};

export type Action =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_OTP"; payload: string }
  | { type: "SET_SHOW_PASSWORD"; payload: boolean }
  | { type: "RESET" };
