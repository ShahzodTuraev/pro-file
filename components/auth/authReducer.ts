export type State = {
  email: string;
  password: string;
  username: string;
  usernameError: string | null;
  isCheckingUsername: boolean;
  usernameErrorMessage: "";
  showPassword: boolean;
  otp: string;
  sentOtp: boolean;
};

export type Action =
  | { type: "FIELD_CHANGE"; field: keyof State; value: string | boolean }
  | { type: "RESET" };

export const initialState: State = {
  username: "",
  usernameError: null,
  usernameErrorMessage: "",
  email: "",
  password: "",
  isCheckingUsername: false,
  showPassword: false,
  sentOtp: false,
  otp: "",
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
