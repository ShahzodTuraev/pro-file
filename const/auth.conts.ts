export const successSx = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#70C050", // normal color
    },
    "&:hover fieldset": {
      borderColor: "#70C050", // hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#70C050", // focused color
    },
  },
};
export const dangerSx = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#FF4963", // normal color
    },
    "&:hover fieldset": {
      borderColor: "#FF4963", // hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FF4963", // focused color
    },
  },
};

export const pathData = (path: string) => {
  return {
    headText:
      path === "/signup"
        ? "Already have an account?"
        : "Don't have an account? ",
    headLink: path === "/signup" ? "Sign in" : "Sign up",
    headPath: path === "/signup" ? "/signin" : "/signup",
    header: path === "/signup" ? "Create your account" : "Sign in",
    mainButton: path === "/signup" ? "Sign Up With Email" : "Sign In",
    googleButton:
      path === "/signup" ? "Sign Up With Google" : "Sign In With Google",
  };
};
