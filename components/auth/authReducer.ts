export type State = {
  email: string;
  emailAlert: string | null;
  password: string;
  passwordAlert: string | null;
  repassword: string;
  repasswordAlert: string | null;
  username: string;
  usernameStatus: null | string;
  usernameAlert: string;
  disableSubmitBtn: null | string;
  otpAlert: null | string;
  showPassword: boolean;
  showRePassword: boolean;
  otp: string;
  sentOtp: boolean;
  isResend: boolean;
};

export type Action =
  | { type: "FIELD_CHANGE"; field: keyof State; value: string | boolean | null }
  | { type: "RESET" };

export const initialState: State = {
  username: "",
  email: "",
  emailAlert: null,
  password: "",
  passwordAlert: null,
  repassword: "",
  repasswordAlert: null,
  usernameStatus: null,
  usernameAlert: "",
  showPassword: false,
  showRePassword: false,
  sentOtp: false,
  otp: "",
  otpAlert: null,
  disableSubmitBtn: null,
  isResend: false,
};
export const formReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FIELD_CHANGE":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "RESET":
      return initialState;
    default:
      return state;
  }
};
