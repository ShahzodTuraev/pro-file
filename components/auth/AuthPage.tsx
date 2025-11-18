"use client";
import { CircleCheckBig, Eye, EyeOff } from "lucide-react";
import styles from "./AuthPage.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import Logo from "../logo/Logo";
import { signIn } from "next-auth/react";
import { formReducer, initialState, State } from "./authReducer";
import { usernameCheck } from "@/services/auth.service";
import { dangerSx, successSx } from "@/const/auth.conts";

export default function AuthPage() {
  // INITIALIZATION
  const router = useRouter();
  const path = usePathname();
  const [debouncedValue, setDebouncedValue] = useState("");
  const pageData = {
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

  const [state, dispatch] = useReducer(formReducer, initialState);
  // HANDLERS

  // 1. Update `debouncedValue` only if input doesn’t change for 1 second
  useEffect(() => {
    if (state.username !== "") {
      dispatch({
        type: "FIELD_CHANGE",
        field: "usernameStatus",
        value: "loading",
      });
    }
    const handler = setTimeout(() => {
      setDebouncedValue(state.username);
    }, 800); // 1 second debounce

    return () => clearTimeout(handler);
  }, [state.username]);

  // 2. Trigger backend request when `debouncedValue` updates
  const checkUserName = async () => {
    const data = await usernameCheck(state.username);
    console.log("come::::::::::", data);
    if (data?.status === 200) {
      dispatch({
        type: "FIELD_CHANGE",
        field: "usernameStatus",
        value: data?.status.toString(),
      });
      dispatch({
        type: "FIELD_CHANGE",
        field: "usernameAlert",
        value: "",
      });
    }
    if (data?.status === 422) {
      dispatch({
        type: "FIELD_CHANGE",
        field: "usernameStatus",
        value: data?.status.toString(),
      });
      dispatch({
        type: "FIELD_CHANGE",
        field: "usernameAlert",
        value: data?.data.message,
      });
    }
  };

  useEffect(() => {
    if (!debouncedValue) {
      dispatch({
        type: "FIELD_CHANGE",
        field: "usernameAlert",
        value: "",
      });
      dispatch({
        type: "FIELD_CHANGE",
        field: "usernameStatus",
        value: null,
      });
      return;
    }
    checkUserName();
  }, [debouncedValue]);
  // console.log("State:", state);
  // HANDLER
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log({ name, type, value, checked });
    dispatch({
      type: "FIELD_CHANGE",
      field: name as keyof State,
      value:
        name === "username"
          ? /^[a-z0-9]+$/.test(value)
            ? value
            : state.username
          : value,
    });
  };
  console.log("State:::", state.usernameStatus);

  return (
    <main className={styles.authPage}>
      <div className={styles.header}>
        <div onClick={() => router.push("/")}>
          <Logo />
        </div>
      </div>
      <div className={styles.formContainer}>
        <h2>{pageData.header}</h2>
        <form className={styles.form}>
          <TextField
            label="Email"
            name="email"
            error={false}
            variant="outlined"
            size="small"
            required
            onChange={handleChange}
          />
          {path === "/signup" && (
            <TextField
              id="outlined-basic"
              type="text"
              name="username"
              onChange={handleChange}
              value={state.username}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <span>pro-file.top/</span>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {state.usernameStatus === "loading" && (
                        <CircularProgress enableTrackSlot size="20px" />
                      )}
                      <CircleCheckBig
                        style={
                          state.usernameStatus === "200"
                            ? { display: "block", color: "#70C050" }
                            : { display: "none" }
                        }
                      />
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
              error={state.usernameStatus === "422"}
              helperText={state.usernameAlert}
              autoComplete="off"
              size="small"
              sx={
                state.usernameStatus === "200"
                  ? successSx
                  : state.usernameStatus === "422"
                  ? dangerSx
                  : {}
              }
            />
          )}

          <FormControl
            required
            sx={{ width: "100%" }}
            size="small"
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>

            <OutlinedInput
              name="password"
              id="outlined-adornment-password"
              type={state.showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      state.showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={() => {
                      dispatch({
                        type: "FIELD_CHANGE",
                        field: "showPassword",
                        value: !state.showPassword,
                      });
                    }}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {state.showPassword ? <Eye /> : <EyeOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {path === "/signup" && state.sentOtp && (
            <FormControl variant="outlined">
              <OutlinedInput
                size="small"
                name="otp"
                placeholder="Paste OTP"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <span
                      className={styles.otpResend}
                      // onClick={() => console.log("Resend clicked")}
                    >
                      Resend
                    </span>
                  </InputAdornment>
                }
              />
            </FormControl>
          )}
          <button type="submit" className={styles.primaryBtn}>
            {pageData.mainButton}
          </button>
        </form>
        <div className={styles.wallBox}>
          <div />
          <p>Or</p>
          <div />
        </div>
        <button onClick={() => signIn("google")} className={styles.googleBtn}>
          <span className={styles.googleIcon}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-hidden="false"
              aria-labelledby=":r0:_title"
            >
              <path
                fill="#4285F4"
                d="M21.6 12.23c0-.71-.06-1.4-.18-2.05H12v3.87h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.89-1.73 2.98-4.3 2.98-7.34Z"
              ></path>
              <path
                fill="#34A853"
                d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.23-2.51c-.9.6-2.04.95-3.39.95-2.6 0-4.8-1.76-5.6-4.12H3.06v2.6A10 10 0 0 0 12 22Z"
              ></path>
              <path
                fill="#FBBC05"
                d="M6.4 13.9a6.01 6.01 0 0 1 0-3.8V7.5H3.06a10 10 0 0 0 0 9l3.34-2.6Z"
              ></path>
              <path
                fill="#EA4335"
                d="M12 5.98c1.47 0 2.79.5 3.82 1.5L18.7 4.6A10 10 0 0 0 3.06 7.5l3.34 2.6c.8-2.36 3-4.12 5.6-4.12Z"
              ></path>
            </svg>
          </span>
          {pageData.googleButton}
        </button>
      </div>
      <div className={styles.footer}>
        <p>{pageData.headText}</p>
        <Link href={pageData.headPath}>{pageData.headLink}</Link>{" "}
      </div>
    </main>
  );
}
