"use client";
import { CircleCheckBig, Eye, EyeOff } from "lucide-react";
import styles from "./AuthPage.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useEffect, useReducer, useRef, useState } from "react";
import Logo from "../logo/Logo";
import { signIn } from "next-auth/react";
import { formReducer, initialState, State } from "./authReducer";
import {
  checkOtp,
  reSendOtp,
  sendOtp,
  usernameCheck,
} from "@/services/auth.service";
import { dangerSx, pathData, successSx } from "@/const/auth.conts";
import z from "zod";
import toast from "react-hot-toast";

export default function AuthPage() {
  // INITIALIZATION
  const router = useRouter();
  const path = usePathname();
  const emailSchema = z.string().email("Invalid email format");
  const formRef = useRef(null);
  const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters");
  const [debouncedValue, setDebouncedValue] = useState("");
  const pageData = pathData(path);

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
      dispatch({
        type: "FIELD_CHANGE",
        field: "usernameAlert",
        value: "",
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
    dispatch({
      type: "FIELD_CHANGE",
      field: name as keyof State,
      value:
        name === "username"
          ? /^[a-zA-Z0-9]+$/.test(value)
            ? value.toLowerCase()
            : value === ""
            ? ""
            : state.username
          : value,
    });
    if (name === "otp" && state.otp.length > 3) {
      dispatch({
        type: "FIELD_CHANGE",
        field: "disableSubmitBtn",
        value: null,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (path === "/signup") {
        const emailValidation = emailSchema.safeParse(state.email);
        const passwordValidation = passwordSchema.safeParse(state.password);
        dispatch({
          type: "FIELD_CHANGE",
          field: "emailAlert",
          value: emailValidation.success
            ? null
            : emailValidation?.error?.issues[0].message,
        });
        dispatch({
          type: "FIELD_CHANGE",
          field: "passwordAlert",
          value: passwordValidation.success
            ? null
            : passwordValidation?.error?.issues[0].message,
        });

        if (
          emailValidation.success &&
          passwordValidation.success &&
          state.usernameStatus === "200" &&
          state.otp.length == 0
        ) {
          dispatch({
            type: "FIELD_CHANGE",
            field: "disableSubmitBtn",
            value: "loading",
          });
          const req = await sendOtp({
            email: state.email,
            password: state.password,
            username: state.username,
          });
          console.log(req?.data);
          if (req?.status === 201) {
            dispatch({
              type: "FIELD_CHANGE",
              field: "emailAlert",
              value: null,
            });
            dispatch({ type: "FIELD_CHANGE", field: "sentOtp", value: true });
            dispatch({
              type: "FIELD_CHANGE",
              field: "disableSubmitBtn",
              value: "disable",
            });
          } else if (req?.status === 409) {
            dispatch({
              type: "FIELD_CHANGE",
              field: "emailAlert",
              value: req.data?.message,
            });
          } else {
            dispatch({
              type: "FIELD_CHANGE",
              field: "emailAlert",
              value: "Something went wrong.",
            });
          }
        }
        if (state.otp.length > 3) {
          dispatch({
            type: "FIELD_CHANGE",
            field: "disableSubmitBtn",
            value: "loading",
          });
          const res = await checkOtp(state.otp);
          console.log(res);
          if (res?.status) {
            dispatch({
              type: "FIELD_CHANGE",
              field: "disableSubmitBtn",
              value: null,
            });
          }
          if (res?.status === 403) {
            dispatch({
              type: "FIELD_CHANGE",
              field: "otpAlert",
              value: res.data.message,
            });
          }
          if (res?.status === 200) {
            router.push("/");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const reSendOtpHandler = async () => {
    try {
      dispatch({ type: "FIELD_CHANGE", field: "isResend", value: true });
      const req = await reSendOtp();
      if (req?.status == 201) {
        toast.success("OTP sent to your email.", { duration: 2000 });
        dispatch({ type: "FIELD_CHANGE", field: "isResend", value: false });
      } else {
        toast.error("Something went wrong.", { duration: 2000 });
        dispatch({ type: "FIELD_CHANGE", field: "isResend", value: false });
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <main className={styles.authPage}>
      <div className={styles.header}>
        <div onClick={() => router.push("/")}>
          <Logo />
        </div>
      </div>
      <div className={styles.formContainer}>
        <h2>{pageData.header}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            label="Email"
            name="email"
            type="email"
            error={!!state.emailAlert}
            variant="outlined"
            size="small"
            required
            onChange={handleChange}
            helperText={state.emailAlert}
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
            error={!!state.passwordAlert} // error holatini ham shu yerga biriktirasiz
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>

            <OutlinedInput
              name="password"
              id="outlined-adornment-password"
              autoComplete="off"
              type={state.showPassword ? "text" : "password"}
              onChange={handleChange}
              value={state.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      state.showPassword ? "hide password" : "show password"
                    }
                    onClick={() =>
                      dispatch({
                        type: "FIELD_CHANGE",
                        field: "showPassword",
                        value: !state.showPassword,
                      })
                    }
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

            <FormHelperText>{state.passwordAlert}</FormHelperText>
          </FormControl>

          {path === "/signup" && state.sentOtp && (
            <>
              <FormControl variant="outlined">
                <OutlinedInput
                  size="small"
                  name="otp"
                  placeholder="Paste OTP"
                  error={!!state.otpAlert}
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      {state.isResend ? (
                        <CircularProgress enableTrackSlot size="20px" />
                      ) : (
                        <span
                          className={styles.otpResend}
                          onClick={reSendOtpHandler}
                        >
                          Resend
                        </span>
                      )}
                    </InputAdornment>
                  }
                />
                <FormHelperText>
                  <span style={{ color: "#FF4963" }}>{state.otpAlert}</span>
                </FormHelperText>
              </FormControl>
              <p>
                Enter the 6-digit code we sent to your email. <br /> If you
                don’t see it, check your spam folder.
              </p>
            </>
          )}
          <button
            disabled={
              state.disableSubmitBtn === "disable" ||
              state.disableSubmitBtn === "loading"
            }
            type="submit"
            className={
              state.disableSubmitBtn === "disable"
                ? styles.primaryBtnDisable
                : styles.primaryBtn
            }
          >
            {state.disableSubmitBtn === "loading" ? (
              <CircularProgress
                size="1.120rem"
                sx={{ color: "#fff", padding: 0 }}
              />
            ) : (
              pageData.mainButton
            )}
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
